const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
require('./Database/connection');

const routerusers = require('./controllers/usercontroller');
const routerimage = require('./controllers/imagecontroller');
const routeradmin = require('./controllers/admincontroller')
const routerextra = require('./controllers/extracontroller');
const routecart = require('./controllers/cartcontroller');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("./images"));

// app.use(cors);

app.get("/", function (req, res) {
    res.send("Tone Store API");
})
var corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
};

app.use('/api/users', cors(corsOptions), routerusers);
app.use('/api/admin', cors(corsOptions), routeradmin);
app.use('/api', cors(corsOptions), [routerimage, routerextra, routecart]);

// listen to port for incoming requestss
app.listen(5000);
console.log('Server runs at http://localhost:' + 5000);