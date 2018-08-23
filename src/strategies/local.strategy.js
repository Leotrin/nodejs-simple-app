const passport  = require('passport');
const { Strategy }  = require('passport-local');
const { MongoClient, ObjectID } = require('mongodb');

module.exports = function localStrategy(){
	passport.use(new Strategy(
		{
			usernameField:"username",
			passwordField:"password"
		}, (username, password, done) => {

			const url = "mongodb://mangosoft:abcd1234@ds125482.mlab.com:25482/nodejslibrary-app-mangosoft-2018";
			const dbname = "libraryApp";

			try {
				MongoClient.connect(url,{useNewUrlParser:true} , 
					function(err, db) {
				  		if (err) throw err;
					  	const dbo = db.db('libraryApp');
					 	const col = dbo.collection('users');
					  	const findUser = col.findOne({username}, function(err, result) {
					    if (err) throw err;
					    console.log(result);
					    if(result.password==password){
							db.close();
							done(null, result);
					    }else{
							db.close();
							done(null, false);
					    }
					});	
				});
			}catch (err){
				debug(err.stack);
			}
		}
	));
};