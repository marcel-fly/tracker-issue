const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongo = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'

const app = express()

const port = 3001

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
    await issues.insertOne(issue)
    res.sendStatus(201)
  })

  app.put('/issues', async (req, res) => {
    const id = req.body.id
    await issues.updateOne({ id: id }, { $set: req.body })

    res.sendStatus(201)
  })

  app.delete('/issues', async (req, res) => {
    const id = req.body.id
    const issue = await issues.deleteOne({ id })
    res.send(issue).statusCode(201)
  })

  app.listen(port, () =>
    console.log(`Hello world app listening on port ${port}!`),
  )
})
