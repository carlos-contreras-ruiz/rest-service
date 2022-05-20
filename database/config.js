const mongoose = require('mongoose')

//the url with srv mongodb+srv://username:example@localhost/mydb
//Only works with hostname and domain name
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            //useUnifiedTopology: true,
            //useCreateIndex: true,
            //useFindAndModify: false,
        })
        console.log('Base de datos corriendo')
    } catch (error) {
        console.log(error)
        throw new Error('Error en base de datos')
    }
}

module.exports = {
    dbConnection,
}
