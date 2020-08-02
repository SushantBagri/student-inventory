const express=require('express');
const app=express();
const knex=require('./Models/database')

app.use(express.json())

const jwt=require('jsonwebtoken');
const PORT=process.env.PORT || 4000;

let allstudent=express.Router();
app.use('/',allstudent)
require('./Routes/allstudent')(allstudent,knex,jwt);


//for login
let login=express.Router();
app.use('/',login);
require('./Routes/login')(login,knex,jwt);

//for signup
let signup=express.Router();
app.use('/',signup);
require('./Routes/signup')(signup,knex);

//for create
let create=express.Router();
app.use('/',create);
require('./Routes/create')(create,knex,jwt);

//for delete
let deleteUser=express.Router();
app.use('/',deleteUser);
require('./Routes/delete')(deleteUser,knex,jwt);


//for update
let updateStudent=express.Router();
app.use('/',updateStudent);
require('./Routes/update')(updateStudent,knex,jwt);


app.listen(PORT,()=>{
    console.log(`your app is running at ${PORT} port`)
})