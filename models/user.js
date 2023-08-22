const Joi = require('joi');
const { unique } = require('joi/lib/types/array');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config=require('config');
const boolean = require('joi/lib/types/boolean');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 150,
      unique:true
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1025
    },
    isAdmin: {
      type: Boolean
    }
});

userSchema.methods.generateAuthToken= function(){
  const token=jwt.sign({ _id : this._id,isAdmin: this.isAdmin }, config.get('jwtPrivteKey'))
  return token
};

const User = mongoose.model('User',userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).required(),
    email: Joi.string().min(3).required().email(),
    password: Joi.string().min(3).required(),
    isAdmin:Joi.boolean()
  };

  return Joi.validate(user, schema);
}


exports.User = User; 
exports.validate = validateUser;