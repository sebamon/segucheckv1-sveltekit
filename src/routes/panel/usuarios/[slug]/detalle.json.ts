import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export const get = async ( request ) =>{
//    console.log('Entro al get de detalle: request:', request)
    const id_find = Number(request.params.slug)
//  NaN( request.params.slug )
//    console.log('id_find', id_find, typeof(id_find))
    try{
        const result = await prisma.users.findUnique({
            where :{
                // user_id : 1,
                user_id : id_find,
            },
            include:{
                usersonroles: true,
            }
    
        })
        console.log('result', result)
        return {
          body: {
              result,
              message: 'User Found',
              status: 'OK'
              
          }
          
            // message: 'Find User',
            // status: 'OK'
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

// export const get = async () =>{
    //     // console.log('Entro al Get de Detalle Usuario con request:',request.params.slug)
//     // const id_find=Number(request.params.slug)

    
// }