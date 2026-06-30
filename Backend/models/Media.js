import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  publicId: {
    type: String,
    required: true
  },
  altText: {
    type: String
  },
  format: {
    type: String
  },
  size: {
    type: Number
  }
}, { timestamps: true });

const Media = mongoose.model('Media', mediaSchema);

export default Media;
