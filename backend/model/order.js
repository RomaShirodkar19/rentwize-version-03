const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',  
    required: true
  },
  rentalPeriod: {
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    }
  },
  rentPerMonth: {
    type: Number,  
  },
  totalRent: {
    type: Number,  
    required: true
  },
  paymentScheme: {
    type: String,
    enum: ['full', 'partial'],  
    required: true
  },
  depositAmount: {
    type: Number,  
    default: 0,    
  },
  amountPaid: {
    type: Number,  
    required: true
  },
  remainingRent: {
    type: Number,  
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'partial'],
    default: 'pending'
  },
  orderDate: {
    type: Date,
    default: Date.now  
  },
  isCancelled: {
    type: Boolean,
    default: false
  }
});


orderSchema.pre('save', function (next) {
  if (this.paymentScheme === 'partial') {
    this.remainingRent = this.totalRent - this.amountPaid;
  } else {
    this.depositAmount = 0;  
    this.remainingRent = 0;  
  }
  next();
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
