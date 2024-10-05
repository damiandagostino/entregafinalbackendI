import { Router } from 'express'

import { getProductsService } from '../services/products.js';
import { getCartsByIdService } from '../services/carts.js';

const router = Router();

router.get("/", async(req, res) => {
    const {payload} = await getProductsService({});
    return res.render('home', { productos: payload, style: 'style.css' });
});

router.get("/realtimeproducts", (req, res) => {
    return res.render('realTimeProducts',{style: 'style.css' });
});

router.get("/chat", (req, res) => {
    return res.render('chat');
});

router.get('/products',async(req,res)=>{
    const result = await getProductsService({...req.query});
    return res.render('products', {title:'productos', result, style: 'style.css' })
});

router.get('/cart/:cid',async(req,res)=>{
    const {cid} = req.params;
    const carrito = await getCartsByIdService(cid);
    return res.render('cart', {title:'carrito', carrito})
});


export default router;