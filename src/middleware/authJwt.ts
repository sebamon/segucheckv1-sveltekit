// import jwt from 'jsonwebtoken'
// import { PrismaClient  } from '.prisma/client'

// const prisma = new PrismaClient()

// export const verifyToken = async(req, res, next) =>{
//     const token = req.headers["x-access-token"]

//     if(!token) return {
//         body: {
//             status: 403,
//             message: 'No ha enviado el token',
//         }
//     }

//     const decoded = jwt.verifyToken(token,'LACLAVESECRETA')
//     console.log(decoded)
//     // const user = await prisma.users.findUnique({
//     //     select : {
//     //         user_id : decoded,
//     //     }
//     // })

//     // if()
//     console.log(token,decoded)
//     next()
// }

// // export const isModerator = async(req, res,next){

// // }