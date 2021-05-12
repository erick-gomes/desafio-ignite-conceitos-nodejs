const express = require('express')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')

const app = express()

app.use(cors())
app.use(express.json())

const users = []

/**
 * @param {express.Request<ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>} req Requisição http
 * @param {express.Response<any, Record<string, any>, number>} res Resposta http
 * @param {express.NextFunction} next Função do middleware
 */
function checksExistsUserAccount (req, res, next) {
    const { username } = req.headers
    const user = users.find(user => user.username === username)
    if (!user) return res.status(404).json({ error: 'User does not exist' })
    req.user = user
    next()
}

app.post('/users', (req, res) => {
    const { name, username } = req.body
    const usernameExist = users.find(user => user.username === username)
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
    users.push(user)
    res.status(201).json(user)
})

app.use(checksExistsUserAccount)

app.get('/todos', (req, res) => {
    const { todos } = req.user
    res.status(200).json(todos)
})

app.post('/todos', (req, res) => {
    const { title, deadline } = req.body
    const { todos } = req.user

    if (!title || !deadline) {
        return res.status(404).json({ error: 'Title or deadline not found' })
    }
    const todo = {
        id: uuidv4(),
        title,
        done: false,
        deadline: new Date(deadline),
        created_at: new Date()
    }

    todos.push(todo)
    res.status(201).json(todo)
})

app.put('/todos/:id', (req, res) => {
    const { title, deadline } = req.body
    const { id } = req.params
    const { todos } = req.user

    if (!title || !deadline) return res.status(404).json({ error: 'Title or deadline not found' })
    const todo = todos.find(todo => todo.id === id)
    if (!todo) return res.status(404).json({ error: 'Todo does not exist' })
    todo.title = title
    todo.deadline = new Date(deadline)
    res.status(200).json(todo)
})

app.patch('/todos/:id/done', (req, res) => {
    const { id } = req.params
    const { todos } = req.user

    const todo = todos.find(todo => todo.id === id)
    if (!todo) return res.status(404).json({ error: 'Todo does not exist' })
    todo.done = !todo.done
    res.status(200).json(todo)
})

app.delete('/todos/:id', (req, res) => {
    // Complete aqui
})

module.exports = app
