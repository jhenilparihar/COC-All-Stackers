const mongoose = require('mongoose')

const pancards = mongoose.model('pancards',{
    panid:{
        type: String
    },
    mobile: {
        type: String
    },
    email:{
        type: String
    },
    otp:{
    type:String
    }
});

module.exports = pancards