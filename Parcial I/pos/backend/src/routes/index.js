import { Router } from "express";
import productRoutes from './products.routes.js';

const router = Router();

router.use('/v1/products', productsRoutes);

export default router;