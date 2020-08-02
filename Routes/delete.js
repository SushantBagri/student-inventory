module.exports=(deleteUser,knex,jwt)=>{
    deleteUser.delete('/deleteStudent/:id',(req,res)=>{
        if(req.headers.cookie!==undefined || req.headers.cookie!==''){
            let token=(req.headers.cookie).slice(6);
            jwt.verify(token,'sushant',(err,decoded_data)=>{
                if(!err){
                    if(decoded_data.status=='admin' || decoded_data.email==process.env.SUPERADMIN ){
                        knex('students')
                        .delete()
                        .where('id',req.params.id)
                        .then(data=>{
                            res.send('student is deleted')
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                    }
                    else{
                        res.send(`you are not an admin so you can't delete students data`)
                    }
                }
                else{
                    res.send('login first')
                }
            })
        }
        else{
            res.send('login first')
        }
    })
}