const express = require('express')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')

const app = express()

app.use(cors())
app.use(express.json())

const users = new Set()

/**
 * @param {express.Request<ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>} req Requisição http
 * @param {express.Response<any, Record<string, any>, number>} res Resposta http
 * @param {express.NextFunction} next Função do middleware
 */
function checksExistsUserAccount (req, res, next) {
    const { username } = req.headers
    const userArr = Array.from(users)
    const user = userArr.find(user => user.username === username)
    if (!user) return res.status(404).json({ error: 'User does not exist' })
    req.user = user
    next()
}

app.post('/users', (req, res) => {
    const { name, username } = req.body
    const userArr = Array.from(users)
    const usernameExist = userArr.find(user => user.username === username)
    if (usernameExist) {
        return res.status(400).json({ error: 'Username already in use' })
    }
    if (!name || !username) return res.status(404).json({ error: 'Name or username not found' })
    const user = {
        id: uuidv4(),
        name,
        username,
        todos: []
    }
    users.add(user)
    res.status(201).json(user)
})

app.use(checksExistsUserAccount)

app.get('/todos', (req, res) => {
    const { todos } = req.user
    res.status(200).json(todos)
})

app.post('/todos', (req, res) => {
    // Complete aqui
})

app.put('/todos/:id', (req, res) => {
    // Complete aqui
})

app.patch('/todos/:id/done', (req, res) => {
    // Complete aqui
})

app.delete('/todos/:id', (req, res) => {
    // Complete aqui
})

module.exports = app
