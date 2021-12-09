import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()



export async function get(){
    try{
        const checkList = await prisma.checkcategory.findMany({
            include: {
                checkitems : true
            }
        })
        if(checkList){
            return {
                body : {
                    checkList : checkList,
                    message : 'Checklist encontradas',
                    status : 'OK'
                }
            }
        }else{
            return {
                body : {
                    checkList : {},
                    message: 'No hay Checklist cargadas',
                    status : 'INFO'
                }
            }
        }
    }catch(error){

        console.log(error)
            return {
                body : {
                    checkList : {},
                    message : 'Error al buscar checklist',
                    status : 'ERROR'
                }
            }
        }
    }

    // export async function post(request){
    //     console.log('request.body', request.body)
    //     const formBody = JSON.parse(request.body)
    
    //     const checklist : checkList = {
    //         checklist_id : formBody.checklist_id,
    //         checkListName : formBody.checklistName,
    //         verify : formBody.verify,
    //     }
    //     console.log('checklist postman',checklist)
    //     checklist.checkItems.map((item) => {
    //         return {
    //             where : {item : item.item},
    //             create : {item : item.item},
    //         };
    //     })
    //     // const { category_id , categoryName, checkItems } = category
    //     try{
    //         const newCategory = await prisma.checkcategory.create({
    //             data: {
    //                 categoryName: category.categoryName,
    //                 checkitems : {
    //                     connectOrCreate : category.checkItems.map((item) => {
    //                         return {
    //                             where : {item : item.item},
    //                             create : {item : item.item ,description: item.description},
    //                         };
    //                     })
    //                 },
    //             },
    //             include: {
    //                 checkitems : {
    //                     select : {
    //                         checkItem_id : true,
    //                         item : true,
    //                         description :true
    //                     }
    //                 },
    //             }
    //         })
    //         console.log('Objeto creado',newCategory)
    //         if(newCategory){
    //             return {
    //                 category : newCategory,
    //                 message: "Categoria Creada Exitosamente",
    //                 result: "NEW"                
    //             }
    //         }
    //         else{
    //             return {
    //                 category : newCategory,
    //                 message: "No pudo crearse la Categoria",
    //                 status: "INFO",
    //             }
    //         }
    //     }catch(e){
    //         console.log(e)
    //         return {
    //             body: {
    //                 category : {},
    //                 message : 'Error al cargar Categoria - '+ e.code,
    //                 status : 'ERROR',
                  
    //             }
    //         }
    //     }
    
    
    // }