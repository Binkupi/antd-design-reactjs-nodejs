const router = require('express').Router();
const {
  findRoles,
} = require('../controllers/role.controllers');

router.get('/', findRoles);

module.exports = router;
