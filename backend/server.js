const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const env = require('dotenv');
const cookieParser = require('cookie-parser');
const userRoutes = require('./src/Routes/UserRoutes.js');
const waiterRoutes = require('./src/Routes/WaiterRoutes.js');
const receptionistRoutes = require('./src/Routes/ReceptionistRoutes.js');
const Table = require('./src/models/tableModel.js');
const food = require('./src/models/FoodModel.js');

env.config();
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/user', userRoutes);
app.use('/api/waiter', waiterRoutes);
app.use('/api/receptionist', receptionistRoutes);

const insertTableData = [
    { tableNumber: 1, capacity: 4, type: 'Regular' },
    { tableNumber: 2, capacity: 2, type: 'Regular' },
    { tableNumber: 3, capacity: 6, type: 'VIP' },
    { tableNumber: 4, capacity: 4, type: 'Regular' },
    { tableNumber: 5, capacity: 8, type: 'VIP' },
    { tableNumber: 6, capacity: 2, type: 'Regular' },
    { tableNumber: 7, capacity: 4, type: 'Regular' },
    { tableNumber: 8, capacity: 6, type: 'VIP' },
    { tableNumber: 9, capacity: 2, type: 'Regular' },
    { tableNumber: 10, capacity: 4, type: 'Regular' },
    { tableNumber: 11, capacity: 8, type: 'VIP' },
    { tableNumber: 12, capacity: 4, type: 'Regular' },
    { tableNumber: 13, capacity: 6, type: 'VIP' },
    { tableNumber: 14, capacity: 2, type: 'Regular' },
    { tableNumber: 15, capacity: 4, type: 'Regular' },
    { tableNumber: 16, capacity: 6, type: 'VIP' },
    { tableNumber: 17, capacity: 2, type: 'Regular' },
    { tableNumber: 18, capacity: 4, type: 'Regular' },
    { tableNumber: 19, capacity: 8, type: 'VIP' },
    { tableNumber: 20, capacity: 4, type: 'Regular' }
];


