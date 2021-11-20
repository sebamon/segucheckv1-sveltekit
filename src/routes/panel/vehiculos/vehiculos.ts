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
        if(vehicles.length>0){
            return {
                body: {
                    status: 'OK',
                    vehicles: vehicles,
                    message: 'Vehiculos Encontrados'
                }
            }
        }else{
            return {
                body: {
                    status: 'INFO',
                    vehicles: vehicles,
                    message: 'No hay vehiculos registrados'
                }
            }
        }
    }catch (e){
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
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
    // 
    try{

        const result = await prisma.vehicle.create({
            data:{
                domain : formBody.domain,
                brand : formBody.brand,
                model : formBody.model,
                type : formBody.type,
                year : Number(formBody.year),
                // intNumber : formBody.intNumber,
                chasisNumber : formBody.chasisNumber,
                motorNumber : formBody.motorNumber,
                // frontPicUrl : formBody.frontPic,
                // rigthSidePicUrl : formBody.rightSidePic,
                // leftSidePicUrl : formBody.leftSidePic,
            }
        })
        return {
            body:{
                status: 'OK',
                message: 'Vehiculo Creado',
                data:{
                    vehicle_id : result.vehicle_id
                }
            }
        }
    }catch(e){
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') {
                console.log(
                    'There is a unique constraint violation, a new user cannot be created with this email', e
                )
            }
            return {
                body: {
                    status: 'ERROR',
                    message: 'El dominio ya existe',
                    data: e
                }
            }
               
        }
    throw e
    }
}