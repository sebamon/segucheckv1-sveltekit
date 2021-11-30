import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export async function get(request){

    const id_find = Number(request.params.slug)
    try{
        const response = await prisma.userworkinfo.findUnique({
            where : {
                operator_id : id_find
            }
        })
    }catch(e){
        console.log(e)
        return {
            body : {
                workInfo : {},
                status : 'ERROR',
                message : 'Problemas al buscar datos laborales'
            }
        }
    }
    
}
