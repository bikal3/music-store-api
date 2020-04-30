var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const User = require('./user')
const Product = require('./product')

cartSchema = new Schema({

    userid: {
        type: Schema.Types.ObjectId,
        ref: User
    },
    productid: {
        type: Schema.Types.ObjectId,
        ref: Product
    }
});
Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;