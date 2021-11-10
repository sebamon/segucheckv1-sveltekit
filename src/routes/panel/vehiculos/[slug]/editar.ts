import { PrismaClient , Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export const put = async (request) =>{
    let id_find = Number(request.params.slug)
    const formBody = JSON.parse(request.body)
    console.log(formBody)

    try{
        const vehicleEdit = await prisma.vehicle.update({
            where: {
                vehicle_id: id_find,
            },
            data: {
                domain : formBody.domain,
                brand : formBody.brand,
                model : formBody.model,
                type : formBody.type,
                year : formBody.year,
                // intNumber : formBody.intNumber,
                chasisNumber : formBody.chasis,
                motorNumber : formBody.motor,
                frontPicUrl : formBody.frontPic,
                rigthSidePicUrl : formBody.rightSidePic,
                leftSidePicUrl : formBody.leftSidePic,
        }
        })
        
        return {
            body: {
                vehicleEdit,
                message: 'Vehiculo Modificado',
                status: 'OK'
            }
        }
    }catch(e){
        return {
            body: {},
            message: 'Error',
            status: 'ERROR'
        }
    }
}