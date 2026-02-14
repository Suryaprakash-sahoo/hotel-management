const express = require('express');
const AuthMiddleware = require('../middlewares/userMiddleware.js');
const order = require('../models/orderModel.js');
const food = require('../models/FoodModel.js');
const Bill = require('../models/billModel.js')
const Table = require('../models/tableModel.js')



const router = express.Router();

// router.get('/getAllOrders', AuthMiddleware, async (req, res) => {
//     try {
//         const orders = await order.find({paymentStatus: 'Pending'});
//         res.status(200).send({
//             success: true,
//             message: 'Orders fetched successfully',
//             orders
//         });
        
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: 'Error getting orders',
//             error,
//         });
//     }
// });

//get the order by Id
router.get('/getOrder/:orderId' , AuthMiddleware , async (req , res)=> {
  try {
     const {orderId} = req.params;
     const existingOrder = await order.findById(orderId);

     if(!existingOrder){
        return res.status(404).json({
            success: false,
            message: 'Order not found',
        });
     }
     res.status(200).json({
        success: true,
        order: existingOrder
     })
  } catch (error) {
    console.log(error);
  }
})

// create the bill
router.get('/createBill/:orderId', AuthMiddleware, async (req, res) => {
  try {
    const { orderId } = req.params;

    const existingOrder = await order
      .findById(orderId)
      

    if (!existingOrder) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

 const orderedItems = [];
 

 for( const item of existingOrder.items){
    const foodItem = await food.findById(item.dish);
    if(!foodItem){
        return res.status(404).json({
            success: false,
            message: `Food item with id ${item.dish} not found`,
        });
    } else {
        orderedItems.push({
            name: foodItem.name,
            qty: item.qty,
            price: foodItem.price,
            total: foodItem.price * item.qty
        })
    } 
 }

 console.log(orderedItems);

 const grandTotal = orderedItems.reduce((acc, item) => acc + item.total, 0);
 console.log("Grand Total: ", grandTotal);

 const newBill = new Bill({
    orderId: existingOrder._id,
    tableId: existingOrder.tableId,
    customerName: existingOrder.customerName,
    customerNumber: existingOrder.customerNumber,
    totalAmount: grandTotal,
    
  });
  await newBill.save();



    res.status(200).json({
      success: true,
      tableId: existingOrder.tableId,
      customerName: existingOrder.customerName,
      customerNumber: existingOrder.customerNumber,
      orderedItems   
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

//get All bills
router.get('/bills', AuthMiddleware, async (req, res) => {
  try {
    const bills = await Bill.find({"paymentStatus": 'Pending'})
    res.status(200).json({
      success: true,
      bills,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error getting bills',
      error,
    });
  }
});

//get the bills by id and update the payment status
router.post('/getBill/:BillId', AuthMiddleware, async (req, res) => {
  try {
    const {BillId} = req.params;
     const bill = await Bill.findById(BillId);

     if(!bill){
        return res.status(404).json({
            success: false,
            message: 'Bill not found',
        });
     }
      res.status(200).json({
        success: true,
        bill,
      });

        bill.paymentStatus = 'Paid';
        await bill.save();
         const table = bill.tableId;
        const existingTable = await Table.findById(table);
        existingTable.occupied = 'false';
        existingTable.occupiedByName = null;
        existingTable.occupiedByNumber = null;
        existingTable.totalOrders = 0;
        existingTable.totalAmount = 0;
        existingTable.paymentStatus = null;
        await existingTable.save();

        res.status(200).json({
            success: true,
            message: 'Payment successful and table updated',
        });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error getting bill',
      error,
    });
  }

})




module.exports = router; 
