module.exports=(create,knex,jwt)=>{
    create.post('/createStudent',(req,res)=>{
        if(req.headers.cookie!==undefined || req.headers.cookie!==''){
            let token=(req.headers.cookie).slice(6);
            jwt.verify(token,'sushant',(err,decoded_data)=>{
                if(!err){
                    if(decoded_data.status=='admin' || decoded_data.email==process.env.SUPERADMIN ){
                        knex
                        .select('*')
                        .from('students')
                        .where('email',req.body.email)
                        .then(data=>{
                            if(data.length<1){
                                knex('students')
                                .insert({
                                    'name':req.body.name,
                                    'email':req.body.email,
                                    'qualification':req.body.qualification,
                                    'DOB':req.body.DOB,
                                    'phone_number':req.body.phone_number,
                                    'date': new Date()
                                })
                                .then(result=>{
                                    res.send('student created')
                                })
                                .catch(err=>{
                                    console.log(err)
                                })
                            }
                            else{
                                res.send('student is already exist')
                            }
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                    }
                    else{
                        res.send(`you are not an admin so you can't insert students data`)
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

    create.put('/createAnAdmin',(req,res)=>{
        if(req.headers.cookie!==undefined || req.headers.cookie!==''){
            let token=(req.headers.cookie).slice(6);
            jwt.verify(token,'sushant',(err,decoded_data)=>{
                if(!err){
                    if(decoded_data.email==process.env.SUPERADMIN){
                        knex('user')
                        .update('status',req.body.status)
                        .where('email',req.body.email)
                        .then(data=>{
                            res.send(`${req.body.email} is now ${req.body.status}`)
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                    }
                    else{
                        res.send('you are not superadmin')
                    }
                }
                else{
                    res.send('login first!!!')
                }
            })
        }
        else{

            res.send('login first!!')
        }
    })
}