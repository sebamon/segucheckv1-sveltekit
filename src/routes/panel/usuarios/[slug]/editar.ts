import { PrismaClient , Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export const put = async (request) =>{
    let id_find = Number(request.params.slug)
    const formBody = JSON.parse(request.body).values
    console.log(formBody)
    try{
        const userEdit = await prisma.users.update({
            where: {
                user_id: formBody.user_id,
            },
            data: {
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
        }
        })
        console.log('edit', userEdit)
        return {
            body: {
                user: userEdit,
                message: 'Usuario Modificado',
                status: 'UPDATE'
            }
        }
    }catch(e){
        console.log(e)
        return {
            body: {
                user: {},
                message: 'Error',
                status: 'ERROR'
            },
        }
    }
}