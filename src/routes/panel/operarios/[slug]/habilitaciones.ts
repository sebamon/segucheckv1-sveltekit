import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function get(request){
    console.log('** API HABILITACIONES - GET **')
    
    const find_id = Number(request.params.slug)

    const qualifications = await prisma.operator.findMany({
        where: {operator_id : find_id}
    })

    console.log(qualifications)
}

export async function post(request){
    console.log('** API HABILITACIONES - POST **')

    const find_id = Number(request.params.slug)
    const formBody = JSON.parse(request.body).values
    
    const habilitacion = {
        operator_id : find_id,
        urlPdf : formBody.document,
        documentType : JSON.parse(formBody.documentType),
        expirationDate : formBody.expirationDate
    }
    console.log('find_id', find_id)
    console.log('formBody', formBody)
    console.log('habilitacion', habilitacion)

    try{
        const qualification = await prisma.documentation.create({
            data: {
                status : 'active',
                urlPdf : habilitacion.urlPdf,
                expirated_at : new Date(habilitacion.expirationDate),
                folder : {
                    create : {
                        operator_id : habilitacion.operator_id,
                    },
                },
                documenttype : {
                    connectOrCreate : {
                        where : {
                            description : habilitacion.documentType.description,
                        },
                        create : {
                            description : habilitacion.documentType.description,
                        },
                    }
                }      
            }
        })
        if(qualification){
            return {
                body: {
                    qualification : qualification,
                    message : 'Nueva Habilitación creada',
                    status: 'NEW'
                }
            }
        }else{
            return {
                body: {
                    qualification : {},
                    message : 'Hubo problemas al intentar crear la habilitación',
                    status: 'INFO'
                }
            }
        }
    }catch(error){
        return {
            body: {
                qualification : {},
                message : 'Error al grabar habilitación',
                status: 'ERROR'
            }
        }
    }
}