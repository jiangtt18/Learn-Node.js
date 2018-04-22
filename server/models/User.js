const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const {Schema} = mongoose;

const userSchema = new Schema({
  googleId: String // console log google id, it is i a String
});

mongoose.model('users', userSchema);// create a new collection of User
// mongo will not overwrite user if user already exits.
// two arguemtns = load things into mongo;
