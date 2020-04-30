var mongoose = require('mongoose');
var Schema = mongoose.Schema;

productSchema = new Schema({
    productname: String,
    price: String,
    brand: String,
    image: String,
    madein:String,
    description: String,
    feedid: {
        type: Schema.ObjectId,
        ref: 'Feed'
    }
});
Product = mongoose.model('Product', productSchema);

module.exports = Product;