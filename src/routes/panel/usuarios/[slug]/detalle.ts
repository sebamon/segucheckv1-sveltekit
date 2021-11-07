import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export const get = async ( request ) =>{
    let id_find = Number(request.params.slug)
    console.log('Busqueda para Prisma', typeof(id_find))
    try{
        const userDetails = await prisma.users.findUnique({
            where :{
                user_id : id_find,
            },
            include:{
                usersonroles: true,
            }
    
        })

        return {
          body: {
            userDetails: userDetails,
            message: 'User Found',
            status: 'OK'
          }
        }
    }catch(e){
        console.log("Error: ",e)
        return{
            body: {},
            message: 'User not found',
            status: 'ERROR'
        }
    }
}
