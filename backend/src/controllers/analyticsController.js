const Analytics = require('../models/Analytics');

const trackPageView = async (req, res) => {
  try {
    const { path } = req.body;
    if (!path) return res.status(400).json({ success: false });

    const date = new Date().toISOString().split('T')[0];  // "YYYY-MM-DD"

    await Analytics.findOneAndUpdate(
      { path, date },
      { $inc: { views: 1 } },
      { upsert: true }
    );

    res.json({ success: true });
  } catch (err) {
    res.json({ success: false });  // Silently fail — don't break the frontend
  }
};

const getAnalytics = async (req, res, next) => {
  try {
    const days = parseInt(req.query.days) || 30;
    const since = new Date();
    since.setDate(since.getDate() - days);
    const sinceStr = since.toISOString().split('T')[0];

    const data = await Analytics.find({ date: { $gte: sinceStr } })
      .sort({ date: -1, views: -1 });

    // Total views per path
    const byPath = {};
    data.forEach(({ path, views }) => {
      byPath[path] = (byPath[path] || 0) + views;
    });

    res.json({ success: true, data: { byPath, raw: data } });
  } catch (err) {
    next(err);
  }
};

module.exports = { trackPageView, getAnalytics };
