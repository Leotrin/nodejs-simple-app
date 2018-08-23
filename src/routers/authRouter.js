const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')("app:authRouter");
const authRouter = express.Router();
const passport  = require('passport');
function router(nav1, nav2){

	let nav = nav1;
	authRouter.route('/signUp').all((req,res,next)=>{
		if(req.user){
			res.redirect('/auth/profile');
		}else{
			nav = nav1;
			next();
		}
	}).post((req, res)=>{
		const {username, password} = req.body;
		const url = "mongodb://mangosoft:abcd1234@ds125482.mlab.com:25482/nodejslibrary-app-mangosoft-2018";
		const dbname = "nodejslibrary-app-mangosoft-2018";

			let client;
			try {
				MongoClient.connect(url,{useNewUrlParser:true} , 
					function(err, db) {
				  		if (err) throw err;
					  	const dbo = db.db('nodejslibrary-app-mangosoft-2018');
					 	const col = dbo.collection('users');
					  	const findUser = col.findOne({username}, function(err, result) {
					    if (err) throw err;
					    if(result==null){
							const user = {username, password};
							const results = col.insertOne(user);
							req.login(user, ()=>{
								db.close();
								res.redirect('/auth/profile');
							});
					    }else if(result.password==password){
					    	db.close();
							res.redirect('/auth/profile');
					    }else{
					    	db.close();
					    	res.redirect('/auth/signin');
					    }
					});	
				});
			}catch (err){
				debug(err.stack);
			}
	});

	authRouter.route('/signin')
		.all((req,res,next)=>{
			if(req.user && req.user!=null){
				nav = nav2;
				res.redirect('/auth/profile');
			}else{
				nav = nav1;
				next();
			}
		})
		.get((req, res)=>{
			res.render('signin',{nav, title:"Sign In"});
		})
		.post(passport.authenticate('local',{
			successRedirect:'/auth/profile',
			failureRedirect:'/'
		}));

	authRouter.route('/profile').all((req,res,next)=>{
		if(req.user && req.user!=null){
			nav = nav2;
			next();
		}else{
			nav = nav1;
			res.redirect('/auth/signin');
		}
	}).get((req, res)=>{
	  	res.render(
		  	'profile', 
		  	{
		  		nav,
		  		user:req.user,
		  		title:"Leotrin"
		  	}
	  	);
	});
	authRouter.route('/logout').all((req,res,next)=>{
		if(req.user && req.user!=null){
			next();
		}else{
			res.redirect('/auth/signin');
		}
	}).get((req, res)=>{
		req.logout();
		res.redirect('/auth/profile');
	});
	return authRouter;
}

module.exports = router;