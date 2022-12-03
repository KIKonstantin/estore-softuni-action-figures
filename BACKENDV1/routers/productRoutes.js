const express = require("express");
const router = express.Router();
const { Category } = require("../models/categoryModel");
const { Product } = require("../models/productModel");
const mongoose = require("mongoose");
const multer = require("multer");

const FYLE_TYPE_MAP = {
    // MIME type
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",
};
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const isValidFile = FYLE_TYPE_MAP[file.mimetype];
        let uploadErr = new Error("Invalid image type");
        if (isValidFile) {
            uploadErr = null;
        }
        cb(uploadErr, "/public/uploads");
    },
    filename: function(req, file, cb) {
        const fileName = file.originalname.replace(" ", "-").trim();
        const extension = FYLE_TYPE_MAP[file.mimetype];
        cb(null, `${filename}-${Date.now()}.${extension}`);
    },
});

const upload = multer({ storage: storage });
// GET
router.get("/", async(req, res) => {
    // localhost:3000/products?categories=
    let filter = {};
    if (req.query.categories) {
        filter = { category: req.query.categories.split(",") };
    }
    const productList = await Product.find(filter).select(
        "name image category id"
    );

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
// POST
router.post("/", upload.single("image"), async(req, res) => {
    const category = await Category.findById(req.body.category);
    if (!category) {
        return res.status(400).send("Invalid Category");
    }
    const file = req.file;
    if (!file) {
        return res.status(400).send("No image in the request");
    }
    const filename = req.file.filename;
    const basePath = `${req.protocol}://${req.get("host")}/public/upload/`;
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: `${basePath}${filename}`,
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
// PUT

router.put(
    "/gallery-images/:id",
    upload.array("images", 10),
    async(req, res) => {
        const files = req.files;
        const basePath = `${req.protocol}://${req.get("host")}/public/upload/`;
        const imagesPaths = [];

        if (files) {
            files.map((f) => {
                imagesPaths.push(`${basePath}${file.fileName}`);
            });
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id, {
                images: imagesPaths,
            }, {
                new: true,
            }
        );

        if (!product) {
            return res.status(500).send("The product cannot be updated");
        }
    }
);

router.put("/:id", upload.single('image'), async(req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send("Invalid product ID");
    }
    const category = await Category.findById(req.body.category);
    if (!category) {
        return res.status(400).send("Invalid Category");
    }
    const product = await Product.findById(req.body.id);
    if (!product) {
        return res.status(400).send('Invalid Product');
    }

    const file = req.file;
    let imagePath = '';
    if (file) {
        const fileName = file.filename;
        const basePath = `${req.protocol}://${req.get("host")}/public/upload/`;
        imagePath = `${basePath}${file.fileName}`;
    } else {
        imagePath = product.image;
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, {
                name: req.body.name,
                description: req.body.description,
                richDescription: req.body.richDescription,
                image: imagePath,
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
        if (!updatedProduct) {
            throw new Error("The product cannot be updated");
        }
        res.send(updatedProduct);
    } catch (error) {
        console.error(error);
    }
});
// DELETE
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