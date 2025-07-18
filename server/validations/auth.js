import { body } from 'express-validator';

export const registerValidator = [
  body('email')
    .isEmail()
    .withMessage('Email должен быть валидным адресом'),

  body('password')
    .isLength({ min: 2 }) 
    .withMessage('Пароль должен содержать минимум 2 символов'),

  body('fullName')
    .isLength({ min: 3 })
    .withMessage('Имя должно содержать минимум 3 символа'),

    body('avatarUrl')
    .optional()
    .isURL()
    .withMessage('Аватар должен быть валидным URL')
];

export default registerValidator;