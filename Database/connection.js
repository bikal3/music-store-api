const moongoose = require('mongoose');

moongoose.connect('mongodb://127.0.0.1:27017/ToneStore', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})