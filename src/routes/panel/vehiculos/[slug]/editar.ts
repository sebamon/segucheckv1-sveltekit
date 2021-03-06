import { PrismaClient , Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export const put = async (request) =>{
    let id_find = Number(request.params.slug)
    const formBody = JSON.parse(request.body).values
    console.log(formBody)
    try{
        const vehicleEdit = await prisma.vehicle.update({
            where: {
                vehicle_id: formBody.vehicle_id,
            },
            data: {
                domain : formBody.domain,
                brand : formBody.brand,
                model : formBody.model,
                type : formBody.type,
                year : Number(formBody.year),
                internNumber : Number(formBody.internNumber),
                chasisNumber : formBody.chasisNumber,
                motorNumber : formBody.motorNumber,
                // frontPicUrl : formBody.frontPic,
                // rigthSidePicUrl : formBody.rightSidePic,
                // leftSidePicUrl : formBody.leftSidePic,
        }
        })
        console.log('vehicleEdit', vehicleEdit)
        return {
            body: {
                vehicleEdit,
                message: 'Vehiculo Modificado',
                status: 'UPDATE'
            }
        }
    }catch(e){
        console.log(e)
        return {
            body: {},
            message: 'Error',
            status: 'ERROR'
        }
    }
}