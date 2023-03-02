const router = require('express').Router();
const {
  findTags,
  findTagById,
  createTag,
  updateTagById,
  countTags,
  deleteTagById,
} = require('../controllers/tag.controllers');

router.get('/count', countTags);
router.delete('/:id', deleteTagById);
router.put('/:id', updateTagById);
router.get('/:id', findTagById);
router.get('/', findTags);
router.post('/', createTag);

module.exports = router;
