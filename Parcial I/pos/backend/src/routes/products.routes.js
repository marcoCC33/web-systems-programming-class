import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js"

const productController = new ProductController();
const router = Router();

router.get('/products', productController.getProducts);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);

export default router;