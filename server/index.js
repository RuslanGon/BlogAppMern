import express from 'express';
import cors from 'cors';
import startServer from './db.js';
import registerValidator from './validations/auth.js';
import {checkAuth} from './utils/checkAuth.js'
import { getMe, login, register } from './controllers/UserController.js';
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from './controllers/PostContloller.js';
import postValidator from './validations/post.js';

const app = express();
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
