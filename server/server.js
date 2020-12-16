'use strict';

const express = require('express');
const mongoose = require('mongoose')
const app = express();
const cors = require('cors');
const fs = require('fs');
// let userdb = JSON.parse(fs.readFileSync('./db.json', 'UTF-8'));
const bodyParser = require('body-parser');
const Tasks = require('./Tasks')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/tasks', (req, res) => {

  const task = new Tasks({
    _id: new mongoose.Types.ObjectId(),
    task_name: req.body.task_name,
    task_description: req.body.task_description,
    deadline: req.body.deadline,
    email: req.body.deadline,
  })

  task.save().then(result => {
    console.log(result)
  }).catch(error => {
    console.log(error)
  })

  res.status(201).json({
    message: "New Task created",
    createdTask: task
  });

})

app.get('/tasks', async (req, res, next) => {
  try{
    const Store_Tasks = await Tasks.find();
    res.json(Store_Tasks)
  }catch(error){
    res.status(500).json({message: error.message})
  }
})

app.get('/tasks/:id', async (req, res) => {
  //console.log(req.params.id)
  const taskById = await Tasks.find({"_id": req.params.id})
  res.status(200).send(taskById)
}
)

app.delete('/tasks', async (req,res) => {
  await Tasks.deleteOne({"_id": req.query.id});
  await res.status(200).json({cool: "cool"})
})


mongoose.connect("mongodb://admin:admin@cluster0-shard-00-00.asjqo.mongodb.net:27017,cluster0-shard-00-01.asjqo.mongodb.net:27017,cluster0-shard-00-02.asjqo.mongodb.net:27017/todonuxt?ssl=true&replicaSet=atlas-l4ekkz-shard-0&authSource=admin&retryWrites=true&w=majority", { useNewUrlParser: true }, function(err){
    if(err) return console.log(err);
    app.listen(8000, function(){
        console.log("Сервер ожидает подключения...");
    });
});