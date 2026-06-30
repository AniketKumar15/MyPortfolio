import express from 'express';
import multer from 'multer';
import ImageKit from 'imagekit';
import { protect, admin } from '../middleware/authMiddleware.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', protect, admin, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    const response = await imagekit.upload({
      file: req.file.buffer, // required
      fileName: req.file.originalname, // required
      folder: '/blogs'
    });

    res.json({
      url: response.url,
      publicId: response.fileId
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
