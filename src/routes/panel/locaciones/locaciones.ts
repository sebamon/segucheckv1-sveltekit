import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function get(){
    try {
        const locations = await prisma.location.findMany({
            select : {
                location_id : true,
                locationName : true,
                coordenites : true,
                customer : {
                    select: {
                        contact : true
                    }
                }
                
            }
        });

        if(locations.length>0){
            return {
                body: {
                    locations : locations,
                    message: 'Locaciones Encontradas',
                    status : 'OK',
                }
            }
        }
        else{
            return {
                body: {
                    locations : {},
                    message: 'No hay locaciones registradas',
                    status : 'INFO',
                }
            }

        }
    } catch (error) {
        console.error(error)
        return {
            body:{
                locations : {},
                message : 'Error al buscar Locaciones',
                status : 'ERROR'
            }
        }
    }
}

export async function post(request){
    console.log('Function Post : Locations: ')
    const formBody = JSON.parse(request.body).values
    console.log('formBody',formBody)

    type LocationType ={
        locationName:string,
        coordenites:string,
        customer_id:number,
        province:string
    }
    let object:LocationType = {
        locationName : formBody.locationName,
        coordenites : formBody.coordenites,
        customer_id :  formBody.customer,
        province : formBody.province,
    }
    console.log('object', object)
    try {
        const newLocation = await prisma.location.create({
            data: {
                locationName : object.locationName,                
                coordenites : object.coordenites,
                province : object.province,
                customer : {
                    connect: {
                        customer_id : Number(object.customer_id)
                    }
                }
            }
        })
        console.log('Nueva Locacion:', newLocation)
        const body = newLocation 
        ? {locations: newLocation, message: 'Locacion Creada con Exito', status: 'OK'}
        : {locations: {}, message: 'No se pudo crear la locación verificar los datos', status: 'ERROR'}

        console.log(body)
        return {
            body: {
               location : newLocation,
               status : 'NEW',
               message: 'Locación Creada',
            }
        }

    } catch (error) {
        console.error(error)
        return {
            body : {
                locations : {},
                message: 'Error al registrar locación',
                status: 'ERROR'
            }
        }
    }
}