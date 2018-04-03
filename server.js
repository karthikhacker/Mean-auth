const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const chalk = require('chalk');
const morgan = require('morgan');
const passport = require('passport');
const cors = require('cors');
const port = process.env.PORT || 3000;
const app = express();
const config = require('./server/config/db');
const router = require('./server/routes/routes');

//Mongoose connection
mongoose.connect(config.db,(err) => {
  if(err){
  	console.log(chalk.red(err));
  }else{
  	 console.log(chalk.yellow('Mongodb connected!.'));
  }
});

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.static(__dirname +  '/client'));
app.use(passport.initialize());
require('./server/config/passport')(passport);
app.use('/api',router);

//server
app.listen(port,() => {
 console.log(chalk.blue('App running at port' + port));
});