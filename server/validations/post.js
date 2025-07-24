import { body } from 'express-validator';

export const postValidator = [
  body('title')
    .isLength({ min: 3 })
    .withMessage('Заголовок должен содержать минимум 3 символа')
    .isString()
    .withMessage('Заголовок должен быть строкой'),

  body('text')
    .isLength({ min: 3 }) 
    .withMessage('Текст должен содержать минимум 3 символа')
    .isString()
    .withMessage('Текст должен быть строкой'),

  body('tags')
    .optional()
    .isString()
    .withMessage('Теги должны быть строкой (например: "tag1,tag2")'),

  body('imageUrl', 'Неверная ссылка или изображения')
    .optional()
    .isString()
];

export default postValidator;
