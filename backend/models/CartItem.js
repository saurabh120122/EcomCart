import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  // We use the ID from the Fake Store API (which is a number)
  productId: { 
    type: Number, 
    required: true 
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  // Store these directly for easy access in the cart
  name: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  image: { 
    type: String 
  },
});

export default mongoose.model('CartItem', cartItemSchema);