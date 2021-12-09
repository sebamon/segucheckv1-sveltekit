import { PrismaClient } from '@prisma/client'
import { NavItem } from 'sveltestrap'
const prisma = new PrismaClient()



export async function get() {
    try {
        const checkList = await prisma.checkcategory.findMany({
            include: {
                checkitems: true
            }
        })
        if (checkList) {
            return {
                body: {
                    checkList: checkList,
                    message: 'Checklist encontradas',
                    status: 'OK'
                }
            }
        } else {
            return {
                body: {
                    checkList: {},
                    message: 'No hay Checklist cargadas',
                    status: 'INFO'
                }
            }
        }
    } catch (error) {

        console.log(error)
        return {
            body: {
                checkList: {},
                message: 'Error al buscar checklist',
                status: 'ERROR'
            }
        }
    }
}

export async function post(request) {
    console.log('llegamo, nene!!');
    const formBody = JSON.parse(request.body);

    console.log('FormBody.itemcollection: ', formBody.itemCollection)

    let verifyItems = [];
    let verify: verify;

    formBody.itemCollection.forEach(checkItem => {
        verifyItems = [...verifyItems, {
            verifyItem_id: null,
            checkItem: checkItem,
            checked: false,
            observation: '',
        }]
    });

    verify = {
        verify_id: null,
        list: verifyItems
    }

    const checklist: checkList = {
        checkList_id:null,
        checkListName: formBody.checklistName,
        verify: verify,
    }

        console.log('verifyItems', JSON.stringify(verifyItems))
        console.log('verify', JSON.stringify(verify))
        console.log('checklist', JSON.stringify(checklist))    
        // const newVerify = await prisma.verify.create({
    //     data: {
    //         checklist: {
    //             create: {
    //                 checkListName: checklist.checkListName,

    //             }
    //         }
    //     }
    // })

    const newChecklist = await prisma.checklist.create({
        include : {
            verify : {
                include : {
                    list : {
                        include : {
                            checkItem : true
                        }
                    }
                }
            }
        },
        data : {
            checkListName : checklist.checkListName,
            verify : {
                create : {
                    list : {
                        createMany : {
                            // data : [{
                            //     checkItem_id : checklist.verify.list[0].checkItem.checkItem_id,
                            //     checked : false,
                            //     observation : '',
                            // }]
                            data : checklist.verify.list.map((element)=>{
                                return {
                                    checkItem_id : element.checkItem.checkItem_id,
                                    checked : false,
                                    observation : '',
                                }
                            })
                        },
                    },
                },
            }
        }
    })
                    //     createMany : [{
                    //         data : {                                
                    //             checkItem_id : checklist.verify.list[0].checkItem.checkItem_id,
                    //             checked : false,
                    //             observation : '',
                    //             verifyItem_id: null,                                
                    //     },
                    //     {

                    //     },
                        
                    // }]

    return {
        body: {
            message: 'no fuimoooo',
            status: 'OK'
        }
    };
}

    //     console.log('request.body', request.body)
    //     const formBody = JSON.parse(request.body)


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
