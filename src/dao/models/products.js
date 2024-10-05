import {Schema, model} from 'mongoose';

const nameCollection = 'Producto';

const ProductoSchema = new Schema({

    title:{type:String, required:[true,'El titulo del show es obligatorio']},
    description:{type:String, required:[true,'La descripcion del show es obligatoria']},
    price:{type:Number, required:[true,'El precio del show es obligatorio']},
    thumbnail:[{type:String}],
    code:{ type: String, required:[true,'El codigo del producto es obligatorio'], unique: true},
    stock: {type: Number, required:[true,'El stock de entradas es obligatorio']},
    category: {type:String, required:[true,'La categoria es obligatoria']},
    status: {type:Boolean, default: true}
});

ProductoSchema.set('toJSON',{
    transform: function(doc,ret){
        delete ret.__v;
        return ret;
    }
});

export const productModel = model(nameCollection, ProductoSchema);