import express from 'express';
import { urlencoded, json } from 'body-parser';
import cors from 'cors';
import moment from 'moment';

require('dotenv').config();
// const jwt = require('jsonwebtoken');

require('log-timestamp')(() => `[${moment().utc().subtract({ hour: 3 }).format('YYYY-MM-DD HH:mm:ss A')}]`);


require('child_process').fork('./websocket/index.js', [], {
  stdio: 'pipe',
}).stdout.on('data', (wsOut) => console.log(wsOut.toString()));


const app = express();

app.use(
  urlencoded({
    extended: false,
  }),
);
app.use(json());

app.use(
  cors({
    credentials: true,
    methods: 'POST, GET, PUT, DELETE, PATCH, HEAD, OPTIONS',
    origin: true,
  }),
);

app.get('/', (req, res) => {
  res.sendStatus(418);
});


export default app;
