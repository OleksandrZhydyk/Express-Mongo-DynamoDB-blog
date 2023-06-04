import { body } from "express-validator";

export const registerValidator = [
    body('email', 'Incorrect email').isEmail(),
    body('password', 'Passsword less then 8 symbols').isLength({ min: 8}),
    body('name', 'Name less then 4 symbols').isLength({min:4}),
    body('avatarUrl').optional().isURL(),
]

export const loginValidator = [
    body('email', 'Incorrect email').isEmail(),
    body('password', 'Passsword less then 8 symbols').isLength({ min: 8})
]
