import Setting from '../models/Setting.js';

// Get global settings (creates default if it doesn't exist)
export const getSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne({ singletonKey: 'global_settings' });
    if (!settings) {
      settings = await Setting.create({ singletonKey: 'global_settings' });
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update global settings
export const updateSettings = async (req, res) => {
  try {
    const settings = await Setting.findOneAndUpdate(
      { singletonKey: 'global_settings' },
      req.body,
      { new: true, upsert: true, runValidators: true }
    );
    res.json(settings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
