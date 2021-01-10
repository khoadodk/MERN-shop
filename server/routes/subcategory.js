const express = require('express');

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

const {
  create,
  read,
  update,
  remove,
  list
} = require('../controllers/subcategory');

router.post('/subcategory', authCheck, adminCheck, create);
router.get('/subcategories', list);
router.get('/subcategory/:_id', read);
router.put('/subcategory/:_id', authCheck, adminCheck, update);
router.delete('/subcategory/:_id', authCheck, adminCheck, remove);

module.exports = router;
