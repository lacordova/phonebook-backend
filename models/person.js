const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const personSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true, minLength: 3 },
  number: { type: String, require: true, minLength: 8 }
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