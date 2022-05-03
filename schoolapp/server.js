const express = require ('express');
const app = express (); //express app init
const port = 8000; //port number
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');

app.use(express.urlencoded({extended: true}));
app.use (bodyParser.json())

//connect to mongoDB Database
mongoose
        .connect ('mongodb://localhost:27017/schoolTestApp', {useNewUrlParser: true, useUnifiedTopology: true})  
        .then(() => console.log('MongoDB Connected'))
         .catch(err => console.log(err));

//Schema
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'this field is required'
    },

    gender: {
        type: String,
        required: false
    },

    department: {
        type: String,
        required: 'required'
    },

    schoolID: {
        type: String,
        required: true
    },

    contactInfo: {
        tel: [Number],
        email: [String],
        address: {
            city: String,
            street: String,
            houseNumber: String
        }
    }   

});
//student model
const student = mongoose.model('student', studentSchema);
        

//setting up routes
app.get ('/', (req, res)=>{
    res.send('Welcome to home page')
});

app.get ('/students', (req, res)=>{
    //
})

//new student post route
app.post ('/new-student', (req, res)=>{
    const newStudent = new student(req.body);

    newStudent.save((err, doc)=>{
        if(!err){
            console.log(`new student added: ${doc}`);
            res.end();
        } else {
            console.log(err);
        }
    })

});


//404 Page Handler
app.use((req, res)=>{
    res.status(404).send(`Page not found 😉`);
})

//listening on port 8000
app.listen (port, ()=>{ 
    console.log(`Server up and running on port ${port}`);
})
