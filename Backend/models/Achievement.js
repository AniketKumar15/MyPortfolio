import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  image: { type: String },
  type: { type: String, enum: ['Award', 'Game Jam', 'Certification', 'Other'], default: 'Other' }
}, { timestamps: true });

export default mongoose.model('Achievement', achievementSchema);
