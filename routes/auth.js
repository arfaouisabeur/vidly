
const {User, validate} = require('../models/user');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config=require('config')
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let user=await User.findOne({email:req.body.email});
    if (!user) return res.status(400).send("invalid pas wala email");

    const validpasword= await bcrypt.compare(req.body.password,user.password)
    if (!validpasword) return res.status(400).send("pasword ghalett");


    const token=user.generateAuthToken();
  

    res.send(token)


});

function validateUser(req) {
    const schema = {
      email: Joi.string().min(3).required().email(),
      password: Joi.string().min(3).required()
    };
  
    return Joi.validate(req, schema);
  }
  

module.exports = router;