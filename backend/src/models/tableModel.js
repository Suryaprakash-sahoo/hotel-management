const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    tableNumber: {
        type: Number,
        required: true,
        unique: true
    },
    occupied: {
        type: Boolean,
        default: false
    },
    occupiedByName: {
        type: String,
        default: null
    },
    occupiedByNumber: {
        type: String,
        default: null
    },
    capacity: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    totalOrders: {
        type: Number,
        default: 0
    },
    totalAmount: {
        type: Number,
        default: 0
    },
    orderId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Order",
  default: null
},
    paymentStatus: { type: String,
         enum: ['pending', 'paid', 'partial'],
         default: null }
}, { timestamps: true });

module.exports = mongoose.model('Table', tableSchema);
