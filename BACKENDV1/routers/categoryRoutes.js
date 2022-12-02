const { Category } = require("../models/categoryModel");
const express = require("express");
const router = express.Router();


router.get("/", async(req, res) => {
    const categoryList = await Category.find();
    if (!categoryList) {
        res.status(500).json({ success: false });
    }
    res.status(200).send(categoryList);
});

router.get('/:id', async(req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        res.status(500).json({ message: 'The category with the given ID was not founded' });
    }
    res.status(200).send(category);
});

router.post("/", async(req, res) => {

    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
    });
    try {
        category = await category.save();
        if (!category) {
            throw new Error("The category cannot be created");
        }
        res.send(category);
    } catch (error) {
        console.error(error);
    }
});

router.put('/:id', async(req, res) => {
    const category = await Category.findByIdAndUpdate()
});

router.delete('/:id', async(req, res) => {
    try {
        const category = await Category.findByIdAndRemove(req.params.id);
        if (!category) {
            throw new Error('Category not found!');
        }
        return res.status(200).json({ message: 'The category was successfully deleted' });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error });
    }

});

module.exports = router;