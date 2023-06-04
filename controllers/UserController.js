import bcrypt from 'bcrypt';
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js"


export const register = async (req, res) => {
    try {
    
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json(errors.array())
        };

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const pwdhash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            name: req.body.name,
            passwordHash: pwdhash,
            avatarUrl: req.body.avatarUrl
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
            _id: user._id
            },
            'secret123',
            {
            expiresIn: '1d'
            }
        );
        
        const {passwordHash, ...userData} = user._doc;

        res.json({
            userData,
            token
        });

    } catch (err){
        console.log(err)
        res.status(500).json({
            message: 'Register failed'
        })
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if (!user){
            return res.status(404).json({
                message: 'User not found'
            });
        };

        const {passwordHash, ...userData} = user._doc;

        res.json({
            userData
        });

    } catch (err) {
        res.status(500).json({
            message: 'Server failed'
        })
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email})
        if (!user){
            return res.status(404).json({
                message: 'User not found'
            });
        };

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        console.log(isValidPass)
        if (!isValidPass){
            return res.status(400).json({
                message: 'Incorrect user or password'
            });
        }

        const token = jwt.sign(
            {_id: user._id},
            'secret123',
            {expiresIn: '1d'}
        );

        const {passwordHash, ...userData} = user._doc;

        res.json({
            userData,
            token
        });

    } catch (err){
        console.log(err)
        res.status(500).json({
            message: 'Login failed'
        })
    }
}