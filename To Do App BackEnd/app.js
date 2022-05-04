const express = require ('express');
const app = express ();
const port = 3000;
const ejs = require ('ejs');
const mongoose = require ('mongoose');
const path = require('path');
var bodyParser = require ("body-parser");
app.use (express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');
app.use('/', require('./routes/index'))

mongoose
        .connect ('mongodb://localhost:27017/ToDoApp', {useNewUrlParser: true, useUnifiedTopology: true})  
        .then(() => console.log('MongoDB Connected'))
         .catch(err => console.log(err));

app.listen (port, ()=>{
  console.log(`listening on port ${port}`);
})