import type { RequestHandler, Response } from "@sveltejs/kit";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function get() : Promise<{ body : any }> {
    const result = await prisma.users.findMany()
    
    console.log(result)
    return {
        body: result
    }
}

export async function put() : Promise<{ body : any }> {

    const result = await prisma.users.create({
        data:{
            firstName: 'InputName',
            lastName: 'lastmname',
            email: 'email',
            cuit: 'cuit',
            gender: 'genero',
            dateOfBirth: '',
            phone: '',
            nationality: '',
            studyLevel: '',
            degree: '',
            profilePic: '',
            password: '',
        }
    })

    console.log(result)
    return {
        body: ''
}      
}


// async function main() {
//     // ... you will write your Prisma Client queries here
//     const allUsers = await prisma.users.findMany()
//     console.log(allUsers);
//   }
  
//   interface dog{
//     name: string
//     }
    
// const dogs:dog[]=[{name:"German Shepherd"},{name:"BullDog"},{name:"Poodle"}]
// export const get:RequestHandler = async () =>{
//     const res:Response={
//         body:{
//             //dogs
//         }
//     }
//     return res;
// }


// interface dog{
// name: string
// }

// const dogs:dog[]=[{name:"German Shepherd"},{name:"BullDog"},{name:"Poodle"}]
// export const get:RequestHandler= async () =>{
//     const res:Response={
//         body:{
//             dogs
//         }
//      }
//     return res;
// }