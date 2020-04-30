
const mongoose = require('mongoose');
var Feed = require('../Model/feed');

mongoose.connect("mongodb://127.0.0.1:27017/ToneStore", { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });

let feed = [
    new Feed({
        feedname: "Electric Guitars",
        feedimage: "Electric_Guitar.png"
    }),
    new Feed({
        feedname: "Acoustic Guitars",
        feedimage: "Acoustic_Guitars.png"
    }),
    new Feed({
        feedname: "Bass Guitars",
        feedimage: "Bass_Guitars.png"
    }),
    new Feed({
        feedname: "Amps",
        feedimage: "Amps.png"
    }),
    new Feed({
        feedname: "Band Oechestra",
        feedimage: "Band_Oechestra.png"
    }),
    new Feed({
        feedname: "DJ and Lighting Gear",
        feedimage: "DJ_Lighting_Gear.png"
    }),
    new Feed({
        feedname: "Drums",
        feedimage: "Drums.png"
    }),
    new Feed({
        feedname: "Folk Instrument",
        feedimage: "Folk.png"
    }),
    new Feed({
        feedname: "Parts",
        feedimage: "Parts.png"
    }),
    new Feed({
        feedname: "Software",
        feedimage: "Software.png"
    }),
    new Feed({
        feedname: "Accessories",
        feedimage: "Accessories.png"
    }),
    new Feed({
        feedname: "Pro Audio",
        feedimage: "Pro_Audio.png"
    }),
    new Feed({
        feedname: "Keyboards and Synths",
        feedimage: "Keyboards_Synths.png"
    }),
    new Feed({
        feedname: "Effects and Pedals",
        feedimage: "Pedal.png"
    }),
];

var seeded = 0;

for (var i = 0; i < feed.length; i++) {
    feed[i].save((error, result) => {
        seeded++;
        if (seeded === feed.length) {
            console.log("Default feed seeded...");
            mongoose.disconnect();
        }
    });
}
