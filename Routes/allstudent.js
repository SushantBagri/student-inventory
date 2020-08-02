module.exports=(allstudent,knex,jwt)=>{
    allstudent.get('/',(req,res)=>{
        if(req.headers.cookie!==undefined || req.headers.cookie!==''){
            let token=(req.headers.cookie).slice(6)
            jwt.verify(token,'sushant',(err,decoded_data)=>{
                if(!err){
                    knex
                    .select('*')
                    .from('students')
                    .then(data=>{
                        res.send(data)
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                }
                else{
                    res.send('go login first!!!')
                }
            })
        }
        else{
            res.send('go login first!!!')
        }
    })
    allstudent.get('/student/:id',(req,res)=>{
        if(req.headers.cookie!==undefined || req.headers.cookie!==''){
            let token=(req.headers.cookie).slice(6)
            jwt.verify(token,'sushant',(err,decoded_data)=>{
                if(!err){
                    knex
                    .select('*')
                    .from('students')
                    .where('id',req.params.id)
                    .then(data=>{
                        res.send(data)
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                }
                else{
                    res.send('go login first!!!')
                }
            })
        }
        else{
            res.send('go login first!!!')
        }
    })
}