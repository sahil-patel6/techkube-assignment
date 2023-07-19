import express, { Request, Response } from "express";
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";
const router = express.Router();

router.post("/api/users/signup",
  [
    body('username').isLength({ min: 3 }).withMessage("username must have atleast 3 characters"),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be in range 4 and 20 characters')
  ],
  validateRequest,
  async (req: Request, res: Response) => {

    const { username, password } = req.body;

    const existingUser = await User.findOne({ username })
    if (existingUser) {
      throw new BadRequestError('username in use');
    }
    const user = User.build({ username, password })
    await user.save();

    const userJwt = jwt.sign(
      {
        id: user.id,
        username: user.username
      },
      process.env.JWT_KEY!
    )
    req.session = {
      jwt: userJwt
    }
    res.status(201).json(user)
  }
)

export {
  router as signupRouter
}