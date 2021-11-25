import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function get(){
    try {
        const jobs = await prisma.jobs.findMany({
            select : {
                job_id : true,
                customer : true,
                status : true,
                location : true,
                startDate : true,
                finishDate: true,                
            }
        });

        if(jobs.length>0){
            return {
                body: {
                    jobs : jobs,
                    message: 'Trabajos Encontrados',
                    status : 'OK',
                }
            }
        }
        else{
            return {
                body: {
                    jobs : {},
                    message: 'No hay trabajos registrados',
                    status : 'INFO',
                }
            }

        }
    } catch (error) {
        console.error(error)
        return {
            body:{
                jobs : {},
                message : 'Error al buscar Trabajos',
                status : 'ERROR'
            }
        }
    }
}

export async function post(request){
    console.log('Function Post : Jobs: ')
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
    const newJob = 'Trabajo'
    try {
        // const newJob = await prisma.jobs.create({
        //     data: {
        //         startDate : formBody.startDate,
        //         finishDate : formBody.finishDate,
        //         status : formBody.status,
        //         riskAnalysis_id : formBody.riskAnalysis_id,
        //         location_id : formBody.location_id,
        //         customer_id : formBody.customer_id,
        //         vehicle_id : formBody.vehicle_id,
        //         checkItemGroup_id : formBody.checkItemGroup_id,
        //         requiredDocumentation_id : formBody.requiredDocumentation_id,
        //         checkitemgroup : formBody.checkitemgroup,
        //         customer : formBody.customer,
        //         location : formBody.location,
        //         requiereddocumentation : formBody.requiereddocumentation,
        //         riskanalysis : formBody.riskanalysis,
        //         vehicle : formBody.vehicle,
        //         operatoronjobs : formBody.operatoronjobs,
        //     }
        // })
        console.log('Nueva Locacion:', newJob)
        // const body = newLocation 
        // ? {locations: newLocation, message: 'Locacion Creada con Exito', status: 'OK'}
        // : {locations: {}, message: 'No se pudo crear la locación verificar los datos', status: 'ERROR'}

        // console.log(body)
        return {
            body: {
               job : newJob,
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