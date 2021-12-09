import { PrismaClient } from "@prisma/client";
import moment from "moment";
const prisma = new PrismaClient()

export async function put(request){
    console.log('** API : Trabajos Detalle : PUT **')
    let id_find = Number(request.params.slug)
    const formBody = JSON.parse(request.body).values
    console.log('formBody put',formBody)
    if(!isNaN(id_find)){
        try{
            let jobEdit = await prisma.jobs.update({
                where: {
                    job_id : id_find
                },
                data: {
                    startDate: new Date(formBody.startDate),
                    finishDate: new Date(formBody.finishDate),
                    statusJob: 'Programado',

                    customer: {
                        connect : {
                            customer_id : formBody.customer
                        },
                    }, 

                    location: {
                        connect : {
                            location_id : formBody.location
                        },
                    },

                    vehicle: {
                        connect : {
                            vehicle_id : Number(formBody.vehicle_id)
                        }
                    },
                    updated_at : new Date(moment.now()),

                    checklist : {
                        connect : {
                            checklist_id: 1,
                        }
                    },
                    riskanalysis: {
                        connect : {
                            riskAnalysis_id : 1
                        }
                    }
                }
            })
            console.log('respuesta update jobs', jobEdit)
            if(jobEdit){
                return {
                    body : {
                        job : jobEdit,
                        message: 'Trabajo Modificado',
                        status: 'UPDATE'
                    }
                }
            }
            else{
                return {
                    body : {
                        job : {},
                        message: 'No se pudo modificar el trabajo',
                        status : 'INFO'
                    }
                }
            }
        }catch(error){
            console.log(error)
            return {
                body : {
                    job : {},
                    message: 'Error al modificar trabajo',
                    status : 'ERROR'
                }
            }
        
        }
    }
}

