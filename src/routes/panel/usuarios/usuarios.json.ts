import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export const get = async () =>{
    console.log('GET')
    console.log("funcion Usuario get")
    try{
        const aw=await prisma.$connect()
        const users = await prisma.users.findMany({
            where: {
                
            },
            select :{
                user_id :true,
                firstName:true,
                lastName:true,
                cuit:true,
                email:true,
                usersonroles:{
                    include : {
                        roles: true,
                   },
                },
            }
        })

        console.log("result: ",users)
        return {
            body: {
                users,
            }
        }
    }catch (e){
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            console.log('entro al  error' , e)
            console.log('e.code: ' , e.code)
            console.log('e.meta: ' , e.meta)
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
                    usersonroles:{
                    }
                },
            })
            console.log('result despues de insert:',result)
            return{
                body: {
                    status: 'OK',
                    message: 'Usuario Creado',
                    data: {
                        user_id : result.user_id,                    
                    }
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
