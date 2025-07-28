import express from 'express';
import cors from 'cors';
import fs from 'fs';
import multer from 'multer';
import startServer from './db.js'; 
import registerValidator from './validations/auth.js';
import { checkAuth } from './utils/checkAuth.js';
import { getMe, login, register } from './controllers/UserController.js';
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from './controllers/PostContloller.js';
import postValidator from './validations/post.js';

const app = express();

// Создаем папку uploads, если нет
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer (для загрузки изображений)
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, uploadDir);
  },
  filename: (_, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Middleware
app.use(cors());
app.use(express.json());

// Статика: отдаём файлы из папки uploads по пути /uploads
app.use('/uploads', express.static(uploadDir));

// Роуты

// Регистрация, логин, получение своего профиля
app.post("/auth/register", registerValidator, register);
app.post('/auth/login', login);
app.get('/auth/me', checkAuth, getMe);

// Посты
app.get('/posts', getAllPosts);
app.get('/posts/:id', getPostById);
app.post('/posts', checkAuth, postValidator, createPost);
app.delete('/posts/:id', checkAuth, deletePost);
app.patch('/posts/:id', checkAuth, updatePost);

// Загрузка изображения 
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  try {
    res.json({
      url: `/uploads/${req.file.filename}`,
    });
  } catch (err) {
    console.error('Ошибка загрузки файла:', err);
    res.status(500).json({ message: 'Ошибка загрузки файла' });
  }
});

// Запуск сервера и подключение к БД
startServer(app);
