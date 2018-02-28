const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const presentationSchema = new Schema({
  name: {type: String, required: true},
  document: {type: String, required: true},
  user_id: Schema.Types.ObjectId
});
const Presentation = mongoose.model('Presentation', presentationSchema);

module.exports = Presentation;
