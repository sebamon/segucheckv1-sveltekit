import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()



export async function get(){
    
    // const find_id = request.body.values.checkItemGroup

    // console.log(request.body.values)
    // console.log('find_id',find_id)
    try{
        const checkItem = await prisma.checkitem.findMany({
            include: {
                checkitemgroup : true,
            
            },
        })
        if(checkItem){
            return {
                body : {
                    checkItem : checkItem,
                    message : 'CheckItem encontrados',
                    status : 'OK'
                }
            }
        }else{
            return {
                body : {
                    checkItem : {},
                    message: 'No hay CheckItem cargados',
                    status : 'INFO'
                }
            }
        }
    }catch(error){

        console.log(error)
            return {
                body : {
                    checkItem : {},
                    message : 'Error al buscar CheckItem',
                    status : 'ERROR'
                }
            }
        }
    }
