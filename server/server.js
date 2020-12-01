'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const userdb = JSON.parse(fs.readFileSync('./db.json', 'UTF-8'));
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.get('/test', (req, res) => {
  let test = 'test'
  res.status(200).json({test})
})

app.post('/getData', (req, res) => {
  res.send("Hello");
})

app.listen(8000, () => {
  console.log('Run Auth API Server')
})