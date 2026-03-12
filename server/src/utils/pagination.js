export const getCursorPagination = async (model, { filter = {}, cursor, limit = 10, sortField = 'createdAt', sortOrder = -1 }) => {
  const query = { ...filter };

  if (cursor) {
    // cursor format: "timestamp_id"
    const [timestamp, id] = cursor.split('_');
    const operator = sortOrder === -1 ? '$lt' : '$gt';
    
    query.$or = [
      { [sortField]: { [operator]: new Date(timestamp) } },
      { 
        [sortField]: new Date(timestamp), 
        _id: { [operator]: id } 
      }
    ];
  }

  const items = await model.find(query)
    .sort({ [sortField]: sortOrder, _id: sortOrder })
    .limit(limit + 1)
    .exec();

  const hasNextPage = items.length > limit;
  const results = hasNextPage ? items.slice(0, limit) : items;
  
  let nextCursor = null;
  if (hasNextPage) {
    const lastItem = results[results.length - 1];
    nextCursor = `${lastItem[sortField].toISOString()}_${lastItem._id}`;
  }

  return {
    results,
    nextCursor,
    hasNextPage
  };
};
