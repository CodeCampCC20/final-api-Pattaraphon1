import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import doctorRouter from './routes/doctor.route.js'
import error from './utils/error.js';
import notfound from './utils/notfound.js';

const app = express();

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use("/auth",authRouter);
app.use("/users",userRouter);
app.use("/doctors",doctorRouter);


app.use(error);
app.use(notfound);

const PORT = 3005;

app.listen(PORT,() => console.log(`Server is running on port ${PORT}`));