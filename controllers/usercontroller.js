var User = require('../Model/user'); //path for user.js in the model
const bodyParser = require('body-parser');
const express = require("express");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var app = express();
app.use(express.json());
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));


router.post('/login', function (req, res) {
    var response = res;
    console.log(req.body);
    User.findOne({
        email: req.body.email
    }, function (err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: "false", message: 'Authentication failed. User not found.' });
        } else if (user) {

            bcrypt.compare(req.body.password, user.password, function (err, res) {
                if (res) {
                    var payload = {
                        admin: user.admin
                    }
                    var token = jwt.sign(payload, "secretmessage", {
                        expiresIn: 86400 // expires in 24 hours
                    });

                    response.json({
                        success: 'Success!',
                        token: token,
                        user: user,
                        admin: user.admin
                    });
                    console.log(user.admin);

                } else {
                    response.json({ success: 'false', message: "Username or password is incorrect" });
                }
            });


        }

    });
});
router.post('/registration', function (req, res, next) {
    console.log(req.body);
    var personInfo = req.body;
    // find the email if the email in table
    User.findOne({ email: personInfo.email }, function (err, data) {

        // if the email is not already taken
        if (!data) {
            var c;
            // find the last user and take unique_id from that to variable c for new user
            User.findOne({}, function (err, data) {

                var hashpassword = bcrypt.hashSync(personInfo.password, 10);
                //Initialize the user Model object with variable or value from the post form
                var newPerson = new User({
                    firstname: personInfo.firstname,
                    lastname: personInfo.lastname,
                    email: personInfo.email,
                    password: hashpassword,
                    admin: false,
                    phoneno: "Update your Phone Number",
                    address: "Update your Address"
                });

                // Save it to table User
                newPerson.save(function (err, Person) {
                    if (err)
                        console.log(err);
                    else
                        console.log('Success');
                });
            }).sort({ _id: -1 }).limit(1);
            res.json({ success: "You are regestered,You can login now." }); // send response to ajax call to view
        } else {
            res.json({ success: "Email is already used." }); // send response to ajax call to view
        }

    });
});

router.use(function (req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, "secretmessage", function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }

});
router.post('/profile', (req, res) => {
    User.findById({
        _id: req.body._id
    }, function (err, user) {
        if (err) {
            res.json({ 'success': 'Post Failed Something is wrong. Log in first!!1' });
        } else if (!user) {
            res.json('User not found ');
        } else if (user) {
            res.json({ user: user });
        }
    });
});
router.put('/userupdate', (req, res) => {
    console.log(req.body);
    User.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) {

            res.json({ 'success': 'Profile Updated Successfully!!' });
        } else {
            console.log('Error during record update : ' + err);
            res.json("Error on Update");
        }
    });
});

module.exports = router;