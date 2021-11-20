import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

export async function get(request){
    console.error('hola request')
    let id_find = Number (request.params.slug)
    console.log(id_find)
    if(!isNaN(id_find)){
        try {
            const customerDetails = await prisma.customer.findUnique({
                where: {
                    customer_id : id_find,
                }
            })

            console.log(customerDetails)
            if(!customerDetails){
                return {
                    body: {
                        customerDetails : {},
                        message: 'Cliente no Encontrado',
                        status : 'ERROR'
                    }
                }
            }else{
                return {
                    body: {
                        customerDetails : customerDetails,
                        message: 'Cliente Encontrado',
                        status : 'OK'
                    }
                }
            }
        
        } catch (error) {
            return {
                body : {
                    customer : {},
                    message: 'Error',
                    status: 'ERROR'
                }
            }
        }
    }
}
export async function put(request){
    console.error('hola request put')
    let id_find = Number (request.params.slug)
    const formBody = JSON.parse(request.body)
    console.log(id_find)
    if(!isNaN(id_find)){
        try {
            const customerDetails = await prisma.customer.update({
                where: {
                    customer_id : id_find,
                },
                data :{
                        businessName: formBody.businessName,
                        contact : formBody.contact,
                        phone : formBody.phone,
                        email : formBody.email
                    
                }
            })

            console.log(customerDetails)
            if(!customerDetails){
                return {
                    body: {
                        customerDetails : {},
                        message: 'Cliente no Encontrado',
                        status : 'ERROR'
                    }
                }
            }else{
                return {
                    body: {
                        customerDetails : customerDetails,
                        message: 'Cliente Encontrado',
                        status : 'OK'
                    }
                }
            }
        
        } catch (error) {
            return {
                body : {
                    customer : {},
                    message: 'Error',
                    status: 'ERROR'
                }
            }
        }
    }
}
