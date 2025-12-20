const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    tableId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Table',
        required: true
    },
    items: [
        {
          dish: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Food',
                required: true
            },
            qty: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],
    customerName: {
        type: String,
        required: true
    },
    customerNumber: {
        type: String,
        required: true
    },
    customerNotes: {
        type: String
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
