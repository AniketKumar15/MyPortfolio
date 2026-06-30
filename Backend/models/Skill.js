import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String }, // Can be a classname or URL
  category: { type: String, required: true }, // e.g., "Languages", "Game Engines", "Tools"
  skillLevel: { type: Number, min: 1, max: 100 },
  featured: { type: Boolean, default: false },
  displayOrder: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Skill', skillSchema);
