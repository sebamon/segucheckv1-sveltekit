import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const post = (request) => {
    const formBody = JSON.parse(request.body)
    const email = formBody.email
    const password = formBody.password

    

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