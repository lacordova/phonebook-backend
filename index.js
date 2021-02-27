require('dotenv').config()
const express = require('express')
const getDate = require('./lib/getDate')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


const handleGetPersons = (req,res,next)=>{
    Person.find({})
        .then(persons => {
          res.json(persons)
        })
        .catch(err=>next(err))
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
    const getInfo = (err, count)=> {
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
        .then(()=> {
            res.status(204).end()
        })
        .catch(err=>next(err))

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

    Person.findByIdAndUpdate(id, updatedPerson, {new:true})
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(err => next(err))
}

morgan.token('body',function (req,res) {return JSON.stringify(req.body)})

app.get('/api/persons',handleGetPersons)
app.get('/info',handleInfo)
app.get("/api/persons/:id", handleGetNoteId)
app.delete('/api/persons/:id',handleDeletePerson)
app.post('/api/persons' ,handlePostPerson)
app.put('/api/persons/:id',handleUpdatePerson)

const errorHandler = (err, req, res, next) => {
    console.log(err.message)
    if (err.name === 'CastError') {
        return res.status(400).send({error:"malformatted id"})
    } else if (err.name === 'ValidationError') {
        return res.status(400).send({error: err.message})
    }
    next(err)
}

app.use(errorHandler)

const PORT  = process.env.PORT || 3002
app.listen(PORT, () => console.log(`server running on port ${PORT}`))