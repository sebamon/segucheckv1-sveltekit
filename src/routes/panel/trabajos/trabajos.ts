import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function get(){
    console.log('** API : Trabajos : GET **')
    try {
        const jobs = await prisma.jobs.findMany({
            select : {
                job_id : true,
                customer : true,
                statusJob : true,
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

    type JobType ={
        startDate:string,
        finishDate:string,
        statusJob:string ,
        riskAnalysis:string,
        customer: number,
        location_id: number,
        internalNumber: number,
        vehicleSelect:number
    }
    
    let objeto:JobType = {...formBody}
    console.log('objeto',objeto)

    // console.log('object', object)
    // const newJob = 'Trabajo'
    try {
        const newJob = await prisma.jobs.create({
            include: {
                customer : true,
                location : true,
                riskanalysis : true,
                vehicle : true,
                operatoronjobs : true,
            },
            data: {
                startDate : new Date(objeto.startDate),
                finishDate : new Date(objeto.finishDate),
                statusJob : objeto.statusJob,

                riskanalysis : {
                    connect: {riskAnalysis_id : 1}
                },

                // location_id : objeto.location,
                location : {
                    connect: {
                        location_id : Number(objeto.location),
                    }
                },
                
                // customer_id : objeto.customer,
                customer : {
                    connect: {customer_id : Number(objeto.customer)}
                },
                // vehicle_id : Number(objeto.vehicleSelected),

                // checkItemGroup_id : objeto.checkItemGroup_id,
                // checklist : {
                //     create : {
                //         checkListName : 'EL nombre de la lista',
                        
                //     },
                // },
                
                // requiredDocumentation_id : objeto.requiredDocumentation_id,
                // requiereddocumentation : {
                //     connect : {requiredDocumentation_id : 1}
                // },
                vehicle : {
                    connect :{vehicle_id : Number(objeto.vehicleSelect)}
                }
                
            }
        })
        console.log('Nueva Locacion:', newJob)
        // const body = newLocation 
        // ? {locations: newLocation, message: 'Locacion Creada con Exito', status: 'OK'}
        // : {locations: {}, message: 'No se pudo crear la locación verificar los datos', status: 'ERROR'}

        // console.log(body)
        return {
            body: {
               job : newJob,
               status : 'NEW',
               message: 'Trabajo Creado',
            }
        }

    } catch (error) {
        console.error(error)
        return {
            body : {
                job : {},
                message: 'Error al registrar trabajo',
                status: 'ERROR'
            }
        }
    }
}