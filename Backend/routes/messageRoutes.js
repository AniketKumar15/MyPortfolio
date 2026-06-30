import express from 'express';
import {
  createMessage,
  getMessages,
  deleteMessage,
  updateMessageStatus
} from '../controllers/messageController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(createMessage)
  .get(protect, admin, getMessages);

router.route('/:id')
  .delete(protect, admin, deleteMessage);

router.route('/:id/read')
  .put(protect, admin, updateMessageStatus);

export default router;
