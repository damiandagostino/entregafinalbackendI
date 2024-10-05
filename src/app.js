import express from "express";
import {Server} from 'socket.io';
import {engine} from 'express-handlebars';
import 'dotenv/config';

import productsRouter from "./routers/products.router.js";
import cartsRouter from "./routers/carts.router.js";
import viewsRouter from "./routers/views.router.js";
import __dirname from "./utils.js";
import { dbConnection } from "./database/config.js";
import { messageModel } from "./dao/models/message.js";
import { addProductService, getProductsService } from "./services/products.js";


const app = express();
const PORT = process.env.PORT;



app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

await dbConnection();

const expresServer = app.listen(PORT, ()=>{console.log(`Corriendo app en el puerto ${PORT}`);});
const io = new Server(expresServer);

// Productos
io.on('connection',async (socket)=>{
    console.log('cliente conectado desde el front');
    const {payload} = await getProductsService({});
    const productos = payload;
    socket.emit('productos', payload);
    
    socket.on('agregarProducto', async(producto)=>{
        const newProduct = await addProductService({...producto});
        if(newProduct){
            productos.push(newProduct);
            socket.emit('productos', productos);
        }
    });
    
    
    // Chat
    const messages = await messageModel.find();
    socket.emit('message', messages);

    socket.on('message',async(data) => {
        const newMessage = await messageModel.create({...data});
        if(newMessage){
            const messages = await messageModel.find();
            io.emit('messageLogs', messages)
        }
    });

    socket.broadcast.emit('nuevo_user');
});