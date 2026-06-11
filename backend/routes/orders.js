const { sendOrderAlert } = require('../mailService');
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Create new order
router.post('/', verifyToken, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;
    
    const itemsPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shippingPrice = itemsPrice > 1000 ? 0 : 99;
    const taxPrice = itemsPrice * 0.18;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;
    
    const order = await Order.create({
      user: req.userId,
      items,
      shippingAddress,
      paymentMethod: paymentMethod || 'COD',
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice
    });
    try {
  await sendOrderAlert(order);
  console.log("Email sent successfully");
} catch (err) {
  console.error("Email failed:", err);
}
    
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user's orders
router.get('/', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single order
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    if (order.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status (Admin)
router.put('/:id/status', async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus, updatedAt: Date.now() },
      { new: true }
    );
    
    if (orderStatus === 'Delivered') {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      await order.save();
    }
    
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Update order status (Admin)
router.put('/:id/status', async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus, updatedAt: Date.now() },
      { new: true }
    );

    if (orderStatus === 'Delivered') {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      await order.save();
    }

    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// ADD THIS NEW ROUTE HERE
router.put('/:id/cancel', verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    order.orderStatus = 'Cancelled';

    order.statusHistory.push({
      status: 'Cancelled',
      date: new Date()
    });

    await order.save();

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      order
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
