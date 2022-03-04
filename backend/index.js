const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongo = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'

const app = express()

const port = 3001

// let issues = [
//   { title: 'task1', description: 'description', id: 1, status: 'open' },
//   { title: 'task2', description: 'description', id: 2, status: 'open' },
//   { title: 'task3', description: 'description', id: 3, status: 'open' },
//   { title: 'task4', description: 'description', id: 4, status: 'pending' },
//   { title: 'task5', description: 'description', id: 5, status: 'closed' },
// ]

mongo.connect(url).then((client) => {
  const db = client.db('app')
  const issues = db.collection('iusses')

  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.get('/issues', async (req, res) => {
    res.json(await issues.find().toArray())
  })

  app.post('/issues', async (req, res) => {
    const issue = req.body
    // issues.push(issue)
    await issues.insertOne(issue)
    res.sendStatus(200) // TODO: What to return after update in rest
  })

  app.put('/issues', async (req, res) => {
    const id = req.body.id
    // const index = issues.findIndex((issue) => issue.id === id)
    // issues[index] = req.body
    await issues.updateOne({ id: id }, { $set: req.body })

    res.sendStatus(200) // TODO: What to return after update in rest
  })

  app.delete('/issues', async (req, res) => {
    const id = req.body.id
    const issue = await issues.deleteOne({ id })
    // const index = issues.findIndex((issue) => issue.id === id)

    // const [issue] = issues.splice(index, 1)

    res.send(issue).statusCode(200) // TODO: What to return after update in rest
  })

  app.listen(port, () =>
    console.log(`Hello world app listening on port ${port}!`),
  )
})
