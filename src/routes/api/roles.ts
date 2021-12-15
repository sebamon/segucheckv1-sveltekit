import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

export const get = async () =>{
    console.log('** API - Roles - Get **')
    try{
        const roles = await prisma.roles.findMany()        
        console.log(roles)
        if(roles){
            return {
                body: {
                    roles: roles,
                    status : 'OK',
                    message : 'Roles Encontrados'
                }
            }
        }
        else{
            return {
                body: {
                    roles: {},
                    status : 'INFO',
                    message : 'No hay roles registrados'
                }
            }
        }
    }catch(e){
       throw e
    }
}
