'use strict';

const express = require('express');
const mongoose = require('mongoose')
const app = express();
const cors = require('cors');
const fs = require('fs');
let userdb = JSON.parse(fs.readFileSync('./db.json', 'UTF-8'));
const bodyParser = require('body-parser');
const Tasks = require('./Tasks')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/getData', (req, res) => {
  let tasksdb = Tasks.find({});
  res.status(200).send(tasksdb);
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

app.get('/getTask', (req,res) => {
  let index = userdb.tasks.findIndex(user => user.id == req.query.id);
  res.status(200).send(userdb.tasks[index]);
})

async function start() {
  try{
    await mongoose.connect('mongodb://Valeriia:mongodb@cluster0-shard-00-00.y8u7o.mongodb.net:27017,cluster0-shard-00-01.y8u7o.mongodb.net:27017,cluster0-shard-00-02.y8u7o.mongodb.net:27017/tasks?ssl=true&replicaSet=atlas-ylet31-shard-0&authSource=admin&retryWrites=true&w=majority', {
      useNewUrlParser:true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })

    app.listen(8000, () => {
      console.log('Run Auth API Server')
    })
  } catch (e) {
    console.log(e)
  }

}

start()