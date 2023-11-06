const env = require('dotenv').config()
const express = require('express');
const connectDB = require("./config/db");
const productData = require('./data/product');
const Product = require('./models/Product');
const productRoutes = require('./routes/productRoutes');
const cors = require("cors");
const corsOptions = {
    origin: '*',
  };
const app = express();
app.use(cors(corsOptions));

app.use(express.json());
connectDB();

const importData = async () => {
    try{
        await Product.deleteMany({});

        await Product.insertMany(productData);

        console.log("Data Import Successfully");

        process.exit();
    } catch (error) {
        console.error("Error with data import");
        process.exit(1);
    }
   };

// importData();


app.use("/", (req, res) => {
    return res.status(200).send("Hello Welcome to  API");
  });
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
});

