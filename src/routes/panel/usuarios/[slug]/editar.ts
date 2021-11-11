import { PrismaClient , Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export const put = async (request) =>{
    let id_find = Number(request.params.slug)
    const formBody = JSON.parse(request.body)

    try{
        const userEdit = await prisma.users.update({
            where: {
                user_id: id_find,
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
        
        return {
            body: {
                userEdit,
                message: 'Usuario Modificado',
                status: 'OK'
            }
        }
    }catch(e){
        return {
            body: {},
            message: 'Error',
            status: 'ERROR'
        }
    }
}