import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function get(request){
    console.log('** API putOperator  GET **')

    const find_id = Number(request.params.slug)


    try {
        const operators = await prisma.operatoronjobs.findMany({
            where : {
                job_id : Number(find_id)
            },
            include : {
                operator : {
                    include: {
                        users : true
                    }
                },
                
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

export async function put(request){
    console.log('** API Asignar Operarios - PUT **')

    const formBody=JSON.parse(request.body)
    const operatorList = formBody.assingOperatorList || []
    console.log('operatorList', operatorList)
    // console.log('formBody',formBody)

    const job_id = formBody.job_id
    // console.log('job_id', job_id)

    try{

            const designaciones = await prisma.operatoronjobs.deleteMany({
                where : {
                    job_id : job_id
                }
            })
        
            if(operatorList.length>0){
        console.log('designaciones',designaciones)

            const assignedOperators = await prisma.operatoronjobs.createMany({  
                data :
                operatorList.map((operator)=> {
                    return {
                        job_id : Number(job_id),
                        operator_id : Number(operator.operator_id),               
                    }
                }),
        
                
            })
        }

        let jobDetails = await prisma.jobs.findUnique({
            where: {
                job_id : job_id
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
        console.log('endpoiing operator',jobDetails)
            return {
                body : {
                    operatorsInJob : jobDetails.operatoronjobs,
                    status : 'UPDATE',
                    message : 'Se modificaron los operarios asignados'
                }
            }
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