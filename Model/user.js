var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Product = require('./product');

// set up a mongoose model


module.exports = mongoose.model('User', new Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    phoneno: String,
    address: String,
    admin: Boolean,
    image: {
        type: String,
        default: "user.png",
    },
    cart: [{
        type: Schema.Types.ObjectId,
        ref: Product
    }]

}));