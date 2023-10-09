
const express=require('express');
const app=express();
var bodyParser=require('body-parser');
var db=require('./server')

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

const FetchRestaurantsRouter=require('./restaurants.js');
const FetchMenuRouter=require('./menu.js');

app.use('/Api',FetchRestaurantsRouter);
app.use('/Api',FetchMenuRouter);
app.listen(3000,()=> console.log('your server is running on port 3000'))

