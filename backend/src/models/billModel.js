const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    tableId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Table',
        required: true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    payerName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ["CASH", "CARD", "UPI"],
        default: "CASH"
    }
}, { timestamps: true });

module.exports = mongoose.model('Bill', billSchema);
