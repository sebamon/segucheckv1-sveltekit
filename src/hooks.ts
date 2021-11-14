// export const handle = ({ request , resolve }) =>{

//     const response = resolve(request)

//     return {
//         ...response,
//     }
// }

export const getSession = (request) =>{
    // console.log('getSession: request->',JSON.stringify(request))
    return {
        user: {
            id: "1",
            firstName: 'PrimerNombre',
            access: "Control Documental",
        }
    }
}