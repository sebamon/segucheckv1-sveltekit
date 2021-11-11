import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

export const get = async () =>{
    console.log('roles get')
    try{
        const roles = await prisma.roles.findMany()
        console.log(roles)
        return {
            body: {
                roles
            }
        }
        
    }catch(e){
       throw e
    }
}