const FoodData = [
/* ===================== MAIN COURSE (20) ===================== */
{
  name: "Chicken Biryani",
  description: "Fragrant basmati rice cooked with spiced chicken.",
  price: 199,
  category: "Main Course",
  imageUrl: "https://static.vecteezy.com/system/resources/previews/068/286/629/large_2x/delicious-chicken-biryani-recipe-2023-photo.jpg"
},
{
  name: "Mutton Biryani",
  description: "Slow-cooked mutton with aromatic rice.",
  price: 249,
  category: "Main Course",
  imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTfDqGZcUnKTQKsQn4CFzY9S54flVrZeboGQ&s"
},
{
  name: "Butter Chicken",
  description: "Creamy tomato-based chicken curry.",
  price: 229,
  category: "Main Course",
  imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN2jh7DvoLtDyDF6cigDHFrSMs5zMpaXRelA&s"
},
{
  name: "Paneer Butter Masala",
  description: "Soft paneer cubes in rich buttery gravy.",
  price: 199,
  category: "Main Course",
  imageUrl: "https://celloindia.co.in/cdn/shop/articles/09e4acfe3778136b196f0202b45f49d5_60e19218-7883-44c2-987f-76a01e6f3606_394x.jpg?v=1739959151"
},
{
  name: "Chicken Curry",
  description: "Classic Indian chicken curry.",
  price: 189,
  category: "Main Course",
  imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2hY23iTa2KYCPCkNWsk-AhAMbE4sqKLfAFQ&s"
},
{
  name: "Dal Tadka",
  description: "Yellow lentils tempered with spices.",
  price: 129,
  category: "Main Course",
  imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMOxcIvnd56qR4vzvOcUGlJSEbA8w54D1R-Q&s"
},
{
  name: "Veg Pulao",
  description: "Rice cooked with vegetables and whole spices.",
  price: 149,
  category: "Main Course",
  imageUrl: "https://www.sharmispassions.com/wp-content/uploads/2014/07/VegPulao1-500x375.jpg"
},
{
  name: "Jeera Rice",
  description: "Steamed rice tempered with cumin.",
  price: 99,
  category: "Main Course",
  imageUrl: "https://www.whiskaffair.com/wp-content/uploads/2021/06/Jeera-Rice-2-3-1.jpg"
},
{
  name: "Chicken Fried Rice",
  description: "Indo-Chinese style fried rice.",
  price: 169,
  category: "Main Course",
  imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdYscNsOtcOqTmjr0kQES62GqlrNLyk3D7Lg&s"
},
{
  name: "Veg Fried Rice",
  description: "Rice stir-fried with vegetables.",
  price: 139,
  category: "Main Course",
  imageUrl: "https://www.indianhealthyrecipes.com/wp-content/uploads/2020/12/fried-rice.jpg"
},
{
  name: "Chicken Korma",
  description: "Mild creamy chicken curry.",
  price: 219,
  category: "Main Course",
  imageUrl: "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/08/chicken-korma-recipe.jpg"
},
{
  name: "Rajma Chawal",
  description: "Red kidney beans curry with rice.",
  price: 149,
  category: "Main Course",
  imageUrl: "https://biryanibonanza.com/wp-content/uploads/2024/06/Rajma-Chawal-cover-image-2.jpg"
},
{
  name: "Chole Bhature",
  description: "Spicy chickpeas with fried bread.",
  price: 159,
  category: "Main Course",
  imageUrl: "https://madhurasrecipe.com/wp-content/uploads/2025/09/MR-Chole-Bhature-featured.jpg"
},
{
  name: "Egg Curry",
  description: "Boiled eggs in spicy gravy.",
  price: 159,
  category: "Main Course",
  imageUrl: "https://www.indianhealthyrecipes.com/wp-content/uploads/2024/06/south-indian-egg-curry-recipe.jpg"
},
{
  name: "Veg Kadai",
  description: "Mixed vegetables in kadai masala.",
  price: 169,
  category: "Main Course",
  imageUrl: "https://www.tasteatlas.com/images/dishes/d24aa6fbf6024a2c94de28fadb965701.jpeg"
},
{
  name: "Chicken Masala",
  description: "Spicy chicken curry with thick gravy.",
  price: 209,
  category: "Main Course",
  imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR76ZN2ug8bdll8SXgUSyUZGV5p6nQA1Sn4Mw&s"
},
{
  name: "Sambar Rice",
  description: "Rice mixed with flavorful sambar.",
  price: 129,
  category: "Main Course",
  imageUrl: "https://i2.wp.com/cookingfromheart.com/wp-content/uploads/2021/01/Sambar-Sadam-2.jpg?fit=684%2C1024&ssl=1"
},
{
  name: "Curd Rice",
  description: "Rice mixed with yogurt and spices.",
  price: 99,
  category: "Main Course",
  imageUrl: "https://www.vegrecipesofindia.com/wp-content/uploads/2016/07/curd-rice-2.jpg"
},
{
  name: "Fish Curry",
  description: "South Indian style fish curry.",
  price: 229,
  category: "Main Course",
  imageUrl: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/10/fish-curry-recipe.jpg"
},
{
  name: "Hyderabadi Chicken",
  description: "Spicy Hyderabadi-style chicken curry.",
  price: 239,
  category: "Main Course",
  imageUrl: "https://khinskitchen.com/wp-content/uploads/2022/05/Hyderabadi-chicken-04.jpg"
},

/* ===================== STARTERS (35) ===================== */
{
  name: "Chicken Lollipop",
  description: "Crispy fried chicken lollipops.",
  price: 149,
  category: "Starters",
  imageUrl: "https://ik.imagekit.io/iwcam3r8ka/prod/blog-header/202503/10e47cbf-7aa2-48db-8504-41a2ab47a999.jpg"
},
{
  name: "Paneer Tikka",
  description: "Grilled paneer with spices.",
  price: 179,
  category: "Starters",
  imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQybxEglCFMvPGlyt9sCI0702ySHXeuvJ2Dg&s"
},
{
  name: "Chicken Tikka",
  description: "Grilled chicken cubes.",
  price: 199,
  category: "Starters",
  imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdy2lA_TWFUVHV9A_EF33FiLpR7sVhbNzOtA&s"
},
{
  name: "Veg Manchurian",
  description: "Crispy veggie balls in sauce.",
  price: 139,
  category: "Starters",
  imageUrl: "https://storage.googleapis.com/cscom-2019.appspot.com/uploads/2018/08/Cabbage-Manchurian.jpg"
},
{
  name: "Gobi 65",
  description: "Deep fried spicy cauliflower.",
  price: 129,
  category: "Starters",
  imageUrl: "https://www.secondrecipe.com/wp-content/uploads/2024/10/cauliflower-65.jpg"
},
{
  name: "Chicken 65",
  description: "Spicy South Indian fried chicken.",
  price: 169,
  category: "Starters",
  imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfE36sXgx0UurC8aGJP0ACTDrdR7akqoEXTQ&s"
},
{
  name: "Aloo Tikka",
  description: "Spiced potato patties.",
  price: 119,
  category: "Starters",
  imageUrl: "https://static.toiimg.com/photo/53250592.cms"
},
{
  name: "Samosa",
  description: "Crispy fried pastry with potato filling.",
  price: 49,
  category: "Starters",
  imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdEDoOl6ZKEt8gFKPrXOb2Hw6wMfja-ruLdg&s"
},
{
  name: "Paneer Pakora",
  description: "Fried paneer fritters.",
  price: 129,
  category: "Starters",
  imageUrl: "https://www.vegrecipesofindia.com/wp-content/uploads/2025/03/paneer-pakora-2.jpg"
},
{
  name: "Onion Pakora",
  description: "Crispy onion fritters.",
  price: 89,
  category: "Starters",
  imageUrl: "https://rakskitchen.net/wp-content/uploads/2010/06/Onion-pakoda.jpg"
},
// (25 more starter items can be added similarly)

/* ===================== DESSERTS (25) ===================== */
{
  name: "Gulab Jamun",
  description: "Soft milk balls soaked in sugar syrup.",
  price: 79,
  category: "Desserts",
  imageUrl: "https://pipingpotcurry.com/wp-content/uploads/2023/12/Gulab-Jamun-Recipe-Piping-Pot-Curry.jpg"
},
{
  name: "Rasgulla",
  description: "Spongy cottage cheese balls.",
  price: 89,
  category: "Desserts",
  imageUrl: "https://www.kuchpakrahahai.in/wp-content/uploads/2020/05/Rasgulla-2BRecipe-2Bin-2BPressure-2BCooker-e1626148996679.jpg"
},
{
  name: "Kheer",
  description: "Rice pudding with milk and nuts.",
  price: 99,
  category: "Desserts",
  imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgesKcUqN2L6golaAWn-yxfI6AcYamBiP5Bg&s"
},
// (22 more desserts)

/* ===================== BEVERAGES (20) ===================== */
{
  name: "Masala Chai",
  description: "Indian spiced tea.",
  price: 39,
  category: "Beverages",
  imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOCrcEsFgzkQg9Kf64adJq32zoZ1965qmQ0A&s"
},
{
  name: "Filter Coffee",
  description: "South Indian style coffee.",
  price: 49,
  category: "Beverages",
  imageUrl: "https://truesouth.in/cdn/shop/files/southindian1.jpg?v=1707477021"
},
{
  name: "Sweet Lassi",
  description: "Sweet yogurt-based drink.",
  price: 69,
  category: "Beverages",
  imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWv3GK9uQtfoILrg3A6nVY6Fecsmcy5TDqOA&s"
},

];
// Routes

mongoose.connect(MONGO_URI).then(async() => {

    // await Table.deleteMany({});
    // console.log('Existing table data cleared');
    // await Table.insertMany(insertTableData);
    // console.log('Table data inserted successfully');
    // await food.deleteMany({});
    // console.log('Existing food data cleared');
    // await food.insertMany(FoodData);
    // console.log('Food data inserted successfully');
    console.log('Connected to MongoDB');}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);});


    app.get('/', (req, res) => {
    res.send('Hotel Management System API is running');});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);});
