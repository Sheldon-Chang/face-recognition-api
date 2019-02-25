

const handleSignIn=(req,res,db,bcrypt)=>{
	const {email,password}=req.body;
	if(!email||!password){
		return res.status(400).json('incorrect form submission'); //if without return , it would go ahead,
	}
	db.select('email','hash').from('login')
	.where('email','=',email)
	.then(data=>{
		const isValid=bcrypt.compareSync(req.body.password,data[0].hash);
		if(isValid){
			db.select('*').from('users')
			.where('email','=',email)
			.then(user=>{
				res.json(user[0])
			})
			.catch(err=>res.status(400).json('unable to get user'));
		}else{
			res.status(400).json('wrong credentials');
		}
	})
	.catch(err=>res.status(400).json('wrong credentail'));
}

module.exports={
	handleSignIn
}