const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  seedProducts,
} = require('../controllers/productController');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getProducts);
router.get('/:id', getProductById);

const uploadFields = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'images', maxCount: 10 },
]);

router.post('/seed', protect, adminOnly, seedProducts);
router.post('/', protect, adminOnly, uploadFields, createProduct);
router.put('/:id', protect, adminOnly, uploadFields, updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

module.exports = router;
