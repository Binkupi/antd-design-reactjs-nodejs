const router = require('express').Router();
const {
  findCategories,
  findCategoryById,
  createCategory,
  updateCategoryById,
  countCategories,
  deleteCategoryById,
} = require('../controllers/category.controllers');

router.get('/count', countCategories);
router.delete('/:id', deleteCategoryById);
router.put('/:id', updateCategoryById);
router.get('/:id', findCategoryById);
router.get('/', findCategories);
router.post('/', createCategory);

module.exports = router;
