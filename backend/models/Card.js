const { Schema, model } = require('mongoose');
const { isURL } = require('validator');

const owner = { type: Schema.Types.ObjectId, ref: 'User' };

const Card = new Schema({
  name: {
    type: String, minLength: 2, maxLength: 30, required: true,
  },
  link: { type: String, required: true, validate: isURL },
  owner: { ...owner, required: true },
  likes: { type: [owner], default: [] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = model('Card', Card);
