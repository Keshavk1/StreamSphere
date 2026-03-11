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
          minViews: { $min: '$views' },
          maxViews: { $max: '$views' },
          avgLikes: { $avg: '$likes' }
        }
      },
      {
        $sort: { avgViews: -1 }
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
            { $limit: 5 },
            { $project: { title: 1, views: 1, likes: 1 } }
          ],
          categoryStats: [
            {
              $group: {
                _id: '$category',
                count: { $sum: 1 }
              }
            }
          ],
          overallStats: [
            {
              $group: {
                _id: null,
                totalViews: { $sum: '$views' },
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
