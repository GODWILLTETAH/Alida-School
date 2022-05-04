const express = require ('express');
const mongoose = require ('mongoose');
const router = express.Router();
var bodyParser = require ("body-parser");
const todoItem = require('../model/to-do');

router.get ('/', (req, res)=>{
    todoItem.find().sort({"_id":-1})
    .then(function (doc){
        res.render('index', {items: doc})
    })
});

router.post ('/add-item',(req, res)=>{
    var {item} = req.body;
    var item = new todoItem({item});
    item.save((err, doc)=>{
        if (!err) {
            console.log('done');
            res.redirect('/')
            // res.send (" <script>alert ('Done.Thanks')</script> ");
        } else
        console.log(err);
    })
    
});

router.get('/delete/:id', (req, res) => {
    todoItem.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/');
        }
        else { res.send(`Failed to delete ${err}`) }
    });
});

module.exports = router;