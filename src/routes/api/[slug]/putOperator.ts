import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function get(request){
    console.log('** API putOperator  GET **')
    console.log(request.params.slug)
    const find_id = Number(request.params.slug)
    try {
        const operators = await prisma.operatoronjobs.findMany({
            where : {
                job_id : find_id
            }
        })

        return {
            body: {
                    operators : operators,
                    message : 'Entro al Get',
                    status  : 'OK'
            }
        }
    } catch (error) {
        console.log(error)
        return {
            body : {
                message : 'Error al buscar operarios',
                status : 'ERROR '+error.target.meta
            }
        }
    }
}


export async function post(request){
    console.log('** API PutOperator - POST **')

    const job_id = request.params.slug
    console.log('request.params.slug', request.params.slug)





    console.log(job_id)
    try{
        const operators = await prisma.jobs.update({
            where : {
                job_id : job_id,
            },
            data : {
                operatoronjobs : {
                    connect : {
                        job_id_operator_id : {
                            job_id : job_id,
                            operator_id: 1
                        }
                    }
                }
            },
        })
    }catch(e){
        console.log(e)

        return {
            body : {

                message: 'Error al añadir operarios',
                status : 'ERROR'
            }
        }
    }
}