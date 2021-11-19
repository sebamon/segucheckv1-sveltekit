import * as cookie from 'cookie'


// export async function getContext({headers,request}){
//     console.log('headers', headers)
//     const token=request.localStorage.get('seguToken')
//     console.log(token)
//     const cookies = cookie.parse(headers.cookie || '')
    
//     console.log('cookies hooks', cookies)
//     if(!cookies.session_id){
//         return {
//             authenticated : false
//         }
//     }
//     // const userSesssion = JSON.parse()
    
// }

// export async function handle({request ,resolve}){

//     // const response = ()

//     // console.log('request', request)
//     // const token=request.localStorage.get('seguToken')
//     // const cookies = cookie.parse(headers.cookie || '')
//     console.log('token', request.path)
//     // console.log('token2',cookies)
//     // console.log('resolve', await resolve)

//     // return {resolve}
// }


// export function getSession({context, request}){
    
//     console.log('context',context)
//     console.log('request',request)
//     // if(!context.authenticated){
//     //     return {
//     //         authenticated: context.authenticated
//     //     }
//     // }
//     // return {
//     //     authenticated: context.authenticated,
//     //     cuit: context.cuit
//     // }
// }