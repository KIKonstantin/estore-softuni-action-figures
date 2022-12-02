const express = require("express");
const router = express.Router();
const { Category } = require("../models/categoryModel");
const { Product } = require("../models/productModel");
const mongoose = require("mongoose");

router.get("/", async(req, res) => {
    // localhost:3000/products?categories=
    let filter = {};
    if (req.query.categories) {
        filter = { category: req.query.categories.split(",") };
    }
    const productList = await Product.find(filter).select('name image category id');

    if (!productList) {
        res.status(500).json({
            success: false,
        });
    }

    res.send(productList);
});

router.get("/get/count", async(req, res) => {
    const productCount = await Product.countDocuments();
    if (!productCount) {
        res.status(500).json({
            success: false,
        });
    }

    res.send({
        productCount,
    });
});

router.get("/get/featured/:count", async(req, res) => {
    const count = req.params.count ? req.params.count : 0;
    const featuredProducts = await Product.find({ isFeatured: true }).limit(+count);

    if (!featuredProducts) {
        res.status(500).json({
            success: false,
        });
    }

    res.send({
        featuredProducts: featuredProducts,
    });
});

router.get("/:id", async(req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send("Invalid product ID");
    }
    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
        res.status(500).json({
            success: false,
        });
    }

    res.send(product);
});

router.post("/", async(req, res) => {
    const category = await Category.findById(req.body.category);
    if (!category) {
        return res.status(400).send("Invalid Category");
    }

    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    });

    product = await product.save();
    if (!product) {
        return res.status(500).send("The product cannot be created");
    }
    res.send(product);
});

router.put("/:id", async(req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send("Invalid product ID");
    }
    const category = await Category.findById(req.body.category);
    if (!category) {
        return res.status(400).send("Invalid Category");
    }
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id, {
                name: req.body.name,
                description: req.body.description,
                richDescription: req.body.richDescription,
                image: req.body.image,
                brand: req.body.brand,
                price: req.body.price,
                category: req.body.category,
                countInStock: req.body.countInStock,
                rating: req.body.rating,
                numReviews: req.body.numReviews,
                isFeatured: req.body.isFeatured,
            }, {
                new: true,
            }
        );
        if (!product) {
            throw new Error("The product cannot be updated");
        }
        res.send(product);
    } catch (error) {
        console.error(error);
    }
});

router.delete("/:id", async(req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send("Invalid product ID");
    }
    try {
        const product = await Product.findByIdAndRemove(req.params.id);
        if (!product) {
            throw new Error("Category not found!");
        }
        return res
            .status(200)
            .json({ message: "The category was successfully deleted" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error });
    }
});

module.exports = router;