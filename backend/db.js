const mongoose = require('mongoose');


const client = null

const connectMongoDB = () => {
   mongoose.connect('mongodb+srv://OnionGL:V12ad34dim56@cordon.wef2kdn.mongodb.net/?retryWrites=true&w=majority')
        .then(_ => console.log('MongoDB success connection!'))
        .catch((error) => console.log(`MongoDB lose connection with error: ${error}`))
}


module.exports = connectMongoDB;