import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export const get = async ( request ) =>{
    let id_find = Number(request.params.slug)
    /* console.log('Busqueda para Prisma', typeof(id_find)) */
    try{
        const userDetails = await prisma.users.findUnique({
            where :{
                user_id : id_find,
            },
            include:{
                usersonroles: true,
            }
    
        })

        if(userDetails.user_id!=null){
        return {
          body: {
            userDetails: userDetails,
            message: 'User Found',
            status: 'OK'
        }
    }
}
else{
    return {
        body: {
            userDetails : {},
            message: 'User Not Found',
            status: 'ERROR'
            }
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
