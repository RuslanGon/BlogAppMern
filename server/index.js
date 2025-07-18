import express from 'express'

import startServer from './db.js';

const app = express()

startServer(app);
