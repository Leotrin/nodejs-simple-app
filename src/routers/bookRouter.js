const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')("app:bookRouter");
const bookRouter = express.Router();

function router(nav1, nav2){
	let nav = nav1;
	bookRouter.route('/').all((req,res,next)=>{
		if(req.user && req.user!=null){
			nav = nav2;
		}
		next();
	}).get((req,res)=>{

			const url = "mongodb://localhost:27017";
			const dbname = "libraryApp";

			(async function mongo(){
				let client;
				try {
					client = await MongoClient.connect(url);
					debug('Connected to the server.');

					const db  = client.db(dbname);

					const col = await db.collection("books");
					const books = await col.find().toArray();
					//res.json(response);
						res.render(
						  	'books', 
						  	{
						  		nav,
						  		title:"Leotrin",
						  		books
						  	}
					  	);
				}catch (err){
					debug(err.stack);
				}
				client.close();
			}());
	  
	});
	bookRouter.route('/:id').all((req,res,next)=>{
		if(req.user && req.user!=null){
			nav = nav2;
		}
		next();
	}).get((req,res)=>{
			const {id} = req.params;
			const url = "mongodb://localhost:27017";
			const dbname = "libraryApp";

			(async function mongo(){
				let client;
				try {
					client = await MongoClient.connect(url);
					debug('Connected to the server.');

					const db  = client.db(dbname);

					const col = await db.collection("books");
					const book = await col.findOne({_id: new ObjectID(id)});
						res.render(
						  	'bookView', 
						  	{
						  		nav,
						  		title:"Leotrin",
						  		book
						  	}
					  	);
				}catch (err){
					debug(err.stack);
				}
				client.close();
			}());
	  
	});
	return bookRouter;
}
module.exports = router;

