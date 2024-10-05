import { cartModel } from '../dao/models/carts.js';

export const getCartsByIdService = async (cid) => {
    try{
        return await cartModel.findById(cid).populate('products.id').lean();
    }catch{
        console.log('getCartsByIdService -> ', error);
        throw error;
    }
}
export const crearCarritoService =async () => {
    try{
        return await cartModel.create({});

    }catch{
        console.log('crearCarritoService -> ', error);
        throw error;
    }
}
export const agregarProductoaCarritoService =async (cid, pid) => {
    try{
        const carrito = await cartModel.findById(cid);
        if(!carrito)
            return null;

        const productoInCart = carrito.products.find(p=>p.id.toString() === pid);

        if (productoInCart)
        productoInCart.quantity++;
        else
            carrito.products.push({ id: pid, quantity: 1});
        
        carrito.save();

        return carrito;
    }catch{
        console.log('agregarProductoaCarritoService -> ', error);
        throw error;
    }
}
export const deleteProductsInCartService = async (cid, pid) => {
    try{
        return await cartModel.findByIdAndUpdate(cid,{$pull:{'products':{id:pid}}},{new: true});
    }catch (error){
        console.log('deleteProductsInCartService -> ', error);
        throw error;
    }
}

export const updateProductsInCartService =async (cid, pid,quantity) => {
    try{
        return await cartModel.findOneAndUpdate(
            {_id:cid,'products.id':pid},
            {$set:{'products.$.quantity':quantity}},
            {new:true}
        );
    }catch (error){
        console.log('updateProductsInCartService -> ', error);
        throw error;
    }
}

export const deleteCartService = async (cid) => {
    try{
        return await cartModel.findByIdAndUpdate(cid,{$set:{'products':[]}},{new: true});
    }catch (error){
        console.log('deleteCartService -> ', error);
        throw error;
    }
}