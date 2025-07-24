import express from 'express';
import cors from 'cors';
import startServer from './db.js';
import registerValidator from './validations/auth.js';
import {checkAuth} from './utils/checkAuth.js'
import { getMe, login, register } from './controllers/UserController.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post("/auth/register", registerValidator, register);

app.post('/auth/login', login);

app.get('/auth/me', checkAuth, getMe);

startServer(app);
