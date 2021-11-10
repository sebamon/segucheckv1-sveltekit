import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const post = (request) => {
    const formBody = JSON.parse(request.body)
    const email = formBody.email
    const password = formBody.password
}


export const get = async () => {
    try{
        const operators = await prisma.operator.findMany({
            include: {
                users:{
                    select: {
                        user_id : true,
                        firstName : true,
                        lastName : true,
                        cuit : true,
                        active : true,
                    }
                }
            }
        })
        /* console.log('operators.length',operators.length) */
        if(operators.length>0){
            return {
                body: {
                    operators,
                    message : 'Operadores Encontrados',
                    status: 'OK'
                }
            }
        }
        
        return {
            body: {
                operators : {},
                message: 'No Hay operarios registrados',
                status: 'INFO'
            }
        }
        // const operators = await prisma.operator.findMany({
            //     where: {
                
                //     },
        //     select : {
        //         operator_id : true,
        //         users : {
        //             include : {
                        
        //             }
        //         }
        //     },
        // })

    }catch(e){
        throw e
    }
}

// export async function put() : Promise<{ body : any }> {

//     const result = await prisma.users.create({
//         data:{
//             firstName: 'InputName',
//             lastName: 'lastmname',
//             email: 'email',
//             cuit: 'cuit',
//             gender: 'genero',
//             dateOfBirth: '',
//             phone: '',
//             nationality: '',
//             studyLevel: '',
//             degree: '',
//             profilePic: '',
//             password: '',
//         }
//     })

//     console.log(result)
//     return {
//         body: ''
// }      
// }