const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// Temporary in-memory data (replace with DB later)
let jobs = [
  { id: 1, title: 'Frontend Developer', company: 'Acme Co', location: 'Remote' },
  { id: 2, title: 'Node.js Backend Dev', company: 'Tech Ltd', location: 'Delhi' },
]

// List all jobs
app.get('/', (req, res) => {
  res.render('index', { jobs })
})

// Single job
app.get('/jobs/:id', (req, res) => {
  const job = jobs.find(j => j.id === parseInt(req.params.id))
  res.render('job', { job })
})

// Show post form
app.get('/new', (req, res) => {
  res.render('new')
})

// Handle form submit
app.post('/jobs', (req, res) => {
  const newJob = {
    id: jobs.length + 1,
    title: req.body.title,
    company: req.body.company,
    location: req.body.location
  }
  jobs.push(newJob)
  res.redirect('/')
})

app.listen(3000, () => console.log('Running on http://localhost:3000'))