import express, { Request, Response } from "express";
import { Password } from "../util/password";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";

const router = express.Router();

interface Product {
  id: number;
  title: string;
  description: string;
}

/// THIS IS PROTECTED ROUTE....

router.get("/api/products",
  currentUser,
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const products: Product[] = [];

    for (var i = 1; i <= 20; i++) {
      products.push({
        id: i,
        title: `title ${i}`,
        description: `descripion ${i}`
      })
    }

    res.status(200).json(products)
  },
)

export {
  router as getProductsRouter
}