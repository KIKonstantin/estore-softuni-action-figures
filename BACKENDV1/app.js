const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require('cors');

app.use(cors());
app.options('*', cors);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));


// routes
const productRouter = require('./routers/productRoutes');
const categoryRoutes = require('./routers/categoryRoutes');
const userRoutes = require('./routers/userRoutes');
const orderRoutes = require('./routers/orderRoutes');

app.use('/products', productRouter);
app.use('/categories', categoryRoutes);
app.use('/user', userRoutes);
app.use('/order', orderRoutes);

const port = 3000;
CONNECTION_STRING = "mongodb://127.0.0.1:27017/ecomm-action-figures";




mongoose
    .connect(CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "ecomm-action-figures",
    })
    .then(() => {
        console.log("Database Connection is ready");
    })
    .catch((err) => {
        console.error("ERROR --> ", err);
    });

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});