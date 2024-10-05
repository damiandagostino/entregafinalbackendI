import{Router} from 'express'
import { agregarProductoaCarrito, crearCarrito, deleteCart, deleteProductsInCart, getCartsById, updateProductsInCart } from '../controllers/carts.js';

const router = Router();

router.get('/:cid',getCartsById);
router.post('/', crearCarrito);
router.post('/:cid/product/:pid', agregarProductoaCarrito);
router.delete('/:cid/product/:pid', deleteProductsInCart);
router.put('/:cid/product/:pid', updateProductsInCart);
router.delete('/:cid', deleteCart);

export default router;