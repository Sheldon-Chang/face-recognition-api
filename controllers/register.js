

const handleRegister=(req,res,db,bcrypt)=>{
	const {email,name,password}=req.body;
	if(!email||!name||!password){
		return res.status(400).json('incorrect form submission'); //if without return , it would go ahead,
	}
	const hash = bcrypt.hashSync(password);
	db.transaction(trx=>{        //trx ensure to these are both part of transaction
		trx.insert({
			hash:hash,
			email:email
		})
		.into('login')
		.returning('email')
		.then(loginEmail=>{
			return trx('users')
					.returning('*')
					.insert({
						email:loginEmail[0],
						name:name,
						joined:new Date()
					})
					.then(response=>{
							res.json(response[0])
					})
		})						//tricky part , must remember here
		.then(trx.commit)       //without commit we can't say we all these pass commit send this transaction through
		.catch(trx.rollback)    //
	})
	.catch(err=>res.status(400).json('unable to join'));
	
}

module.exports={
	handleRegister
}