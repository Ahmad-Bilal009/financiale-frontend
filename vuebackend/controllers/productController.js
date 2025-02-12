const Product = require("../models/product");

exports.createProduct = async (req, res) => {
  try {
    const { title, description, productInformation, productType, creditGuarantees, stageOfEntrepreneurship, objectiveOfCredit, benefitsOfEntrepreneurship, geographicCoverage, requirement, contactDetail, image } = req.body;

    const userId = req.user.id;

    const product = await Product.create({
      userId,
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
      contactDetail,
      image,
      status: "pending",
    });

    res.status(201).json({ message: "Product created successfully!", product });
  } catch (error) {
    res.status(500).json({ message: "Failed to create product", error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, productInformation, productType } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.update({ title, description, productInformation, productType });

    res.status(200).json({ message: "Product updated successfully!", product });
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error: error.message });
  }
};

exports.updateProductStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.update({ status });

    res.status(200).json({ message: `Product ${status} successfully!`, product });
  } catch (error) {
    res.status(500).json({ message: "Failed to update product status", error: error.message });
  }
};
