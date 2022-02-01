// dependency
const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost:27017/registrationForm', {
        // useNewParser: true,
        // useUnifideTopology: true,
        // useCreateIndex: true,
    })
    .then(() => {
        console.log('Connection Successfull');
    })
    .catch((e) => {
        console.log(`Database not connected${e}`);
    });
