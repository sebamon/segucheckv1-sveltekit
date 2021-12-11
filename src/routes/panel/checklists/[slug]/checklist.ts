import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export async function get(request){
    let id_find = Number(request.params.slug)
    if(!isNaN(id_find)){
        try {
            const checkList = await prisma.checklist.findUnique({
                where: {
                    checklist_id : id_find,
                },
                include: {
                    verify : true,
                }
            })

            console.log(checkList)
            if(!checkList){
                return {
                    body: {
                        checkList : {},
                        message: 'CheckItemGroup no Encontrado',
                        status : 'INFO'
                    }
                }
            }else{
                return {
                    body: {
                        checkList : checkList,
                        message: 'CheckItemGroup Encontrado',
                        status : 'OK'
                    }
                }
            }
        
        } catch (error) {
            return {
                body : {
                    customer : {},
                    message: 'Se produjo un error al buscar CheckItemGroup',
                    status: 'ERROR'
                }
            }
        }
    }
}

export async function put(request){
    let id_find = Number(request.params.slug)
    const formBody = JSON.parse(request.body).values

    if(!isNaN(id_find)){
        try {
            const checkList = await prisma.checklist.update({
                where: {
                    checklist_id : id_find,
                },
                data : {
                    checkListName : formBody.checkListName,
                }
            })

            console.log(checkList)
            if(!checkList){
                return {
                    body: {
                        checkList : {},
                        message: 'CheckItemGroup no Encontrado',
                        status : 'INFO'
                    }
                }
            }else{
                return {
                    body: {
                        checkList : checkList,
                        message: 'checkLista Encontrada',
                        status : 'OK'
                    }
                }
            }
        
        } catch (error) {
            return {
                body : {
                    customer : {},
                    message: 'Se produjo un error al buscar CheckList',
                    status: 'ERROR'
                }
            }
        }
    }
}