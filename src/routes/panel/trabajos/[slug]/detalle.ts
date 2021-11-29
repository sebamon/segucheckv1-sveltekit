import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export async function get(request){
    let id_find = Number(request.params.slug)
    if(!isNaN(id_find)){
        try{
            let jobDetails = await prisma.jobs.findUnique({
                where: {
                    job_id : id_find
                },
                include: {
                    customer : true,
                    riskanalysis: true,
                    checkitemgroup: true,
                    location : true,
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