import express from 'express';
import cors from 'cors';
import { createTables } from './postgres/tableCreation';
import fs from 'fs';
import https from 'https';
import path from 'path';
import './controllers/TokenController';
import './controllers/ContentController';
import './controllers/AuthController';
import './controllers/UserController';
import { AppRouter } from './routes/AppRouter';

createTables();

const key = fs.readFileSync(path.resolve(__dirname, 'key.pem'));
const cert = fs.readFileSync(path.resolve(__dirname, 'cert.pem'));

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(AppRouter.getInstance());

https.createServer({ key, cert }, app).listen(443, () => {
  console.log('server running on 443');
});
