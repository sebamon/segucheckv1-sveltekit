import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export async function get(request){
    console.log('** API : Trabajos Detalle : GET **')
    let id_find = Number(request.params.slug)
    if(!isNaN(id_find)){
        try{
            let jobDetails = await prisma.jobs.findUnique({
                where: {
                    job_id : id_find
                },
                include: {
                    customer : true,
                    // riskanalysis: true,
                    // checklist: true,
                    location : true,
                    vehicle : true,
                    // requiereddocumentation : true,
                    operatoronjobs : {
                        include : {
                            operator : {
                                select : {
                                    operator_id : true,
                                    users : {
                                        select : {
                                            user_id : true,
                                            email : true,
                                            firstName : true,
                                            lastName : true,
                                            cuit : true,
                                            phone : true,
                                            active : true
                                        }
                                    },
                                }
                            }
                        }
                    },
                }
            })
            if(jobDetails){
                return {
                    body : {
                        job : jobDetails,
                        message: 'Trabajo Encontrado',
                        status: 'OK'
                    }
                }
            }
            else{
                return {
                    body : {
                        job : {},
                        message: 'No se encontró el trabajo',
                        status : 'INFO'
                    }
                }
            }
        }catch(error){
            console.log(error)
            return {
                body : {
                    job : {},
                    message: 'Error al buscar trabajos',
                    status : 'ERROR'
                }
            }
        
        }
    }
}