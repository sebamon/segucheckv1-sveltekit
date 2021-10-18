import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const get = async ():Promise<{ body : any }> => {
    console.log('GET')
    //console.log(request)
    const result = await prisma.users.findMany({})
 
    return {
        body: result
    }
}


    export const post = async (request)=> {
    console.log('servidor funcion post')
    console.log(request)
    const formBody =JSON.parse(request.body)
    console.log(formBody)
    const result = await prisma.users.create({
        data:{
                firstName : formBody.firstName,
                lastName :formBody.lastName,
                cuit :formBody.cuit,
                email :formBody.email,
                phone :formBody.phone,
                degree :formBody.degree,
                gender :formBody.gender,
                nationality :formBody.nationality,
                studyLevel :formBody.studyLevel,              
                dateOfBirth: new Date(formBody.dateOfBirth),
                profilePic: 'Not Load',
                password: '',
            },
        })

    console.log(result)
    return{
        body: {
            message: 'Usuario Creado',
            data: result
        },
    }

}