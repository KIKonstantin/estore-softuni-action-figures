const { User } = require("../models/userModel");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = "XOXOmylittlesecretXOXO";

// GET
router.get("/", async(req, res) => {
    const userList = await User.find({});
    if (!userList) {
        res.status(500).json({ success: false });
    }
    res.send(userList);
});

router.get("/get/count", async(req, res) => {
    const userCount = await User.countDocuments();
    if (!userCount) {
        res.status(500).json({
            success: false,
        });
    }

    res.send({
        userCount: userCount,
    });
});

router.get("/:id", async(req, res) => {
    const user = await User.findById(req.params.id).select("-passwordHash -_id");
    if (!user) {
        res
            .status(500)
            .json({ message: "The user with the given ID was not founded" });
    }
    res.status(200).send(user);
});

// POST
router.post("/", async(req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        country: req.body.country,
        city: req.body.city,
        zip: req.body.zip,
        street: req.body.street,
        apartment: req.body.apartment,
    });
    user = await user.save();
    if (!user) {
        return res.status(400).send("The user cannot be created");
    }
    res.send(user);
});

router.post("/login", async(req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(400).send("User not found");
    }

    if (bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign({
                userId: user.id,
                isAdmin: user.isAdmin
            },
            secret, {
                expiresIn: "1d",
            }
        );
        res.status(200).send({ user: user.email, token });
    } else {
        res.status(400).send("User not found");
    }
});

router.post("/register", async(req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        country: req.body.country,
        city: req.body.city,
        zip: req.body.zip,
        street: req.body.street,
        apartment: req.body.apartment,
    });
    user = await user.save();
    if (!user) {
        return res.status(400).send("The user cannot be created");
    }
    res.send(user);
});

// PUT
router.put("/:id", async(req, res) => {
    try {
        const userExist = await User.findById(req.params.id);
        let newPassword;
        if (req.body.password) {
            newPassword = bcrypt.hashSync(req.body.password, 10);
        } else {
            newPassword = userExist.passwordHash;
        }
        const user = await User.findByIdAndUpdate(
            req.params.id, {
                name: req.body.name,
                email: req.body.email,
                passwordHash: newPassword,
                phone: req.body.phone,
                isAdmin: req.body.isAdmin,
                country: req.body.country,
                city: req.body.city,
                zip: req.body.zip,
                street: req.body.street,
                apartment: req.body.apartment,
            }, {
                new: true,
            }
        );
        if (!user) {
            throw new Error("The user cannot be updated");
        }
        res.send(user);
    } catch (error) {
        console.error(error);
    }
});



router.delete("/:id", async(req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        if (!user) {
            throw new Error("User not found!");
        }
        return res
            .status(200)
            .json({ message: "The user was successfully deleted" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error });
    }
});

module.exports = router;