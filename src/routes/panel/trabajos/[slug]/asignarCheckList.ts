import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export async function put(request){
    console.log('** - API ASIGNARCHECKLIST - PUT **')
    const assignedCheckList = JSON.parse(request.body).assignedCheckList
    const  find_id  = JSON.parse(request.params.slug)

    console.log(assignedCheckList)
    console.log('find_id', find_id)

    try{

        const updateCheckList = await prisma.jobs.update({
            where : {
                job_id : find_id,
            },
            data : {
                checkList_id : assignedCheckList
            }
            
        })
        console.log('updateCheckList',updateCheckList)
        return {
            body : {
                assignedCheckList : {assignedCheckList},
                message : 'Se ha modificado la checkList seleccionada',
                status : 'UPDATE'
            }
        }
    }catch(error){
        console.log()
        return {
            body : {
                assignedCheckList : {},
                message : 'No se ha podido asignar la CheckList',
                status : 'ERROR'
            }
        }
    }

}