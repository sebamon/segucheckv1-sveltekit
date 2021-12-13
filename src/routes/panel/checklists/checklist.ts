import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()



export async function get() {
    try{
        const checkList = await prisma.checklist.findMany({
            where : {
                
            },
            
        })
        if(checkList){
            return {
                body : {
                    checkList : checkList,
                    message : 'Categorias encontradas',
                    status : 'OK'
                }
            }
        }else{
            return {
                body : {
                    checkList : {},
                    message: 'No hay categorias cargadas',
                    status : 'INFO'
                }
            }
        }
    }catch(error){

        console.log(error)
            return {
                body : {
                    checkList : {},
                    message : 'Error al buscar categorias',
                    status : 'ERROR'
                }
            }
        }
    }
// export async function get() {
//     try{
//         const categories = await prisma.checkcategory.findMany({
//             include: {
//                 checkitems : true
//             }
//         })
//         if(categories){
//             return {
//                 body : {
//                     categories : categories,
//                     message : 'Categorias encontradas',
//                     status : 'OK'
//                 }
//             }
//         }else{
//             return {
//                 body : {
//                     categories : {},
//                     message: 'No hay categorias cargadas',
//                     status : 'INFO'
//                 }
//             }
//         }
//     }catch(error){

//         console.log(error)
//             return {
//                 body : {
//                     categories : {},
//                     message : 'Error al buscar categorias',
//                     status : 'ERROR'
//                 }
//             }
//         }
//     }


export async function post(request) {
    const formBody = JSON.parse(request.body);
    console.log('** API CHECKLIST - POST - ** ',formBody );

    console.log('FormBody.itemcollection: ', formBody.itemCollection)

    console.log('itemConelction . Item', JSON.stringify(formBody.itemCollection.item))
    let verifyItems = [];
    let verify: verify;
    let itemCollection = formBody.itemCollection
    let listaItems = []

console.log('itemCollection', itemCollection)
try{

    const newCheckList = await prisma.checklist.create({
        data : {
            checkListName : formBody.checklistName,
            
        }
    })
    
    formBody.itemCollection.map(async(item)=> {
        const newVerifyCheckList = await prisma.verifychecklist.create({
            data: {
                checkList : 
                {
                    connect : { checkList_id : newCheckList.checkList_id},
                },
                checkItem : {
                    connect : {
                        item : item.item,
                    },
                },
                checked : false,
                observation : '',
            }
            
        })
    })
    
    if(newCheckList)  {
        return {
            body: {
                message: 'CheckList Creada con Exito',
                status: 'OK',
            }
        };
    }
    else {
        return {
            body : {
                newCheckList : {},
                message: 'Error al crear checkList',
                status: 'ERROR',

            }
        }
    }
}catch(error){
    console.log(error)
    return {
        body : {
            message: 'Problemas al intentar crear la checkList',
            status: 'ERROR',
        }        
    }
}
    
}
  