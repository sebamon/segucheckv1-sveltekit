import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export async function get(request){
    let id_find = Number(request.params.slug)
    if(!isNaN(id_find)){
        try {
            const checkGroup = await prisma.checkitemgroup.findUnique({
                where: {
                    checkItemGroup_id : id_find,
                }
            })

            console.log(checkGroup)
            if(!checkGroup){
                return {
                    body: {
                        checkGroup : {},
                        message: 'CheckItemGroup no Encontrado',
                        status : 'INFO'
                    }
                }
            }else{
                return {
                    body: {
                        checkGroup : checkGroup,
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
            const checkGroup = await prisma.checkitemgroup.update({
                where: {
                    checkItemGroup_id : id_find,
                },
                data : {
                    groupName : formBody.groupName,
                }
            })

            console.log(checkGroup)
            if(!checkGroup){
                return {
                    body: {
                        checkGroup : {},
                        message: 'CheckItemGroup no Encontrado',
                        status : 'INFO'
                    }
                }
            }else{
                return {
                    body: {
                        checkGroup : checkGroup,
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