const express = require('express');
const BookmarkRouter = express.Router();
const BookmarkService = require('./bookmark-service');

BookmarkRouter
  .route('/')
  .get((req,res,next) =>{
    const nxA = req.app.get('db');
    BookmarkService.getAllItems(nxA)
      .then(mark => {
        res.json(mark);
      })
      .catch(next);
  });
//   .post((req,res,next)=>{

//   })
BookmarkRouter
  .route('/:id')
  .get((req,res,next) => {
    const nxA = req.app.get('db');
    BookmarkService.getById(nxA, req.params.id)
      .then(mark => {
        if(!mark){
          return res.status(404).json({error :{message : 'sorry i don\'t think we have that one'}});
        }
        res.json(mark);
      })
      .catch(next);
  });

//   .patch( (req,res,next)=>{

//   })
//   .delete((req,res,next) => {

//   });


module.exports = BookmarkRouter; 