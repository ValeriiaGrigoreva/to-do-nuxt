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

app.get("/tasks", async (req, res, next) => {
  try{
    const Store_Tasks = await Tasks.find();
    res.json(Store_Tasks)
  }catch(error){
    res.status(500).json({message: error.message})
  }
})

// app.post('/sendData', (req, res) => {
//   userdb.tasks.push(req.body);
//   userdb = JSON.stringify(userdb);
//   fs.writeFileSync('./db.json', userdb);
//   res.send("cool");
// })

// app.delete('/deleteTask', (req,res) => {
//   let deleteIndex = userdb.tasks.findIndex(user => user.id == req.query.id);
//   userdb.tasks.splice(deleteIndex, 1);
//   userdb = JSON.stringify(userdb);
//   fs.writeFileSync('./db.json', userdb);
//   res.status(200).send("cool");
// })

// app.get('/getTask', (req,res) => {
//   let index = userdb.tasks.findIndex(user => user.id == req.query.id);
//   res.status(200).send(userdb.tasks[index]);
// })

mongoose.connect("mongodb+srv://admin:admin@cluster0.asjqo.mongodb.net/todonuxt?retryWrites=true&w=majority", { useNewUrlParser: true }, function(err){
    if(err) return console.log(err);
    app.listen(3000, function(){
        console.log("Сервер ожидает подключения...");
    });
});

// async function start() {
//   try{
//     await mongoose.connect('mongodb+srv://admin:admin@cluster0.asjqo.mongodb.net/todonuxt?retryWrites=true&w=majority', {
//       useNewUrlParser:true,
//       useFindAndModify: false,
//       useUnifiedTopology: true
//     })

//     app.listen(8000, () => {
//       console.log('Run Auth API Server')
//     })
//   } catch (e) {
//     console.log(e)
//   }

// }

// start()