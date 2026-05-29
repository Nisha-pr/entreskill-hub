const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const resourceRoutes = require('./routes/resourceRoutes')
const adminRoutes = require('./routes/adminRoutes')
const progressRoutes = require('./routes/progressRoutes')
const mentorRoutes = require('./routes/mentorRoutes')

dotenv.config()
connectDB()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'EntreSkill Hub API is running!' })
})

app.use('/api/auth', authRoutes)
app.use('/api/resources', resourceRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/progress', progressRoutes)
app.use('/api/mentors', mentorRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})