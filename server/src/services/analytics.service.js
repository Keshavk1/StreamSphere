import Video from '../models/Video.js';

export const getVideoAnalytics = async (req, res) => {
  try {
    const stats = await Video.aggregate([
      {
        $group: {
          _id: '$category',
          numVideos: { $sum: 1 },
          avgViews: { $avg: '$views' },
          totalViews: { $sum: '$views' },
          avgLikes: { $avg: '$likes' },
          totalLikes: { $sum: '$likes' }
        }
      },
      {
        $addFields: {
          engagementRate: {
            $cond: [
              { $gt: ['$totalViews', 0] },
              { $divide: ['$totalLikes', '$totalViews'] },
              0
            ]
          }
        }
      },
      {
        $sort: { engagementRate: -1 }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

export const getPlatformStats = async (req, res) => {
  try {
    const stats = await Video.aggregate([
      {
        $facet: {
          topVideos: [
            { $sort: { views: -1 } },
            { $limit: 10 },
            { $lookup: { from: 'users', localField: 'creator', foreignField: '_id', as: 'creator' } },
            { $unwind: '$creator' },
            { $project: { title: 1, views: 1, likes: 1, 'creator.username': 1 } }
          ],
          categoryStats: [
            {
              $group: {
                _id: '$category',
                count: { $sum: 1 },
                totalViews: { $sum: '$views' }
              }
            },
            { $sort: { totalViews: -1 } }
          ],
          overallStats: [
            {
              $group: {
                _id: null,
                totalViews: { $sum: '$views' },
                totalLikes: { $sum: '$likes' },
                totalVideos: { $sum: 1 }
              }
            }
          ]
        }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats: stats[0]
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};
// Get trending videos using aggregation
export const getTrendingVideos = async (req, res) => {
  try {
    const now = new Date();
    const trending = await Video.aggregate([
      {
        $addFields: {
          score: {
            $add: [
              { $multiply: ['$views', 1] },
              { $multiply: ['$likes', 5] },
              { $multiply: [{ $divide: [1, { $add: [1, { $divide: [{ $subtract: [now, '$createdAt'] }, 3600000] }] }] }, 100] }
            ]
          }
        }
      },
      { $sort: { score: -1 } },
      { $limit: 20 },
      { $lookup: { from: 'users', localField: 'creator', foreignField: '_id', as: 'creator' } },
      { $unwind: '$creator' },
      {
        $project: {
          title: 1,
          thumbnailUrl: 1,
          views: 1,
          likes: 1,
          createdAt: 1,
          'creator.username': 1,
          'creator.profilePicture': 1
        }
      }
    ]);

    res.status(200).json({
      status: 'success',
      results: trending
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};
