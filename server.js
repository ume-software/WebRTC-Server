const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
//load env
require('dotenv').config();
const PORT = process.env.PORT || process.env.API_PORT;
const MONGO_URI = process.env.MONGO_URI

// config app
const app = express();
app.use(express.json());
app.use(cors());
// register routes
app.use("/api/auth", authRoutes);
const server = http.createServer(app);
mongoose.connect(MONGO_URI).then(
    () => {
        console.log('Connect Mongodb success')
        server.listen(PORT, () => {
            console.log(`Server is listening on http://localhost:${PORT}`)
        });
    }
).catch(err => {
    console.log('Mongodb connection failed. Server not started')
    console.log(err);
})