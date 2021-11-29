import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export const get = async ( request ) =>{
    console.log(request)
    let id_find = Number(request.params.slug)
    console.log('id_find',id_find)
    if(!isNaN(id_find)){
    try{
        const vehicleDetails = await prisma.vehicle.findUnique({
            where :{
                vehicle_id : id_find,
            },      
    
        })
        // console.log(vehicleDetails)
        if(vehicleDetails){
            return {
                body: {
                    vehicleDetails : vehicleDetails,
                    message: 'Vehicle Found',
                    status: 'OK'
                }
            }
        }else{
            return {
                body: {
                    vehicleDetails : {},
                    message: 'Vehicle Not Found',
                    status: 'INFO'
                }
            }
        }
    }catch(e){
        console.log("Error: ",e)
        return{
            body: {
            vehicleDetails : {},
            message: 'Vehicle not found',
            status: 'ERROR'
            }
        }
    }
}}
