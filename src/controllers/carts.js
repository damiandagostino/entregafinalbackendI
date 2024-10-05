import{request, response} from 'express';
import { agregarProductoaCarritoService, crearCarritoService, deleteCartService, deleteProductsInCartService, getCartsByIdService, updateProductsInCartService } from '../services/carts.js';

export const getCartsById = async (req = request, res = response) => {
    try{
        const {cid} = req.params;
        const carrito = await getCartsByIdService(cid);
        if(carrito)
            return res.json({carrito});
        return res.status(404).json({msg:`El carrito con id ${cid} no existe`});
    }catch{
        return res.status(500).json({msg: 'Hablar con un administrador'});
    }
}
export const crearCarrito =async (req = request, res = response) => {
    try{
        const carrito = await crearCarritoService();
        return res.json({msg: 'Carrito creado', carrito});
    }catch{
        return res.status(500).json({msg: 'Hablar con un administrador'});
    }
}
export const agregarProductoaCarrito =async (req = request, res = response) => {
    try{
        const {cid, pid} = req.params;
        const carrito = await agregarProductoaCarritoService(cid, pid);

        if(!carrito)
            return res.status(404).json({msg: `El carrito con id ${cid} no existe`});

        return res.json({ msg: 'Carrito actualizado', carrito});
    }catch{
        return res.status(500).json({msg: 'Hablar con un administrador'});
    }
}

export const deleteProductsInCart = async (req = request, res = response) => {
    try{
        const {cid,pid} = req.params;
        const carrito = await deleteProductsInCartService(cid, pid);
        if(!carrito)
            return res.status(404).json({msg:'No se pudo realizar la operacion'})
        return res.json({msg:'Producto eliminado del carrito', carrito});

    }catch (error){
        return res.status(500).json({msg: 'Hablar con un administrador'});
    }
}

export const updateProductsInCart = async (req = request, res = response) => {
    try{
        const {cid,pid} = req.params;
        const {quantity} = req.body;
        if (!quantity|| !Number.isInteger(quantity))
            return res.status(404).json({msg:'La propiedad cantidad solo adminte numeros enteros positivos'})
            const carrito = await updateProductsInCartService(cid, pid, quantity);
        if(!carrito)
            return res.status(404).json({msg:'No se pudo realizar la operacion'});
        return res.json({msg:'Cantidad actualizada en el carrito', carrito});

    }catch (error){
        return res.status(500).json({msg: 'Hablar con un administrador'});
    }
}

export const deleteCart = async (req = request, res = response) => {
    try{
        const {cid} = req.params;

            const carrito = await deleteCartService(cid);
        if(!carrito)
            return res.status(404).json({msg:'No se pudo realizar la operacion'});
        return res.json({msg:'Cantidad actualizada en el carrito', carrito});

    }catch (error){
        return res.status(500).json({msg: 'Hablar con un administrador'});
    }
}
