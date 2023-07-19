import express, { Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import jwt from 'jsonwebtoken';
import { Password } from "../util/password";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

router.post("/api/users/signin",
  [
    body('username').isLength({min:3}).withMessage("Username must have atleast 3 characters"),
    body('password').trim().notEmpty().withMessage('Password cannot be empty')
  ],
  validateRequest,
  async (req: Request, res: Response) => {

    const { username, password } = req.body;

    const existingUser = await User.findOne({ username })
    if (!existingUser) {
      throw new BadRequestError('Invalid Credentials');
    }
    const passwordsMatch = await Password.compare(existingUser.password, password);
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid Credentials')
    }
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        username: existingUser.username
      },
      process.env.JWT_KEY!
    )
    req.session = {
      jwt: userJwt
    }
    res.status(200).json(existingUser)
  },
)

export {
  router as signinRouter
}