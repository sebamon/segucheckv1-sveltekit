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
                'There is a unique constraint violation, a new user cannot be created with this email', e)
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
let roles=[]
console.log('formBody: ',formBody)
   try {
       if(formBody.roles_assigned['rol1']===true){
         roles.push({rol_id: 1, assignedBy : 1, user_id: 16})
         console.log('roles id1', roles)
       }
       if(formBody.roles_assigned['rol2']===true){
         roles.push({rol_id: 2 , assignedBy : 1, user_id: 16})
         console.log('roles id2', roles)
       }
       if(formBody.roles_assigned['rol3']===true){
         roles.push({rol_id: 3, assignedBy : 1, user_id: 16})
         console.log('roles id3', roles)
       }

       console.log('roles:', roles)
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
        
            }
        })
            
            const newUserId = result.user_id
            console.log('result: ', result)
            console.log('newUserId: ', newUserId)

            roles.forEach(async element => {  
                let rolInsert = await prisma.usersonroles.create({
                        data: {
                                user_id : newUserId,
                                rol_id : element.rol_id,
                                assignedBy : '1',
                    }
                })
                if (element.rol_id==3){
                    let operator = await prisma.operator.create({
                        data: {
                            user_id: newUserId,
                        }
                    })
                }
            });


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
