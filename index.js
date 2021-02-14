import Joi from 'joi';
import express from 'express';
import { createRequire } from 'module';
import cors from 'cors';
const require = createRequire(import.meta.url);
const { Client } = require('pg');
import pool from './db.js';

const port= process.env.PORT||8081;

//middleware
const app= express();
app.use(express.json());
app.use(cors());

//Retreive all the memes
app.get('/memes', (req,res) => {
    pool.query('SELECT * from meme_dtls',
    function(err,result) {
      if(err) {
        console.log(err);
        res.status(400).send("No Memes to display");
      }else {
      res.status(200).send(result.rows);}
    })   
});

//Retrieve meme with id from DB
app.get('/memes/:id',(req,res) => {
  const id = req.params.id;
  pool.query('SELECT * from meme_dtls where id=$1',[id], function(err,results) {
    if(results.length>0) {res.status(200).send(results.rows);}
    else {
      res.status(404).send("Meme was not found");
    }
  })
});

//Post a meme to DB
app.post('/memes', (req,res) => {
  //Validate if input is acceptable else return status 400
  //const err = validateInput(req.body);
  //if(err) {return res.status(400)}
    //Store the meme
  const meme = {
    username: req.body.username,
    caption:req.body.caption,
    memeUrl:req.body.memeUrl
  };
  pool.query('INSERT INTO meme_dtls(username,caption,url) values($1,$2,$3)',
    [meme.username,meme.caption,meme.memeUrl], function(err,results) {
      if(err) {
        console.log(err);
        res.status(400).send(err);
      }else {
        res.status(201).send(`meme added`);
      }
    })
  });

//Input validation function with Joi package
function validateInput({username,caption,memeUrl}){
  const schema= Joi.object({
    username: Joi.string().min(3).max(15).required(),
    caption: Joi.string().min(3).max(100).required(),
    memeUrl: Joi.string().min(3).max(100).required()
  });
  const {error,value} = schema.validate(username,caption,memeUrl);
  return error;
};

app.listen(port, () => {
  console.log(`Logging to port...${port}`)});