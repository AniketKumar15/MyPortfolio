import Skill from '../models/Skill.js';
import Experience from '../models/Experience.js';
import Education from '../models/Education.js';
import Service from '../models/Service.js';
import Achievement from '../models/Achievement.js';

// --- Generic CRUD Factory ---
const getAll = (Model) => async (req, res) => {
  try {
    const docs = await Model.find().sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const getOne = (Model) => async (req, res) => {
  try {
    const doc = await Model.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const create = (Model) => async (req, res) => {
  try {
    const doc = new Model(req.body);
    const saved = await doc.save();
    res.status(201).json(saved);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

const update = (Model) => async (req, res) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

const remove = (Model) => async (req, res) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// Exports for each model
export const getSkills = getAll(Skill);
export const getSkill = getOne(Skill);
export const createSkill = create(Skill);
export const updateSkill = update(Skill);
export const deleteSkill = remove(Skill);

export const getExperiences = getAll(Experience);
export const getExperience = getOne(Experience);
export const createExperience = create(Experience);
export const updateExperience = update(Experience);
export const deleteExperience = remove(Experience);

export const getEducations = getAll(Education);
export const getEducation = getOne(Education);
export const createEducation = create(Education);
export const updateEducation = update(Education);
export const deleteEducation = remove(Education);

export const getServices = getAll(Service);
export const getService = getOne(Service);
export const createService = create(Service);
export const updateService = update(Service);
export const deleteService = remove(Service);

export const getAchievements = getAll(Achievement);
export const getAchievement = getOne(Achievement);
export const createAchievement = create(Achievement);
export const updateAchievement = update(Achievement);
export const deleteAchievement = remove(Achievement);
