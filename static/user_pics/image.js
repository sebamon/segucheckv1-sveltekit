/* Acá debería tratar la imagen que recibo por POST */
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export const get = async () =>{
    console.log('GET')
    console.log("funcion Usuario get")
    //console.log(request)
    const users = await prisma.users.findMany()
     
    // const users= await result.json()
    // console.log("users: ",users)
   console.log("result: ",users)
//   const result={
//       user : 'hola'
//   }
    return {
        body: {
            users, // data: JSON.stringify(result),
            // data: result
        }
    }
}




export const post = async (request)=> {
console.log('servidor funcion post')
console.log(request)
const formBody =JSON.parse(request.body)
console.log('formBody: ',formBody)
try{
   // let user:Prisma.UserCreateInput
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
                message: 'Usuario Creado',
                data: result
            },
        }
}catch(err)
{
    error:Error=err
}
}