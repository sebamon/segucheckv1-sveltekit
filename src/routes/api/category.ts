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
        const categories = await prisma.checkcategory.findMany({
            include: {
                checkitems : true
            }
        })
        if(categories){
            return {
                body : {
                    categories : categories,
                    message : 'Categorias encontradas',
                    status : 'OK'
                }
            }
        }else{
            return {
                body : {
                    categories : {},
                    message: 'No hay categorias cargadas',
                    status : 'INFO'
                }
            }
        }
    }catch(error){

        console.log(error)
            return {
                body : {
                    categories : {},
                    message : 'Error al buscar categorias',
                    status : 'ERROR'
                }
            }
        }
    }

export async function post(request){
    console.log('request.body', request.body)
    const formBody = JSON.parse(request.body)

    const category : checkcategory = {
        category_id : formBody.category_id,
        categoryName : formBody.categoryName,
        checkItems : formBody.checkItems,
    }
    console.log('category postman',category)
    category.checkItems.map((item) => {
        return {
            where : {item : item.item},
            create : {item : item.item},
        };
    })
    // const { category_id , categoryName, checkItems } = category
    try{
        const newCategory = await prisma.checkcategory.create({
            data: {
                categoryName: category.categoryName,
                checkitems : {
                    connectOrCreate : category.checkItems.map((item) => {
                        return {
                            where : {item : item.item},
                            create : {item : item.item ,description: item.description},
                        };
                    })
                },
            },
            include: {
                checkitems : {
                    select : {
                        checkItem_id : true,
                        item : true,
                        description :true
                    }
                },
            }
        })
        console.log('Objeto creado',newCategory)
        if(newCategory){
            return {
                category : newCategory,
                message: "Categoria Creada Exitosamente",
                result: "NEW"                
            }
        }
        else{
            return {
                category : newCategory,
                message: "No pudo crearse la Categoria",
                status: "INFO",
            }
        }
    }catch(e){
        console.log(e)
        return {
            body: {
                category : {},
                message : 'Error al cargar Categoria - '+ e.code,
                status : 'ERROR',
              
            }
        }
    }


}
