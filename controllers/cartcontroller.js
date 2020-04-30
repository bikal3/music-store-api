var express = require('express');
var router = express.Router();
var Product = require('../Model/product');
var Cart = require('../Model/cart');
var User = require('../Model/user');
var async = require("async");

router.post('/cart', (req, res) => {
    // res.header("allow-file-access-from-files", "*");
    var cart = new Cart();

    cart.productid = req.body.productid;
    cart.userid = req.body.userid;

    console.log(cart);
    cart.save((err, doc) => {
        if (err) {
            res.send({ 'Success': 'Something is wrong' });
        } else {
            res.json('Cart Added');
        }
    });
});

router.post('/cartpost', (req, response, next) => {
    User.findById({ _id: req.body.userId }).exec(function (err, user) {
        if (err) {
            console.log("cart error", err);
        } else {
            Product.findById({ _id: req.body.productId }).exec(function (err, product) {
                user.cart.push(product);
                user.save();
                response.json({
                    success: 'Cart Added Successfully'
                })
            })
        }
    })
})

router.get('/cart-items/:userId', (req, res) => {
    User.findById({ _id: req.params.userId }).populate('cart').exec(function (err, cartItems) {
        if (err) {
            console.log("cart error", err);
        } else {
            var totalPrice = 0;
            cartItems.cart.forEach(cartItem => {
                totalPrice += parseInt(cartItem.price);
            });
            // res.json({ total: totalPrice, cartItems: cartItems });
            res.json(cartItems);
        }
    })
})
router.get('/cart-total/:userId', (req, res) => {
    User.findById({ _id: req.params.userId }).populate('cart').exec(function (err, cartItems) {
        if (err) {
            console.log("cart error", err);
        } else {
            var totalPrice = 0;
            cartItems.cart.forEach(cartItem => {
                totalPrice += parseInt(cartItem.price);
            });
            res.json({ total: totalPrice });
        }
    })
})

router.put('/cart-delete/:userId/:prodId', (req, res) => {
    console.log(req.params.userId) 
    User.findOneAndUpdate({_id:req.params.userId},{"$pull":{"cart":req.params.prodId}}).exec(function(err,resas){
        if(err){
            console.log("not updated")
            res.json({success:"Cart Removed Failed"})
        }else{
            console.log("updated")
            res.json({success:"Cart Updated"})
        }
    })
})
module.exports = router;