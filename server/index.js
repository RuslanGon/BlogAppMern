import express from 'express';
import cors from 'cors';
import startServer from './db.js';
import registerValidator from './validations/auth.js';
import {checkAuth} from './utils/checkAuth.js'
import { getMe, login, register } from './controllers/UserController.js';
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from './controllers/PostContloller.js';
import postValidator from './validations/post.js';
import multer from 'multer'

const app = express();

// Multer(loading image)

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
      cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
const upload = multer({ storage });

// Загрузка изображений
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

  // Раздача статики из папки uploads
app.use('/uploads', express.static('uploads'));


app.use(cors());
app.use(express.json());

// Auth
app.post("/auth/register", registerValidator, register);

app.post('/auth/login', login);

app.get('/auth/me', checkAuth, getMe);

// Post

app.get('/posts', getAllPosts)

app.get('/posts/:id', getPostById)

app.post('/posts', checkAuth, postValidator, createPost)

app.delete('/posts/:id', checkAuth, deletePost )

app.patch('/posts/:id',checkAuth, updatePost)


startServer(app);
