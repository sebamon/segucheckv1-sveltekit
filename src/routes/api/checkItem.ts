import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

type checkItem = {
    checkItem_id    : number,
    item            : string,
    description     : string,
    categories      : checkcategory[],
}//Listo model checkitem

type checkcategory = {
    category_id        : number,
    categoryName       : string,
    checkItems         : checkItem[]
}//Listo model checkcategory


export async function get(){
    try{
        const checkItem = await prisma.checkitem.findMany({
            include: {
                categories : true
            }
        })
        if(checkItem){
            return {
                body : {
                    checkItem : checkItem,
                    message : 'Categorias encontradas',
                    status : 'OK'
                }
            }
        }else{
            return {
                body : {
                    checkItem : {},
                    message: 'No hay categorias cargadas',
                    status : 'INFO'
                }
            }
        }
    }catch(error){
        console.log(error)
            return {
                body : {
                    checkItem : {},
                    message : 'Error al buscar categorias',
                    status : 'ERROR'
                }
            }
        }
    }

export async function post(request){
    console.log('request.body', request.body)
    const formBody = JSON.parse(request.body)
    console.log('formBody', formBody)

    // const category : checkcategory = {
    //     category_id : formBody.category_id || null,
    //     categoryName : formBody.categoryName || '',
    //     checkItems : formBody.categories.checkItems || [],
    // }
    const checkItem : checkItem = {
        checkItem_id : null,
        item : formBody.item,
        description : formBody.description,
        categories : formBody.categories
    }

    try{
        const newCheckItem = await prisma.checkitem.create({
            data: {
                item: checkItem.item,
                description : checkItem.description,
                categories : {
                    connectOrCreate : checkItem.categories.map((category)=>{
                            return {
                                where : {categoryName : category.categoryName},
                                create : {categoryName : category.categoryName},
                                
                            };
                        }),
                    }
            },
            include: {
                categories : true,
            },
            
        })
        console.log('Objeto creado',newCheckItem)
        if(newCheckItem){
            return {
                category : newCheckItem,
                message: "CheckItem Creado Exitosamente",
                result: "NEW"                
            }
        }
        else{
            return {
                category : newCheckItem,
                message: "No pudo crearse el CheckItem",
                status: "INFO",
            }
        }
    }catch(e){
        console.log(e)
        return {
            body: {
                category : {},
                message : 'Error al crear checkItem - '+ e.meta.target,
                status : 'ERROR',
            }
        }
    }
}
