import mongoose from 'mongoose';
import { app } from './app';
import {config} from 'dotenv'
const start = async () => {
  console.log("Starting up...")
  config();
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY not found')
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI not found')
  }
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("connected to mongodb")
  } catch (err) {
    console.log(err)
  }

  app.listen(3000, () => {
    console.log('listening on port 3000')
  })
}

start();
