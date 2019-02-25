const handleProfileGet=(req,res,db)=>{
	const{id}=req.params;
	db.select('*').from('users').where({id})
		.then(user=>{
			if(user.length){
				res.json(user[0])
			}else{
				res.status(400).json('No such users')
			}
	})
	.catch(err=>res.status(400).json('No such users'));  //here is response [] , so catch is not working
	
}

module.exports={
	handleProfileGet
}