const bcrypt = require("bcrypt");
const User = require("../models/User");
const asyncHandler = require("../middlewares/asyncHandler");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req,res)=>{
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
    
});

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid Email or Password",
        });
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch) {
        return res.status(401).json({
            success: false,
            message: "Invalid Email or Password",
        });
    }

    const token = generateToken(user);

    res.status(200).json({
        success: true,
        message: "Login Successful",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });

});

const profileUser = asyncHandler(async (req, res) => {

    res.status(200).json({
        success: true,
        data: req.user,
    });

});

module.exports = {
    registerUser,
    loginUser,
    profileUser,
};