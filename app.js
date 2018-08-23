const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const passport  = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session')

const app = express();

const port = process.env.PORT || 3000;

//const conn = require('./src/models/conn');

const nav1 = [
		  		{link:'/',title:"Home"},
		  		{link:'/books',title:"Books"},
		  		{link:'/auth/signin',title:"Sign In"},
			];
const nav2 = [
		{link:'/',title:"Home"},
		{link:'/books',title:"Books"},
		{link:'/auth/profile',title:"Profile"},
];


app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({secret:"library"}));

require('./src/config/passport')(app);
app.use(express.static(path.join(__dirname, '/public')));

app.set('views','./src/views')
app.set('view engine','ejs')

const bookRouter = require('./src/routers/bookRouter')(nav1, nav2);
app.use('/books',bookRouter);

const adminRouter = require('./src/routers/adminRouter')(nav1, nav2);
app.use('/admin',adminRouter);

const authRouter = require('./src/routers/authRouter')(nav1, nav2);
app.use('/auth',authRouter);

let nav = nav1;
app.get('/', (req, res) => {

	if(req.user && req.user!=null){
		nav = nav2;
	}else{
		nav = nav1;
	}
  	res.render(
	  	'index', 
	  	{
	  		nav,
	  		title:"Leotrin"
	  	}
  	)
});

app.listen(port, () => {
  console.log(`ok started ! ${chalk.green(port)}`);
});
