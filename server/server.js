'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
let userdb = JSON.parse(fs.readFileSync('./db.json', 'UTF-8'));
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/getData', (req, res) => {
  res.status(200).send(userdb);
})

app.post('/sendData', (req, res) => {
  userdb.tasks.push(req.body);
  userdb = JSON.stringify(userdb);
  fs.writeFileSync('./db.json', userdb);
  res.send("cool");
})

app.delete('/deleteTask', (req,res) => {
  let deleteIndex = userdb.tasks.findIndex(user => user.id == req.query.id);
  userdb.tasks.splice(deleteIndex, 1);
  userdb = JSON.stringify(userdb);
  fs.writeFileSync('./db.json', userdb);
  res.status(200).send("cool");
})

app.listen(8000, () => {
  console.log('Run Auth API Server')
})