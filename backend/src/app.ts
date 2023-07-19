import express from 'express';
import cookieSession from 'cookie-session';
import 'express-async-errors';

import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'

import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import { getProductsRouter } from './routes/get-data';
import cors from 'cors';
const app = express();
app.set('trust proxy', true)
app.use(cors({
  credentials:true,
  origin: 'http://localhost:4200'
}))
app.use(express.json());
app.use(cookieSession({
  signed: false,
  secure: false,
}))

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(getProductsRouter)

app.all("*", async (req, res, next) => {
  throw new NotFoundError()
})
app.use(errorHandler);

export { app }