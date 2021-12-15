import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export async function get (){
    try{

        const operators = await prisma.operator.findMany({
          where : {
              
          }
        })


        const operatorsonjobs = await prisma.operatoronjobs.findMany({
         
        })

        const dashboard = {
            operators : operators,
            operatorsonjobs : operatorsonjobs,
        }

        console.log('operators', operators)
        console.log('operatorsonjobs', operatorsonjobs)
        console.log('dashboard', dashboard)

        return {
                body: {
                    dashboard : {},
                    message: '',
                    status : '',
                }
        }
    }catch(error){
        console.log(error)
        return {
            body: {
                dashboard : {},
                message: '',
                status : '',
            }
        }
    }

    return {
        body: {
            dashboard : {},
            message: '',
            status : '',
        }
    }
}