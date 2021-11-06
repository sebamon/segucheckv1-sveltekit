import { PrismaClient, Prisma } from '@prisma/client'


const prisma = new PrismaClient()

export const get = async () =>{
    try{
        const vehicles = await prisma.vehicle.findMany({
        where: {

        },
        select: {
            vehicle_id : true,
            domain : true,
            brand : true,
            model : true,
            type: true,
        }
        })
        return {
            body: {
                vehicles,
            }
        }
    }catch (e){
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
/*             console.log('entro al  error' , e)
            console.log('e.code: ' , e.code)
            console.log('e.meta: ' , e.meta) */
            if (e.code === 'P2002') {
            console.log(
                'There is a unique constraint violation, a new user cannot be created with this email', e)
            }
            return {
                body: {
                    status: 'ERROR',
                    message: 'El Usuario no se pudo crear, email ya existente',
                    data : e
                }
            }
        }
            throw e
    }
}

export const post = async (request) => {
    const formBody =JSON.parse(request.body)
    console.log('formBody', formBody)
    
    return {
        body:{
            formBody,
        }
    }
    debugger
}