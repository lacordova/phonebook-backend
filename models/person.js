require('dotenv').config()
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI
console.log(`conecting to ${url}`)
mongoose.connect(url, {useCreateIndex:true, useFindAndModify:false, useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => {
        console.log('conected to MongoDB')
    })
    .catch(error => {
        console.log(`error conecting to MongoDB ${error.message}`)
    })

const personSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true, minLength: 3 },
    number: {type: String, require: true, minLength: 8}
})

personSchema.set('toJSON',{
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

personSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Person',personSchema)