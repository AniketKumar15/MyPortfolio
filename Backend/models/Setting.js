import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  // Only one document should exist for settings. We use a static key to find it.
  singletonKey: { type: String, default: 'global_settings', unique: true },
  
  // Basic Info
  profileImage: { type: String },
  resume: { type: String },
  email: { type: String },
  location: { type: String },
  
  // Bios
  shortBio: { type: String },
  longBio: { type: String },
  
  // Page Contents
  heroContent: { type: String },
  footerContent: { type: String },
  aboutPageContent: { type: String }, // Rich text
  
  // Social Links
  socialLinks: {
    github: { type: String },
    linkedin: { type: String },
    portfolio: { type: String },
    itchio: { type: String },
    discord: { type: String },
    youtube: { type: String },
    twitter: { type: String }
  },

  // SEO
  seoSettings: {
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: { type: String }
  }

}, { timestamps: true });

export default mongoose.model('Setting', settingSchema);
