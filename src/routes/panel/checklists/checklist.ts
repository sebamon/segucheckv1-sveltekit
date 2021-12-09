import { PrismaClient } from '@prisma/client'
import { NavItem } from 'sveltestrap'
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

export async function post(request) {

    const newCheckLis = await prisma.checklist.create({
        data : {
            verify : {
                create  : {
                    list : {
                        connectOrCreate: {
                            where: {
                                verifyItem_id : 1
                            },
                            create : {
                                verifyItem_id : 1,
                                checked : false,
                                
                            }
                        }
                    }
                }
            }
        }
    })

    }