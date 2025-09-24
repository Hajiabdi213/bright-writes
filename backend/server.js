import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js'
import adminrouter from './routes/adminRoute.js'
import blogRouter from './routes/blogRoutes.js'

const app = express();

// Connect DB
await connectDB()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.get('/', (req, res) => res.send("API is working"))
app.use('/api/admin', adminrouter)
app.use('/api/blogs', blogRouter)

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('✅ Server is running on port ' + PORT)
})
