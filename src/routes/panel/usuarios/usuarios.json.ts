import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export const get = async () =>{
    console.log('GET')
    console.log("funcion Usuario get")
    const users = await prisma.users.findMany()
    console.log("result: ",users)
    return {
        body: {
            users,
        }
    }
}

export const post = async (request)=> {
console.log('servidor funcion post')
console.log(request)
const formBody =JSON.parse(request.body)
console.log('formBody: ',formBody)
   // let user:Prisma.UserCreateInput
   try {
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
            console.log('result despues de insert:',result)
            return{
                body: {
                    status: 'OK',
                    message: 'Usuario Creado',
                    data: result,                    
                },
            }
    } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === 'P2002') {
        console.log(
            'There is a unique constraint violation, a new user cannot be created with this email', e
        )
        }
        return {
            body: {
                status: 'ERROR',
                message: 'El Usuario no se pudo crear, email ya existente',
                data : e
            }
        }
    }
    throw e
    }
}
