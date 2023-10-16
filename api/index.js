import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() =>
    console.log("Connected to database")
).catch((err) => console.log(err));

const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend domain
    methods: 'GET,POST', // Specify the allowed HTTP methods
    credentials: true, // Allow credentials (e.g., cookies, HTTP authentication)
    optionsSuccessStatus: 200 // Some legacy browsers (IE) choke on 204
};

const app = express();
app.use(express.json());

// Use cors middleware with the specified options
app.use(cors(corsOptions));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});
