const express = require ('express');
const app = express ();
const ejs = require ('ejs');
const mongoose = require ('mongoose');
const bodyParser =  require ('body-parser');
const path = require ('path');
const PORT = process.env.PORT || 7000;
app.use (express.urlencoded({extended: false}));
app.use (express.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');

const dataSchema = new mongoose.Schema({
    email: String,

    username: String,

    password: String
});

const dataModel = mongoose.model ('Restaurant', dataSchema);


app.get ('/', (req, res)=>{
    res.render ('index');
});

app.post ('/', (req, res) => {
    const {email, username, password} = req.body;
    const newData = new dataModel ({
        email, 
        username,
        password
    });
    newData.save ((err, doc)=>{
        if (!err) {
            console.log('New data added');
            res.redirect('/data')
        } else
        console.log (err);
    })
});

app.get ('/data', (req,res)=>{
    dataModel.find().sort({"_id":-1})
      .then(function(doc) {
        res.render('datatable', {posts: doc});
      });
});

app.get ("/update/:id", (req, res)=>{
    const id = req.params.id.trim()
    dataModel.findById(id)
        .exec (function(err,doc){
            if (!err) {
                res.render('edit', {post:doc})
            } else
            console.log(err);
        });
});

app.post ("/update/:id", (req, res)=>{
    const id = req.params.id.trim()
    dataModel.findByIdAndUpdate(id, req.body,{useFindAndModify:false}
    //     (err, post)=>{
    //     console.log(id);
    //     if (err) {
    //         console.log (err);
    //     } else {
    //          post.email = req.body.email;
    //          post.username = req.body.username;
    //          post.password = req.body.password;
    //         post.save();
    //     }
    // }
    
    )
    res.redirect ('/data')
    console.log(`record update`);
 });

app.get ('/delete/:_id', (req, res)=>{
    dataModel.findByIdAndRemove(req.params._id, (err, doc)=>{
        if (!err) {
            res.redirect('/data');
        } else
        console.log(err);
    });
});



mongoose
        .connect ('mongodb://localhost:27017/Restaurant_DB', {useNewUrlParser: true, useUnifiedTopology: true})  
        .then(() => console.log('MongoDB Connected'))
         .catch(err => console.log(err));

app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));


