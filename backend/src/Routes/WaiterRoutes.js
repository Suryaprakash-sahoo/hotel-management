const express = require('express');
const AuthMiddleware = require('../middlewares/userMiddleware.js');
const User = require('../models/UserModel.js');
const Table = require('../models/tableModel.js');
const Order = require('../models/orderModel.js');

const router = express.Router();

// Get Lioggedin User Dashboard
router.get('/dashboard', AuthMiddleware, async (req, res) => {
    try {
          const user = await User.findById(req.user.id)
          console.log("User:", user);
          res.status(200).json({
              success: true,
              message: `Welcome to the dashboard, ${user.username}!`
          });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});


// GET all tables 
router.get('/AllTables',AuthMiddleware, async (req, res) => {
  try {
    const tables = await Table.find().sort({ tableNumber: 1 });

    res.status(200).json({
      success: true,
      count: tables.length,
      tables
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


//check table status
router.get('/tableStatus/:tablenumber', AuthMiddleware, async (req, res) => {
    try {

        const tableNumber = Number(req.params.tablenumber);

        
        const table = await Table.findOne({tableNumber});


        if(!table) {
            return res.status(404).json({
                success: false,
                message: "Table not found"
            });
        }
        console.log("Table:", table);
        res.status(200).json({
            success: true,
            table: table,
            message: `Table ${tableNumber} status retrieved successfully`
        
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});


// Switch booking
router.get('/switchBooking', AuthMiddleware, async (req, res) => {
    try {
      const tableData =  await Table.find({});
      const availableVip = tableData.filter(table => table.type === 'VIP' && table.occupied === false);
      const availableRegular = tableData.filter(table => table.type === 'Regular' && table.occupied === false);
       const availableVIPseats = availableVip.length;
       const availableRegularseats = availableRegular.length;
       const totalAvailableSeats = availableVIPseats + availableRegularseats;
       console.log("Total Available Seats:", totalAvailableSeats);

        res.status(200).json({
            success: true,
            availableVIPseats,
            availableRegularseats,
            totalAvailableSeats,
            message: "Table availability retrieved successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "something went wrong"
        });
    }
})

//book a proper Table
router.post('/bookTable/:tableNumber', AuthMiddleware, async (req, res) => {
    try {
        const tableNumber = Number(req.params.tableNumber);
        const { occupiedByName, occupiedByNumber } = req.body;
        
        // Find the table by the table number
        const tableToBook = await Table.findOne({ tableNumber });

        // Check if table exists
        if (!tableToBook) {
            return res.status(404).json({
                success: false,
                message: "Table not found"
            });
        }

        // Check if table is already occupied
        if (tableToBook.occupied) {
            return res.status(400).json({
                success: false,
                message: `Table ${tableNumber} is already occupied`
            });
        } 

        

        // Update the table with booking details and paymentStatus
        const updatedTable = await Table.findOneAndUpdate(
            { tableNumber },
            {
                $set: {
                    occupied: true,
                    occupiedByName,
                    occupiedByNumber,
                    paymentStatus: 'pending'
                }
            },
            { new: true } // Returns the updated document
        );

        // Log for debugging
        console.log("Table booked successfully:", updatedTable);

        res.status(200).json({
            success: true,
            table: updatedTable,
            message: `Table ${tableNumber} booked successfully`
        });

    } catch (error) {
        console.error("Error booking table:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while booking the table"
        });
    }
});



//Swiitch cancel booking
router.get('/switchCancel', AuthMiddleware, async (req, res) => {
    try {
         const AllBookedTables = await Table.find({ occupied: true });
         res.status(200).json({
            success: true,
            AllBookedTables,
            message: "All booked tables retrieved successfully"
         })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "something went wrong"
        });
    }
})


//cancel booking by the table number
router.post('/cancelBooking/:tableNumber', AuthMiddleware , async(req , res)=> {
    try{
          const tableNumber = Number(req.params.tableNumber);
          if(!tableNumber){
            return res.status(400).json({
                success: false,
                message: "Table number is required"
            });
          }

          const TableToCancel = await Table.findOne({tableNumber})
          if(TableToCancel.occupied === true){
            const UpdatedTable = await Table.findOneAndUpdate(
                {tableNumber},
                {
                    $set: {
                        occupied:false,
                        occupiedByName: null,
                        occupiedByNumber: null,
                        paymentStatus: null
                    }
                },
                {new: true}
            );
            console.log("Booking cancelled successfully:", UpdatedTable);
            return res.status(200).json({
                success: true,
                table: UpdatedTable,
                message: `Booking for table ${tableNumber} cancelled successfully`
            });
          } else {
            return res.status(400).json({
                success: false,
                message: `Table ${tableNumber} is not currently booked`
            });
          }
          

    } catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Cancellation of booking table failed"
        });
    }
})


// CRUD OPERATION STARTS HERE FOR ORDERS


// Create a new order
router.post('/createOrder/:tableId', AuthMiddleware, async (req, res) => {
    try {
        const tableId = req.params.tableId;
        const table = await Table.findById(tableId);

        if(!table){
            return res.status(404).json({
                success: false,
                message: "Table not found"
            });
        }
        if(!table.occupied){
            return res.status(400).json({
                success: false,
                message: "Cannot create order for unoccupied table"
            });
        }
        console.log("Table found:", table);
        const customerName = table.occupiedByName;
        const customerNumber = table.occupiedByNumber;
        const { items, customerNotes } = req.body;
         
         const newOrder = new Order({
            tableId,
            items,
            customerName,
            customerNumber,
            customerNotes
         });
            await newOrder.save();
            console.log("Order created successfully:", newOrder);
          res.status(201).json({
            success: true,
            order: newOrder,
            message: "Order created successfully"
          });

       
    } catch (error) {
       console.log(error);
       res.status(500).json({
        success: false,
        message: "Internal server error"
       });
    }
});


// edit the order 

router.put('/addItems/:orderId', AuthMiddleware, async (req, res) => {
  try {
    const { orderId } = req.params;
    const { items } = req.body; // Changed: expecting items array

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    // Add all items from the request array
    items.forEach(item => {
      order.items.push({
        dish: item.dish,
        qty: Number(item.qty)
      });
    });

    await order.save();

    res.status(200).json({
      success: true,
      order,
      message: "Items added to order successfully"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});












module.exports = router;
