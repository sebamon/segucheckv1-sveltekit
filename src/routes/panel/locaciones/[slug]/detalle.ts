import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export async function get(request){
    const id_find=Number(request.params.slug)
    console.log(id_find)
    
    try {
        const locationDetails = await prisma.location.findUnique({
            where :{
                location_id : id_find
            },
            include: {
                customer : true
            }
        })
        console.log('locationDetails' ,locationDetails)
        if(locationDetails){
            return {
                body: {
                    locationDetails : locationDetails,
                    status : 'OK',
                    message : 'Locaciones Encontradas',
                }
            }
        }else{
            console.log('else')
            return {
                body: {
                    locationDetails : {},
                    status : 'INFO',
                    message : 'No hay locaciones con esa identificación',
                }
            }
        }
    } catch (error) {
        console.log(error)
        return {
            body: {
                locationDetails: {},
                status : 'ERROR',
                message : 'Error al intentar buscar locaciones'

            }
        }
    }
}