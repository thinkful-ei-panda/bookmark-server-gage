require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const BookmarkRouter = require('./bookmarks/bookmark-router');
const { NODE_ENV } = require('./config');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common' ;

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());


app.use( '/bookmarks', BookmarkRouter);

app.get( '/', (req,res) => {
//   throw new Error('Error makes computer fans go brrrr');
  res.status(200).send('OwO wi mwaking gwod pwa gwas!');
});

app.use(function errorHandler(error, req , res , next){/*eslint-disable-line*/
  let response;
  if ( NODE_ENV === 'production'){
    response = { error : {message : 'server error' } };
  }else{
    console.error(error);/*eslint-disable-line*/
    response = { message : error.message, error };
  }
  res.status(500).json(response).send();
});


module.exports = app;