const Activity = require("../models/activityModel");

exports.getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({});
    if (!activities) return res.status(400).json({ message: "No activities found!" });
    return res.status(200).json({ activities });
  } 
  catch (error) {
    return res.status(500).json({ message: "Error getting all activities", error });
  }
};
