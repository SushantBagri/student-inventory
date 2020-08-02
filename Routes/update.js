const { update } = require("../Models/database");

module.exports=(updateStudent,knex,jwt)=>{
    updateStudent.put('/updateStudent/:id',(req,res)=>{
        if(req.headers.cookie!==undefined || req.headers.cookie!==''){
            let token=(req.headers.cookie).slice(6)
            jwt.verify(token,'sushant',(err,decoded_data)=>{
                if(!err){
                    if(decoded_data.status=='admin' || decoded_data.email==process.env.SUPERADMIN ){
                        knex('students')
                        .update(req.body)
                        .where('id',req.params.id)
                        .then(data=>{
                            res.send('student is udated')
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                    }
                    else{
                        res.send('yor are not an admin')
                    }
                }
                else{
                    res.send('login first!!!')
                }
            })
        }
        else{
            res.send('login first!!!')
        }
    })
}