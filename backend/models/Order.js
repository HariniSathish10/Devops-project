const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: String,
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    },
    image: String
  }],
  shippingAddress: {
    name: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: { type: String, default: 'India' }
  },
  paymentMethod: {
    type: String,
    enum: ['COD', 'UPI', 'Card', 'NetBanking'],
    default: 'COD'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending'
  },
  itemsPrice: {
    type: Number,
    required: true
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0
  },
  totalPrice: {
    type: Number,
    required: true
  },
  orderStatus: {
  type: String,
  enum: [
    'Order Placed',
    'Payment Confirmed',
    'Packed',
    'Shipped',
    'Out For Delivery',
    'Delivered',
    'Cancelled'
  ],
  default: 'Order Placed'
},

trackingNumber: {
  type: String,
  default: ''
},

estimatedDeliveryDate: {
  type: Date
},

statusHistory: [
  {
    status: String,
    date: {
      type: Date,
      default: Date.now
    }
  }
],
  isDelivered: {
    type: Boolean,
    default: false
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
orderSchema.pre('save', function (next) {
  if (this.isNew) {
    this.statusHistory.push({
      status: 'Order Placed',
      date: new Date()
    });

    this.trackingNumber =
      'TRK' +
      Math.random().toString(36).substring(2, 10).toUpperCase();

    this.estimatedDeliveryDate =
      new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
  }

  next();
});

module.exports = mongoose.model('Order', orderSchema);
