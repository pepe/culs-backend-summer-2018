const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema =
      new Schema({
        login: {type: String, required: true, minlength: 4},
        password: {type: String, required: true},
        name: {type: String, required: true},
        email: {type: String, required: true}
      });
const User = mongoose.model('User', userSchema);

module.exports = User;
