const Product = require('../models/product')
const User = require('../models/User')
// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      productInformation,
      productType,
      creditGuarantees,
      stageOfEntrepreneurship,
      objectiveOfCredit,
      benefitsOfEntrepreneurship,
      geographicCoverage,
      requirement,
      contactDetail
    } = req.body

    if (!title || !description || !productType) {
      return res
        .status(400)
        .json({ message: 'Title, description, and product type are required' })
    }

    const userId = req.user.id // Authenticated user ID

    const product = await Product.create({
      userId,
      title,
      description,
      productInformation: productInformation || '',
      productType,
      creditGuarantees: creditGuarantees || '',
      stageOfEntrepreneurship: stageOfEntrepreneurship || '',
      objectiveOfCredit: objectiveOfCredit || '',
      benefitsOfEntrepreneurship: benefitsOfEntrepreneurship || '',
      geographicCoverage: Array.isArray(geographicCoverage)
        ? geographicCoverage
        : [],
      requirement: requirement || '',
      contactDetail: contactDetail ? JSON.stringify(contactDetail) : '{}',
      status: 'pending'
    })

    res.status(201).json({ message: 'Product created successfully!', product })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to create product', error: error.message })
  }
}

exports.getProducts = async (req, res) => {
  try {
    const { status } = req.query // Optional query parameter for filtering

    let filter = { include: [{ model: User, attributes: ['id', 'name'] }] } // Include user details

    if (status === 'approved') {
      filter.where = { status: 'approved' }
    }

    const products = await Product.findAll(filter)

    res.status(200).json(products)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to fetch products', error: error.message })
  }
}
// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params

    const product = await Product.findByPk(id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.status(200).json(product)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to fetch product', error: error.message })
  }
}

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const {
      title,
      description,
      productInformation,
      productType,
      creditGuarantees,
      stageOfEntrepreneurship,
      objectiveOfCredit,
      benefitsOfEntrepreneurship,
      geographicCoverage,
      requirement,
      contactDetail
    } = req.body

    const product = await Product.findByPk(id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    await product.update({
      title: title || product.title,
      description: description || product.description,
      productInformation: productInformation || product.productInformation,
      productType: productType || product.productType,
      creditGuarantees: creditGuarantees || product.creditGuarantees,
      stageOfEntrepreneurship:
        stageOfEntrepreneurship || product.stageOfEntrepreneurship,
      objectiveOfCredit: objectiveOfCredit || product.objectiveOfCredit,
      benefitsOfEntrepreneurship:
        benefitsOfEntrepreneurship || product.benefitsOfEntrepreneurship,
      geographicCoverage: Array.isArray(geographicCoverage)
        ? geographicCoverage
        : product.geographicCoverage,
      requirement: requirement || product.requirement,
      contactDetail: contactDetail
        ? JSON.stringify(contactDetail)
        : product.contactDetail
    })

    res.status(200).json({ message: 'Product updated successfully!', product })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to update product', error: error.message })
  }
}

// Update product status (Approve/Reject)
exports.updateProductStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' })
    }

    const product = await Product.findByPk(id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    await product.update({ status })

    res
      .status(200)
      .json({ message: `Product ${status} successfully!`, product })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update product status',
      error: error.message
    })
  }
}

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params

    const product = await Product.findByPk(id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    await product.destroy()

    res.status(200).json({ message: 'Product deleted successfully!' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to delete product', error: error.message })
  }
}
