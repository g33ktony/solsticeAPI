const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
  token: String
});

const Blacklist = mongoose.model('Blacklist', blacklistSchema);

module.exports = Blacklist;
