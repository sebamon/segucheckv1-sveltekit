import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export async function get(request){

    const id_find = Number(request.params.slug)
    try{
        const workInfo = await prisma.operator.findUnique({
            where : {
                operator_id : id_find
            },
            include : {
                useraddress : true,
                userhealthinfo : true,
                userworkinfo : true,
                users : true,
            }
        })

        console.log('workInfo en detalle operario.ts', workInfo)
        if(workInfo){
            return {
                body: {
                    workInfo  : workInfo,                  
                    status : 'OK',
                    message : 'Se encontró información de trabajo'
                }
            }
        }else{
            return {
                body : {
                    workInfo : {},                  
                    status : 'INFO',
                    message : 'No hay información de trabajo cargada'
                }
            }
        }        
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
