const mongoose = require ('mongoose');

const todoSchema = new mongoose.Schema({
    item: {
        type : String,
        required: 'This field is required',
    }
});

const todoItem = mongoose.model ('todo', todoSchema);


module.exports = todoItem;

