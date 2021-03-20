const personsRouter = require('express').Router()
const Person = require('../models/person')
const getDate = require('../utils/getDate')

const handleGetPersons = async (req,res,next) => {
  const personsFinded = await Person.find({})
  res.json(personsFinded)
    .catch(err => next(err))
}

const handleGetNoteId = (req,res, next) => {
  const id = req.params.id
  Person.findById(id)
    .then(person => {
      res.json(person)
    })
    .catch(err => next(err))
}

const handleInfo = (req, res) => {
  const getInfo = (err, count) => {
    const date = getDate()
    const templateStr = `
          <p>
              Phonebook has info for ${String(count)} people <br> <br>
              ${date}
          </p>
          `
    res.send(templateStr)
  }
  Person.countDocuments({}, getInfo)
}

const handleDeletePerson = (req, res,next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end()
    })
    .catch(err => next(err))

}

const handlePostPerson = (req,res, next) => {
  const body = req.body

  //     return res.status(400).json({ error: 'name must be unique' })}

  const newPerson = new Person({

    name: body.name,
    number: body.number,
  })
  newPerson.save()
    .then(person => {
      res.json(person)
    })
    .catch(err => next(err))
}

const handleUpdatePerson = (req, res, next) => {
  const id = req.params.id
  const body = req.body
  const updatedPerson = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(id, updatedPerson, { new:true })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(err => next(err))
}

personsRouter.get('/',handleGetPersons)
personsRouter.get('/info',handleInfo)
personsRouter.get('/:id', handleGetNoteId)
personsRouter.delete('/:id',handleDeletePerson)
personsRouter.post('/' ,handlePostPerson)
personsRouter.put('/:id',handleUpdatePerson)

module.exports = personsRouter