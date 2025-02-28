const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController') // Ensure this path is correct
const { verifyToken, checkRole } = require('../middleware/authMiddleware')

// CRUD Operations
router.post('/', verifyToken, productController.createProduct)
router.get('/', productController.getProducts)
router.get('/:id', productController.getProductById)
router.put('/:id', verifyToken, productController.updateProduct)
router.delete('/:id', verifyToken, productController.deleteProduct)
router.put(
  '/:id/status',
  verifyToken,
  checkRole(['admin', 'superadmin']),
  productController.updateProductStatus
)

module.exports = router
