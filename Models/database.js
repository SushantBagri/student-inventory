require('dotenv').config();

var knex=require('knex')({
    client:"mysql",
    connection:{
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    }
})

knex.schema.createTable('students',(table)=>{
    table.increments('id').primary();
    table.string('name');
    table.string('email');
    table.string('qualification');
    table.string('DOB');
    table.integer('phone_number');
    table.string('date')
}).then(()=>{
    console.log('student table is created sucessfully')
}).catch((err)=>{
    console.log('student table is alredy exists.')
})

knex.schema.createTable('user',(table)=>{
    table.increments('id').primary();
    table.string('name');
    table.string('email');
    table.string('password');
    table.string('status').defaultTo('user');
}).then(()=>{
    console.log('user table is created sucessfully')
}).catch((err)=>{
    console.log('user table is alredy exists.')
})
module.exports=(knex);