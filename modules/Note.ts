// @ts-ignore
const { Schema, model, Types } = require('mongoose');

// @ts-ignore
const schema = new Schema({
  text: { type: String, required: true, unique: true },
  header: { type: String, required: true },
  date: [{ type: Date, default: Date.now }],
  owner: [{ type: Types.ObjectId, ref: 'User' }]
});
module.exports = model('Note', schema);
