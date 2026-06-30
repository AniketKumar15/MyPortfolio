import express from 'express';
import { getBlogs, getAdminBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog } from '../controllers/blogController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getBlogs)
  .post(protect, admin, createBlog);

router.get('/admin', protect, admin, getAdminBlogs);
router.get('/:slug', getBlogBySlug);

router.route('/:id')
  .put(protect, admin, updateBlog)
  .delete(protect, admin, deleteBlog);

export default router;
