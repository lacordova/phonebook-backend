const express = require('express')
const getDate = require('./lib/getDate')
const generateId = require('./lib/generateId')
const morgan = require('morgan')
const cors = require('cors')


const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let phonebook = [
    {
        id:1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id:2,
        name:"Ada Lovelace",
        number: "12-43-234345"
    },
    {
        id: 3, 
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4, 
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }

]

const handleGetPersons = (req,res)=>{
    res.json(phonebook)
}

const handleGetNoteId = (req,res) => {
    const id = Number(req.params.id)
    const person = phonebook.find(person => person.id === id)
    person
        ? res.json(person)
        : res.status(404).end()


}

const handleInfo = (req, res) => {
    const date = getDate()
    const len = phonebook.length
    const templateStr = `
    <p>
        Phonebook has info for ${String(len)} people <br> <br>
        ${date}
    </p>
    `
    res.send(templateStr)
}

const handleDeletePerson = (req, res) => {
    const id = Number(req.params.id)
    phonebook = phonebook.filter(person => person.id !== id)
    res.status(204).end()

}

const handlePostPerson = (req,res) => {
    const body = req.body
    const nameUnique = phonebook.every(person => person.name !== body.name)

    if (!body.name) {
        return res.status(400).json({error:"missing name"})
    }  
    if (!body.number) {
        return res.status(400).json({error:"missing number"})
    }

    if (!nameUnique) {
        return res.status(400).json({ error: 'name must be unique' })}

    
    const newPerson = {}
    newPerson.id = generateId(phonebook)
    newPerson.name = body.name
    newPerson.number = body.number
    
    phonebook = phonebook.concat(newPerson)
    res.json(newPerson)

    
}

morgan.token('body',function (req,res) {return JSON.stringify(req.body)})

app.get('/api/persons',handleGetPersons)
app.get('/info',handleInfo)
app.get("/api/persons/:id", handleGetNoteId)
app.delete('/api/persons/:id',handleDeletePerson)
app.post('/api/persons' ,handlePostPerson)

const PORT  = process.env.PORT || 3002
app.listen(PORT, () => console.log(`server running on port ${PORT}`))