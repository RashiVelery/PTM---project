require('dotenv').config();
// require express ---
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');


connectDB()

app.use(express.json());
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.use(cookieParser());



app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);


const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}`)
})
