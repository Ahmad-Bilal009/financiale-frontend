const Product = require("../models/product");
const { Op } = require("sequelize");

// Increment visitor count when a product is viewed
exports.incrementVisitor = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Increase visitor count
    await product.increment("visitorCount");

    res.status(200).json({ message: "Visitor count updated!", visitorCount: product.visitorCount + 1 });
  } catch (error) {
    res.status(500).json({ message: "Error updating visitor count", error: error.message });
  }
};

// Get total visitors count for all products
exports.getTotalVisitors = async (req, res) => {
  try {
    const totalVisitors = await Product.sum("visitorCount");
    res.status(200).json({ totalVisitors });
  } catch (error) {
    res.status(500).json({ message: "Error fetching total visitors", error: error.message });
  }
};

// Get visitor count for a specific product
exports.getProductVisitors = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByPk(productId, { attributes: ["visitorCount"] });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ visitorCount: product.visitorCount });
  } catch (error) {
    res.status(500).json({ message: "Error fetching product visitors", error: error.message });
  }
};

// Get total visitors for each user who created products
exports.getUserVisitors = async (req, res) => {
  try {
    const { userId } = req.params;
    const totalUserVisitors = await Product.sum("visitorCount", { where: { userId } });

    res.status(200).json({ userId, totalVisitors: totalUserVisitors });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user visitors", error: error.message });
  }
};

// Get sorted visitor counts (Today, This Week, This Month)
exports.getSortedVisitors = async (req, res) => {
  try {
    const { filter } = req.query;

    let dateFilter;
    if (filter === "today") {
      dateFilter = { [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)) };
    } else if (filter === "thisWeek") {
      dateFilter = { [Op.gte]: new Date(new Date().setDate(new Date().getDate() - 7)) };
    } else if (filter === "thisMonth") {
      dateFilter = { [Op.gte]: new Date(new Date().setDate(1)) };
    } else {
      return res.status(400).json({ message: "Invalid filter. Use 'today', 'thisWeek', or 'thisMonth'." });
    }

    const visitors = await Product.findAll({
      where: { updatedAt: dateFilter },
      attributes: ["id", "title", "visitorCount"],
      order: [["visitorCount", "DESC"]],
    });

    res.status(200).json({ visitors });
  } catch (error) {
    res.status(500).json({ message: "Error fetching sorted visitors", error: error.message });
  }
};
