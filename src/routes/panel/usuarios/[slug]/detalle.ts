import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export const get = async ( request ) =>{
    let id_find =  Number(request.params.slug)
    console.log('id_find', id_find)
    console.log(typeof(id_find))
    const userDetails = await prisma.users.findUnique({
        where :{
            user_id : id_find,
        },
        include:{
            usersonroles: true,
        }

    })
    console.log('userDetails',userDetails)

    return {
        body: {
            userDetails,
            message: 'User Found',
            status: 'OK'
        }
    }
    // try{
    // }catch(e){
    //     console.log("Error: ",e)
    //     return{
    //         body: {},
    //         message: 'User not found',
    //         status: 'ERROR'
    //     }
    // }
}
