import express from 'express';
import cors from 'cors';
import startServer from './db.js';
import registerValidator from './validations/auth.js';
import { validationResult } from 'express-validator';
import UserModel from './models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/auth/register", registerValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash
    });

    const user = await doc.save();

    const token = jwt.sign(
      { _id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: '30d' }
    );

    const { passwordHash: _, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Не удалось зарегистрироваться',
    });
  }
});

app.post('/auth/login', async (req, res) => {
try {
  const user = await UserModel.findOne({email:req.body.email})
  if(!user) {
    return res.status(404).json({message:'Пользователь не найдет'});
  }
  const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)
  if(isValidPass) {
    return res.status(404).json({message:'Неверный логин или пароль'});
  }
  const token = jwt.sign(
    { _id: user._id },
    process.env.SECRET_KEY,
    { expiresIn: '30d' }
  );
  const { passwordHash: _, ...userData } = user._doc;

  res.json({
    ...userData,
    token,
  });
} catch (error) {
  console.error(err);
  res.status(500).json({
    message: 'Не удалось авторизоваться',
  });
}
})

startServer(app);
