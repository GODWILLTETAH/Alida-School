const express = require ('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema')
const app = express();
const mongoose = require ('mongoose');

mongoose.connect('add your DB URL', {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.once('open', ()=>{
    console.log('connected to DB');
})
app.use ('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, ()=>{
    console.log('running on port 4000');
});