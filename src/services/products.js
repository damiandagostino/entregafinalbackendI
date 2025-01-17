import { productModel } from "../dao/models/products.js";
// Get con las limitacion de cantidad de productos por pagina y logica de orden
export const getProductsService = async ({limit = 10, page = 1, sort, query}) => {

    try{
        page = page == 0 ? 1 : page;
        page = Number(page);
        limit = Number(limit);
        const skip = (page-1) * limit;
        const sortOrderOptions = {'asc': -1, 'desc': 1};
        sort = sortOrderOptions[sort] || null;

        try{
            if (query)
                query = JSON.parse(decodeURIComponent(query))
        }catch (error){
            console.log('Error al parsear: ', error);
            query = {}
        }
        
        const queryProducts = productModel.find(query).limit(limit).skip(skip).lean();
        //logica para el orden de productos
        if(sort !== null)
            queryProducts.sort({price: sort });

        


        const [productos, totalDocs] = await Promise.all([queryProducts,productModel.countDocuments(query) ]);
//Logica para el manejo de las paginas de shows
        const totalPages = Math.ceil(totalDocs/limit);

        const hasNextPage = page < totalPages;
        const hasPrePage = page > 1;
        const prevPage = hasPrePage ? page - 1 : null;
        const nextPage = hasNextPage ? page + 1 : null;


        return {
            status:'success/error',
            totalDocs,
            totalPages,
            limit,
            query:JSON.stringify(query),
            page,
            hasNextPage,
            hasPrePage,
            prevPage,
            nextPage,
            payload: productos,
        }

    } catch(error){
        console.log('getProductsService -> ', error);
        throw error;
    }
}


//conando para poder obtener los shows por su numero de id
export const getProductByIdService = async (pid) => {
    try{
        return await productModel.findById(pid);

    } catch(error){
        console.log('getProductByIdService -> ', error);
        throw error;
    }
}
//comando para poder agregar shows nuevos
export const addProductService = async ({ title, description, price, thumbnail, code, stock, category, status }) => {
    try{
        return await productModel.create({title, description, price, thumbnail, code, stock, category, status});
    } catch(error){
        console.log('addProductService -> ', error);
        throw error;
    }
}
//comando para poder realizar actualziaciones sobre shows ya creados
export const updateProductService = async (pid,rest) => {
    try{
        return await productModel.findByIdAndUpdate(pid,{...rest},{new:true});
    } catch(error){
        console.log('updateProductService -> ', error);
        throw error;
    }
}
//comando para poder eliminar shows existentes
export const deleteProductService = async (pid) => {
    try{
        return await productModel.findByIdAndDelete(pid);
    } catch(error){
        console.log('deleteProductService -> ', error);
        throw error;
    }
}