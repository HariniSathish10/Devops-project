const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');
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

// Get user's wishlist
router.get('/', verifyToken, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.userId }).populate('products');
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.userId, products: [] });
    }
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add product to wishlist
router.post('/add', verifyToken, async (req, res) => {
  try {
    const { productId } = req.body;
    
    let wishlist = await Wishlist.findOne({ user: req.userId });
    
    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.userId,
        products: [productId]
      });
    } else {
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
        wishlist.updatedAt = Date.now();
        await wishlist.save();
      }
    }
    
    const updatedWishlist = await Wishlist.findById(wishlist._id).populate('products');
    res.json(updatedWishlist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Remove product from wishlist
router.delete('/remove/:productId', verifyToken, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.userId });
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }
    
    wishlist.products = wishlist.products.filter(
      product => product.toString() !== req.params.productId
    );
    wishlist.updatedAt = Date.now();
    await wishlist.save();
    
    const updatedWishlist = await Wishlist.findById(wishlist._id).populate('products');
    res.json(updatedWishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Check if product is in wishlist
router.get('/check/:productId', verifyToken, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.userId });
    const isInWishlist = wishlist ? wishlist.products.includes(req.params.productId) : false;
    res.json({ isInWishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
