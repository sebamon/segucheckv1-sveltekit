import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

type checkcategory = {
    category_id        : number,
    categoryName       : string,
    checkItems         : checkItem[]
}//Listo model checkcategory


export async function get(request){
    const formBody = request.body

    const id_find = Number(request.params.slug)

    try {
        const showCategory:checkcategory = await prisma.checkcategory.findUnique({
            where : {
                category_id : id_find
            },
            include : {
                checkitems : true
            }
        })
        console.log(showCategory)
        if(showCategory){
            return {
                body: {
                    category : showCategory,
                    message : 'Se encontró la categoria',
                    status : 'OK',
                }
            }
        }else{
            return {
                body: {
                    category : {},
                    message : 'La categoria que busca no existe',
                    status : 'INFO',
                }
            }    
        }
    } catch (error) {
        console.log(error)
        return {
            body : {
                category : {},
                message: 'Error al buscar de categoria',
                status : 'ERROR'
            }
        }
    }

}
export async function put(request){
    const formBody = request.body
    const id_find = Number(request.params.slug)

    try {
        const updateCategory = await prisma.checkcategory.update({
            where : {
                category_id : id_find,
            },
            data : {
                categoryName : formBody.categoryName,
            }
        })
        
        console.log(updateCategory)
        if(updateCategory){
            return {
                body: {
                    category : updateCategory,
                    message : 'Se modificó la categoria',
                    status : 'OK',
                }
            }
        }else{
            return {
                body: {
                    category : {},
                    message : 'La categoria que busca no existe',
                    status : 'INFO',
                }
            }    
        }
    } catch (error) {
        console.log(error)
        return {
            body : {
                category : {},
                message: 'Error al buscar de categoria',
                status : 'ERROR'
            }
        }
    }
}