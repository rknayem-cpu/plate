import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  plateType: { type: String, required: true },
  plateNumber: { type: String, required: true },
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  deliveryCharge: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  
  // স্ট্যাটাস ও টাইমস্ট্যাম্প ফিল্ডসমূহ
  status: { 
    type: String, 
    enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'], 
    default: 'Pending' 
  },
  confirmedAt: { type: Date, default: null },
  shippedAt: { type: Date, default: null },
  deliveredAt: { type: Date, default: null },
  
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);