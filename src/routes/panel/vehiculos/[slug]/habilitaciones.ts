import { PrismaClient } from '@prisma/client'
import { parse } from 'path/posix'
const prisma = new PrismaClient()

export async function get(request){
    console.log('** API HABILITACIONES VEHICULOS - GET **')
    
    const find_id = Number(request.params.slug)
    
    const qualifications = await prisma.vehiclerequirements.findMany({
        where: {vehicleRequirement_id : find_id}
    })
    
    console.log(qualifications)
}

export async function post(request){   
     
console.log('** API HABILITACIONES VEHICULOS - POST **')

const find_id = Number(request.params.slug)
const formBody = JSON.parse(request.body).values
let habilitacion = {
    urlPdf : formBody.document,
    documentType : JSON.parse(formBody.documentType),
    expirationDate : formBody.expirationDate,
    vehicle_id : find_id
}

console.log('habilitacion', habilitacion
)
if(isNaN(find_id)){
    
        return   
    }
        console.log('find_id', find_id)
        console.log('formBody', formBody)
        
        
        try{
            const qualification = await prisma.vehiclerequirements.create({
                data : {
                    urlPdf : habilitacion.urlPdf,
                    expirated_At : new Date(habilitacion.expirationDate),
                    requirementName : habilitacion.documentType.description,
                    requirementDescription : habilitacion.documentType.description,
                    vehicleonvehiclerequirement : {
                        create : {
                           vehicle_id : habilitacion.vehicle_id,
                           current : true
                        },
                    }
                }
            })
            
            if(qualification){
                return {
                    body: {
                        qualification : qualification,
                        message : 'Nueva Habilitación de vehículo creada',
                        status: 'NEW'
                    }
                }
            }else{
                return {
                    body: {
                        qualification : {},
                        message : 'Hubo problemas al intentar crear la habilitación del vehículo',
                        status: 'INFO'
                    }
                }
            }
            
        }catch(error){
            return {
                body: {
                    qualification : {},
                    message : 'Error al registrar habilitación del vehículo',
                    status: 'ERROR'
                }
            }
        }
    }