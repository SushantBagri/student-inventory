module.exports=(login,knex,jwt)=>{
    //for login of user and admin
    login.post('/login',(req,res)=>{
        let user=req.body;
        knex
        .select('*')
        .from('user')
        .where('email',user.email)
        .then(data=>{
            console.log(data)
            if(data.length>0){
                if(user.password==data[0].password){
                    let token=jwt.sign({'id':data[0].id,'name':data[0].name,'status':data[0].status,'email':data[0].email},'sushant');
                    res.cookie('token',token).send('log in succesfully')
                }
                else{
                    res.send('password is wrong')
                }
            }
            else{
                res.send('sign up first')
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
}