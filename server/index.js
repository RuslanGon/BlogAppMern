import express from 'express'
import cors from 'cors'
import startServer from './db.js';
import registerValidator from './validations/auth.js';
import { validatorResult } from 'express-validator';


const app = express()
app.use(cors())
app.use(express.json())

app.post("/auth/register", registerValidator, (req, res) => {
  const errors = validatorResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  res.json({
    success: true,
  });
});


startServer(app);
