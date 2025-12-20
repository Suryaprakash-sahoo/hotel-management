const express = require('express');
const AuthMiddleware = require('../middlewares/userMiddleware.js');
const order = require('../models/orderModel.js');



const router = express.Router();

router.get('/getAllOrders', AuthMiddleware, async (req, res) => {
    try {
        const orders = await order.find({paymentStatus: 'Pending'});
        res.status(200).send({
            success: true,
            message: 'Orders fetched successfully',
            orders
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error getting orders',
            error,
        });
    }
});

// create the bill
router.get('/createBill/:orderId', AuthMiddleware, async (req, res) => {
  try {
    const { orderId } = req.params;

    const existingOrder = await order
      .findById(orderId)
      .populate('items.dish'); // 🔥 MAGIC LINE

    if (!existingOrder) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    // Extract ordered food name + quantity
   const orderedItems = existingOrder.items
  .filter(item => item.dish) // 🔥 this is mandatory
  .map(item => ({
    foodName: item.dish.name,
    quantity: item.qty,
    price: item.dish.price,
    total: item.dish.price * item.qty
  }));

    res.status(200).json({
      success: true,
      tableId: existingOrder.tableId,
      customerName: existingOrder.customerName,
      customerNumber: existingOrder.customerNumber,
      items: orderedItems
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error creating bill',
      error,
    });
  }
});




module.exports = router;
