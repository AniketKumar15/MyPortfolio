import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  getSkills, getSkill, createSkill, updateSkill, deleteSkill,
  getExperiences, getExperience, createExperience, updateExperience, deleteExperience,
  getEducations, getEducation, createEducation, updateEducation, deleteEducation,
  getServices, getService, createService, updateService, deleteService,
  getAchievements, getAchievement, createAchievement, updateAchievement, deleteAchievement
} from '../controllers/portfolioController.js';

const router = express.Router();

// Skills
router.route('/skills').get(getSkills).post(protect, admin, createSkill);
router.route('/skills/:id').get(getSkill).put(protect, admin, updateSkill).delete(protect, admin, deleteSkill);

// Experiences
router.route('/experiences').get(getExperiences).post(protect, admin, createExperience);
router.route('/experiences/:id').get(getExperience).put(protect, admin, updateExperience).delete(protect, admin, deleteExperience);

// Educations
router.route('/educations').get(getEducations).post(protect, admin, createEducation);
router.route('/educations/:id').get(getEducation).put(protect, admin, updateEducation).delete(protect, admin, deleteEducation);

// Services
router.route('/services').get(getServices).post(protect, admin, createService);
router.route('/services/:id').get(getService).put(protect, admin, updateService).delete(protect, admin, deleteService);

// Achievements
router.route('/achievements').get(getAchievements).post(protect, admin, createAchievement);
router.route('/achievements/:id').get(getAchievement).put(protect, admin, updateAchievement).delete(protect, admin, deleteAchievement);

export default router;
