import * as cookie from 'cookie'

export const handle = async ({ request , resolve }) =>{

    // const cookies = cookie.parse(request.header.cookie || '')
    
    // request.locals.user=cookies;

    // if(!cookies.session_id){
    //     request.locals.user.authenticated = false
    // }else{
    //     request.locals.user.authenticated = true
    // }

    // request.locals.username= 'the-hook'
    const response = await resolve(request)
    
    return {
        ...response,
        headers:{
            ...response.header,
            status : "OK"
        }
    }
}

export const getSession = (request) =>{
    // console.log('getSession: request->',JSON.stringify(request))
    // const user = request.locals.user;
    // console.log(request.locals)
    // if(!user.session_id){
    //     return {}
    // }
    // return {
    //     user,
    // }
}
