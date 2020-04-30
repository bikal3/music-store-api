var mongoose = require('mongoose');
var Schema = mongoose.Schema;

feedSchema = new Schema({

    feedname: String,
    feedimage: String
});
Feed = mongoose.model('Feed', feedSchema);

module.exports = Feed;