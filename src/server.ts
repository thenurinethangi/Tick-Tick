import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose';
import authRouter from './routes/authRoute'
import taskRouter from './routes/taskRoute'
import noteRouter from './routes/noteRoute'
import { authentication } from './middlewares/authentication';
import cookieParser from 'cookie-parser';
dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET","POST","PUT","DELETE"],
}));

app.use(express.json());

app.use(cookieParser());

app.use('/api/v1/auth/',authRouter);
app.use('/api/v1/task/',taskRouter);
app.use('/api/v1/note/',noteRouter);

mongoose.connect('mongodb://localhost:27017/ticktick')
    .then(() => {
        console.log('Connect to the database ticktick!');
    })
    .catch((err) => {
        console.log('Unable to connect to the database.');
        process.exit(1);
    })

app.listen(PORT,() => {
    console.log('Server star at port 5000!');
});