const express = require('express');
const bodyParser=require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors=require('cors');
const app=express();
const knex=require('knex')
const profile=require('./controllers/profile')
const image=require('./controllers/image')
const signIn=require('./controllers/signIn')
const register=require('./controllers/register')
const db =knex({
  client: 'pg',              //DB to use , db
  connection: { 
    connectionString : process.env.DATABASE_URL,       //local host IP
    ssl:true
  }
});



app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{res.json('it is working');})

app.post('/signin',(req,res)=>{signIn.handleSignIn(req,res,db,bcrypt)});

app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)});

app.get('/profile/:id',(req,res)=>{porfile.handleProfileGet(req,res,db)});

app.put('/image',(req,res)=>{image.handleImage(req,res,db)});
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)});



app.listen(process.env.PORT||3000,()=>{
	console.log(`app is running on port ${process.env.PORT}`);
})

