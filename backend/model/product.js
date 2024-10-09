import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Bed', 'Dining Table', 'Study Desk', 'Washing Machine', 'Fridge', 'Sofa', 'Chair', 'TV'],
  },
  price: {
    type: Number,
    required: true
  },
  deposit: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  availability: {
    type: Boolean,
    default: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  rentDuration: {
    type: Number, 
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
}, {
  timestamps: true
});

export const Product = mongoose.model('Product', productSchema);

