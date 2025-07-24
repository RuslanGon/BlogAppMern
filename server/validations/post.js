import { body } from 'express-validator';

export const postValidator = [
  body('title')
    .isLength({ min: 3 })
    .withMessage('Заголовок должен содержать минимум 3 символа'),

  body('text')
    .isLength({ min: 10 }) 
    .withMessage('Текст должен содержать минимум 10 символов'),

  body('tags')
    .optional()
    .isArray()
    .withMessage('Теги должны быть массивом'),

  body('imageUrl')
    .optional()
    .isURL()
    .withMessage('Изображение должно быть валидным URL')
];

export default postValidator;
