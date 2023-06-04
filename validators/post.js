import { body } from "express-validator";

export const postCreateValidator = [
    body('title', 'Incorrect title').isLength({ min: 3}).isString(),
    body('text', 'Text less then 8 symbols').isLength({ min: 8}),
    body('tags', 'Tags should be array').optional().isArray(),
    body('imageUrl').optional().isURL(),
]
