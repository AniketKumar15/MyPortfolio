import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  shortDescription: { type: String, required: true },
  longDescription: { type: String },
  contribution: { type: String },
  thumbnail: { type: String },
  galleryImages: [{ type: String }],
  techStack: [{ type: String }],
  githubUrl: { type: String },
  itchioUrl: { type: String },
  liveDemoUrl: { type: String },
  status: { type: String, enum: ['Planning', 'In Development', 'Completed', 'On Hold'], default: 'In Development' },
  featured: { type: Boolean, default: false }, // For Homepage
  isHero: { type: Boolean, default: false },   // For Projects Page Featured Showcase
  order: { type: Number, default: 0 },
  challenges: { type: String },
  solutions: { type: String },
  developmentProcess: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
