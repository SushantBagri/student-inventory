module.exports=(signup,knex)=>{
    signup.post('/signup',(req,res)=>{
        let user=req.body;
        knex.select('*')
        .from('user')
        .where('email',user.email)
        .then(data=>{
            if(data.length<1){
                knex('user')
                .insert({
                    'name':user.name,
                    'email':user.email,
                    'password':user.password
                })
                .then(result=>{
                    console.log('signup successfully....')
                    res.send('signup successfully....')
                })
                .catch(err=>{
                    console.log(err)
                })
            }
            else{
                res.send('user is login already use another email')
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
}