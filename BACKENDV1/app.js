const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const authJwt = require('./helpers/jwt');
const errorHandler = require("./helpers/error-handler");
const CONNECTION_STRING = "mongodb://127.0.0.1:27017/ecomm-action-figures";
const port = 3000;

app.use(cors());
app.options("*", cors);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

// USER AUTHORIZATION 
// app.use(authJwt());


// routes
const productRouter = require("./routers/productRoutes");
const categoryRoutes = require("./routers/categoryRoutes");
const userRoutes = require("./routers/userRoutes");
const orderRoutes = require("./routers/orderRoutes");

app.use("/products", productRouter);
app.use("/categories", categoryRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.use(errorHandler)
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