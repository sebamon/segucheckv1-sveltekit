import { PrismaClient, Prisma } from '@prisma/client'


const prisma = new PrismaClient()

export const get = async () =>{
    console.log('** API : Vehiculos : GET **')
    try{
        // const vehicles = await prisma.vehicle.findMany({
        //     select: {
        //         vehicle_id : true,
        //         domain : true,
        //         brand : true,
        //         model : true,
        //         type: true,
        //         status: true,
                
        //     },
        // })

        const vehicles = await prisma.vehicle.findMany({
            include : {
                vehicleonvehiclerequirement : {
                    select : {
                        current : true,

                        vehiclerequirements : true
                    },
                }

            }
        })
        // const vehicles2 = await prisma.vehiclerequirements.findMany({
        //     include: {
        //         vehicleonvehiclerequirement : true
        //     }
        // })
        // console.log('vehicles2',JSON.stringify(vehicles2))
        // console.log('v3',JSON.stringify(v3))
        if(vehicles.length>0){
            return {
                body: {
                    vehicles: vehicles,
                    message: 'Vehiculos Encontrados',
                    status: 'OK',
                }
            }
        }else{
            return {
                body: {
                    vehicles: vehicles,
                    message: 'No hay vehiculos registrados',
                    status: 'INFO',
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
                    vehicles : e
                }
            }
        }
            throw e
    }
}

export const post = async (request) => {
    console.log('request vehiculo post',request)
    const formBody =JSON.parse(request.body).values 
    console.log('formBody' ,formBody)
    try{
        const newVehicle = await prisma.vehicle.create({
            data:{
                domain : formBody.domain,
                brand : formBody.brand,
                model : formBody.model,
                type : formBody.type,
                year : Number(formBody.year),
                internNumber : Number(formBody.internNumber), //No esta definido en Prisma
                chasisNumber : formBody.chasisNumber,
                motorNumber : formBody.motorNumber,
                // frontPicUrl : formBody.frontPic,
                // rightSidePicUrl : formBody.rightSidePic,
                // leftSidePicUrl : formBody.leftSidePic,
            }
        })
        if(newVehicle){
            return {
                body : {
                    vehicle : newVehicle,
                    status : 'NEW',
                    message : 'Vehículo Creado'
                }
            }
        }
        else{
            return {
                body:{
                    vehicle: {},
                    status: 'ERROR',
                    message: 'Problemas al crear Vehículo',
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
                    vehicle: e
                }
            }
               
        }
    throw e
    }
}