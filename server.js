const express = require('express');
const bodyParser=require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors=require('cors');
const app=express();
const knex=require('knex')
const profile=require('./controllers/profile.js')
const image=require('./controllers/image.js')
const signIn=require('./controllers/signIn')
const register=require('./controllers/register')
const db =knex({
  client: 'pg',              //DB to use , db
  connection: { 
    host : '127.0.0.1',       //local host IP
    user : 'chang',
    password : '123',         //chang password = 123 ALTER USER chang PASSWORD '123';
    database : 'smart-brain'
  }
});



app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{res.json(database.users);})

app.post('/signin',(req,res)=>{signIn.handleSignIn(req,res,db,bcrypt)});

app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)});

app.get('/profile/:id',(req,res)=>{porfile.handleProfileGet(req,res,db)});

app.put('/image',(req,res)=>{image.handleImage(req,res,db)});
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)});



app.listen(3000,()=>{
	console.log('app is running on port 3000');
})
