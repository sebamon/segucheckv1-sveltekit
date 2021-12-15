import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


export async function put(request){
    console.log('** API : Clientes Editar : PUT **')
    let id_find = Number(request.params.slug)
    const formBody = JSON.parse(request.body).values
    console.log('formBody put',formBody)
    if(!isNaN(id_find)){
        try{
            let customerEdit = await prisma.customer.update({
                where : {
                    customer_id : id_find,
                },
                data :{
                    businessName: formBody.businessName,
                    contact : formBody.contact,
                    phone : formBody.phone,
                    email : formBody.email  
                }
            })
            if(customerEdit){
                return {
                    body: {
                        customer: customerEdit,
                        message : 'Cliente Modificado',
                        status : 'UPDATE'
                    }
                }
            }else{
                return {
                    body: {
                        customer : {},
                        message : 'No se ha podido modificar el Cliente',
                        status : 'INFO'
                    }
                }
            }
        }catch(e){
            return {
                body :{
                    customer: {},
                    message: 'Error al modificar Cliente',
                    status : 'ERROR'
                }
            }
        }
    }

}
