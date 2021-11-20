import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

export async function get(){
    try {
        const clients = await prisma.customer.findMany()
        if(clients.length>0){
            return{
                body: {
                    customers : clients,
                    message: 'Busqueda Exitosa',
                    status : 'OK'
                }
            }
        }else{
            return{
                body: {
                    customers : {},
                    message: 'No Hay Clientes registrados',
                    status : 'INFO'
                }
            }
        }

    } catch (error) {
        console.log(error)
        return {
            body : {
                customers : {},
                message: 'Error en la conexion',
                status: 'ERROR'
            }
        }
    }
}

export async function post(request){
    console.log(request)
    const formBody = JSON.parse(request.body).values

    try {
        const customer = await prisma.customer.create({
            data: {
                businessName: formBody.businessName,
                contact : formBody.contact,
                phone : formBody.phone,
                email : formBody.email
            }
        })
        if(customer){
            return {
                body: {
                    customer: customer,
                    message : 'Cliente Creado',
                    status : 'OK'
                }
            }
        }else{
            return {
                body: {
                    customer : {},
                    message : 'No se ha podido crear el Cliente',
                    status : 'ERROR'
                }
            }
        }
        
    } catch (error) {
        console.log(error)
        return {
            body :{
                customer: {},
                message: 'Error al crear Cliente',
                status : 'ERROR'
            }
        }
    }
}