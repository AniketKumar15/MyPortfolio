import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  role: { type: String, required: true },
  logo: { type: String },
  location: { type: String },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  currentlyWorking: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Experience', experienceSchema);
