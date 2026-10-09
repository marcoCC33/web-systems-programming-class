import { Router } from 'express';
import { 
    getAllProducts, 
    createProduct, 
    updateProduct, 
    changePrice,
    getProductById,
    deleteProduct
} from '../controllers/products.controller';

const router = Router();

router.get('/getAll', getAllProducts);
router.get('/getById/:id', getProductById);
router.post('/create', createProduct);
router.put('/update/:id', updateProduct);
router.patch('/change-price/:id', changePrice);
router.delete('/delete/:id', deleteProduct);

export default router;