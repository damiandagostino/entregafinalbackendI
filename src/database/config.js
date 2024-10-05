import mongoose from "mongoose";

export const dbConnection = async () => {
    try{
        await mongoose.connect(process.env.URI_MONGO_DB,{dbName:process.env.NAME_DB});
        console.log('Conectado a la base de datos');
    }catch (error){
        console.log (`Error al levantar la base de datos ${error}`);
        process.exit(1);
    }
}