const Product = require('../models/product')
const { Op } = require('sequelize')
const moment = require('moment')

exports.getTotalVisitors = async (req, res) => {
  try {
    const today = moment().format('YYYY-MM-DD')
    const startOfWeek = moment().startOf('isoWeek').format('YYYY-MM-DD')
    const startOfMonth = moment().startOf('month').format('YYYY-MM-DD')

    const products = await Product.findAll({
      attributes: ['visitorCount']
    })

    let totalVisitors = 0
    let todayVisitors = 0
    let weekVisitors = 0
    let monthVisitors = 0

    products.forEach(product => {
      const visitorData = product.visitorCount || {} // Ensure visitorCount is an object

      //  Sum all visitors for total count
      totalVisitors += Object.values(visitorData).reduce(
        (acc, count) => acc + count,
        0
      )

      //  Check if visitorData contains today's date
      if (visitorData[today]) {
        todayVisitors += visitorData[today]
      }

      //  Sum up all visitors from the start of the week
      Object.keys(visitorData).forEach(date => {
        if (date >= startOfWeek) {
          weekVisitors += visitorData[date]
        }
      })

      //  Sum up all visitors from the start of the month
      Object.keys(visitorData).forEach(date => {
        if (date >= startOfMonth) {
          monthVisitors += visitorData[date]
        }
      })
    })

    res.status(200).json({
      totalVisitors,
      todayVisitors,
      weekVisitors,
      monthVisitors
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching visitor data',
      error: error.message
    })
  }
}

// Get visitor count for a specific product
exports.getProductVisitors = async (req, res) => {
  try {
    const { productId } = req.params
    const product = await Product.findByPk(productId, {
      attributes: ['visitorCount']
    })

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    const visitorCount = Array.isArray(product.visitorCount)
      ? product.visitorCount.length
      : 0

    res.status(200).json({ visitorCount })
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching product visitors',
      error: error.message
    })
  }
}

const getDateRanges = () => {
  const today = new Date()
  const todayStr = today.toISOString().split('T')[0] // YYYY-MM-DD

  // Start of this week (Sunday as start)
  const firstDayOfWeek = new Date(today)
  firstDayOfWeek.setDate(today.getDate() - today.getDay())
  const weekStr = firstDayOfWeek.toISOString().split('T')[0]

  // Start of this month
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const monthStr = firstDayOfMonth.toISOString().split('T')[0]

  return { todayStr, weekStr, monthStr }
}

// Get total visitors for each user who created products
exports.getUserVisitors = async (req, res) => {
  try {
    const { userId } = req.params
    const { todayStr, weekStr, monthStr } = getDateRanges()

    // Fetch all products for the user
    const products = await Product.findAll({
      where: { userId },
      attributes: ['visitorCount']
    })

    let totalToday = 0
    let totalWeek = 0
    let totalMonth = 0
    let totalAllTime = 0

    products.forEach(product => {
      let visitorData = product.visitorCount

      // Ensure visitorData is a valid object
      if (!visitorData || typeof visitorData !== 'object') {
        try {
          visitorData = JSON.parse(visitorData || '{}')
        } catch (error) {
          visitorData = {}
        }
      }

      // Loop through visitorCount object
      for (const [date, count] of Object.entries(visitorData)) {
        if (date >= todayStr) totalToday += count
        if (date >= weekStr) totalWeek += count
        if (date >= monthStr) totalMonth += count
        totalAllTime += count
      }
    })

    res.status(200).json({
      userId,
      totalVisitors: totalAllTime,
      todayVisitors: totalToday,
      weekVisitors: totalWeek,
      monthVisitors: totalMonth
    })
  } catch (error) {
    console.error('Error fetching user visitors:', error)
    res.status(500).json({
      message: 'Error fetching user visitors',
      error: error.message
    })
  }
}

// Increment visitor count
exports.incrementVisitor = async (req, res) => {
  try {
    const { productId } = req.params
    const today = new Date().toLocaleDateString('en-CA')

    const product = await Product.findByPk(productId)

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    let visitorData = product.visitorCount || {}

    if (typeof visitorData === 'string') {
      try {
        visitorData = JSON.parse(visitorData)
      } catch (error) {
        visitorData = {}
      }
    }
    visitorData[today] = (visitorData[today] || 0) + 1
    product.set('visitorCount', visitorData)
    product.changed('visitorCount', true)

    await product.save()

    res.status(200).json({
      message: 'Visitor count updated!',
      visitorCount: visitorData
    })
  } catch (error) {
    console.error('Error updating visitor count:', error)
    res
      .status(500)
      .json({ message: 'Error updating visitor count', error: error.message })
  }
}

exports.getSortedVisitors = async (req, res) => {
  try {
    const { filter } = req.query
    const now = new Date()

    let startDate
    if (filter === 'today') {
      startDate = new Date().toISOString().split('T')[0] // Today (YYYY-MM-DD)
    } else if (filter === 'thisWeek') {
      const startOfWeek = new Date()
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())
      startDate = startOfWeek.toISOString().split('T')[0] // Start of the week
    } else if (filter === 'thisMonth') {
      startDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
        2,
        '0'
      )}-01` // Start of the month
    } else {
      return res.status(400).json({
        message: "Invalid filter. Use 'today', 'thisWeek', or 'thisMonth'."
      })
    }

    const products = await Product.findAll({
      attributes: ['id', 'title', 'visitorCount']
    })

    const filteredVisitors = products.map(product => {
      const visitorData = product.visitorCount || {}
      let countInRange = 0

      for (const date in visitorData) {
        if (date >= startDate) {
          countInRange += visitorData[date]
        }
      }

      return {
        id: product.id,
        title: product.title,
        visitorCount: countInRange
      }
    })

    // Sort by visitor count in descending order
    filteredVisitors.sort((a, b) => b.visitorCount - a.visitorCount)

    res.status(200).json({ visitors: filteredVisitors })
  } catch (error) {
    console.error('Error fetching sorted visitors:', error)
    res
      .status(500)
      .json({ message: 'Error fetching sorted visitors', error: error.message })
  }
}
