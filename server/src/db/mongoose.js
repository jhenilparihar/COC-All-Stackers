const mongoose = require('mongoose')

const conn = mongoose.connect('mongodb+srv://admin:root@cluster0.pohm9.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})