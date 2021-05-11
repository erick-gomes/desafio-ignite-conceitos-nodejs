const express = require('express')
const cors = require('cors')
// const { v4: uuidv4 } = require('uuid')

const app = express()

app.use(cors())
app.use(express.json())

// const users = new Set()

/**
 * @param {express.Request<ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>} req Requisição http
 * @param {express.Response<any, Record<string, any>, number>} res Resposta http
 * @param {express.NextFunction} next Função do middleware
 */
function checksExistsUserAccount (req, res, next) {
    // Complete aqui
}

app.post('/users', (req, res) => {
    // Complete aqui
})

app.use(checksExistsUserAccount)

app.get('/todos', (req, res) => {
    // Complete aqui
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
