const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    time: { type: String, unique: true },
    ducks: { type: Number, default: 0 },
    hits: { type: Number, default: 0 },
    kills: { type: Number, default: 0 },
    score: { type: Number, default: 0 },
    owner: { type: Types.ObjectId, ref: 'User' }
});

module.exports = model('Stat', schema);
