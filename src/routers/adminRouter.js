const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')("app:adminRouter");
const adminRouter = express.Router();

function router(nav, nav2){
	const books = [
		{
			title:"Fully Responsive Design",
			description:"When you use a theme created by Start Bootstrap, you know that the theme will look great on any device, whether it's a phone, tablet, or desktop the page will behave responsively!",
			author:"Mangosoft",
			img:"img/bg-showcase-1.jpg"
		},
		{
			title:"Updated For Bootstrap 4",
			description:"Newly improved, and full of great utility classes, Bootstrap 4 is leading the way in mobile responsive web development! All of the themes on Start Bootstrap are now using Bootstrap 4!",
			author:"Mangosoft",
			img:"img/bg-showcase-2.jpg"
		},
		{
			title:"Easy to Use &amp; Customize",
			description:"Landing Page is just HTML and CSS with a splash of SCSS for users who demand some deeper customization options. Out of the box, just add your content and images, and your new landing page will be ready to go!",
			author:"Mangosoft",
			img:"img/bg-showcase-3.jpg"
		}
	];
	adminRouter.route('/')
		.get((req, res) => {
			const url = "mongodb://localhost:27017";
			const dbname = "libraryApp";

			(async function mongo(){
				let client;
				try {
					client = await MongoClient.connect(url);
					debug('Connected to the server.');

					const db  = client.db(dbname);

					const response = await db.collection("books").insertMany(books);
					res.json(response);
				}catch (err){
					debug(err.stack);
				}
				client.close();
			}());
		});
	return adminRouter;
}

module.exports = router;