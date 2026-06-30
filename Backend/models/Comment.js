import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  authorName: {
    type: String,
    required: true
  },
  authorEmail: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'spam'],
    default: 'pending'
  }
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
