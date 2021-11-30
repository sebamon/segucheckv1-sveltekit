import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function put(request){
    console.log('** API : Locaciones Editar : PUT **')
    let id_find = Number (request.params.slug)
    const formBody = JSON.parse(request.body).values
    console.log('formBody put',formBody)
    if(!isNaN(id_find)){
        try {
            let locationEdit = await prisma.location.update({
                where : {
                    location_id : id_find,
                },
                data : {
                    locationName : formBody.locationName,                
                    coordinates : formBody.coordinates,
                    province : formBody.province,
                    customer : {
                        connect: {
                            customer_id : Number(formBody.customer)
                        }
                    }
                }
            })
            if(locationEdit){
                return {
                    body : {
                        location : locationEdit,
                        message : 'Locacion Actualizada',
                        status: 'NEW'
                    }
                }
            }else{
                return {
                    body : {
                        location : {},
                        message : 'INFO',
                        status: 'No se pudo modificar la locación'
                    }
                }
            }
        }catch(e){
            console.log(e)
            return {
                body : {
                    location : {},
                    message : 'ERROR',
                    status: 'Error al modificar la locación'
                }
            }
        }
    }
}

