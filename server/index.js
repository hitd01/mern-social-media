import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Routes
import authRoute from './routes/AuthRoute.js';

const app = express();

// middleware
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

dotenv.config();

// env variables
const PORT = process.env.PORT;
const DB = process.env.MONGO_DB;

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
    )
    .catch((error) => console.error(`${error} did not connect`));

app.use('/api/auth', authRoute);
