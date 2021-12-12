import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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
                message: 'No hay operarios registrados',
                status: 'INFO'
            }
        }

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
export const post = async (request) => {
	console.log('** API OPERARIOS - POST **')
	const formBody = JSON.parse(request.body).values;
    console.log(formBody);

    /* Implementar carga de archivos */

    return {
        body: {
            message: 'Estamos yendo por buen camino, mi hermano',
            status: 'OK'
        }
    }
}