const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()

const applyMiddleware = require('./middleware')
const authrouter = require('./routes/auth')
const userrouter = require('./routes/user')
const programrouter = require('./routes/program')
const newsrouter = require('./routes/news')
const eventrouter = require('./routes/event')

require('dotenv').config()
const PORT = process.env.PORT || 3000


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

app.use((req, res, next) => {
    const allowedOrigins = [
        'https://astounding-yeot-b597c1.netlify.app', 'http://localhost:3000', 'http://localhost:5173'
    ];
    const origin = req.headers.origin;


    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);

        if (origin === 'https://astounding-yeot-b597c1.netlify.app' || 'http://localhost:3000' || 'http://localhost:5173') {
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        }

        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    }

    next();
});

applyMiddleware(app)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use("/api/v1/auth", authrouter)
app.use("/api/v1/user", userrouter)
app.use("/api/v1/program", programrouter)
app.use("/api/v1/news", newsrouter)
app.use("/api/v1/event", eventrouter)

const server =
    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log("listening for requests");
        })
    })
module.exports = server

