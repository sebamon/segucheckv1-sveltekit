// import * as cookie from 'cookie'

// export async function getContext({headers}){
//     const cookies = cookie.parse(headers.cookie || '')

//     console.log('cookies hooks', cookies)
//     if(!cookies.session_id){
//         return {
//             authenticated : false
//         }
//     }
//     // const userSesssion = JSON.parse()

// }

// export function getSession({context}){
//     if(!context.authenticated){
//         return {
//             authenticated: context.authenticated
//         }
//     }
//     return {
//         authenticated: context.authenticated,
//         cuit: context.cuit
//     }
// }