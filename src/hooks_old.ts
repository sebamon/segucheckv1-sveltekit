import {defaultState} from '$lib/store';
import * as cookie from 'cookie';

const auth_token='demo_token_for_example';
const userDetails={name:"Deb",age:45}


export async function handle({ request, resolve }) {
	// console.log('handle hook',request) 
	// console.log('handle hook') 
    // console.log(JSON.stringify(request))
	const cookies = cookie.parse(request.headers.cookie || '');
	const jwt = cookies.jwt && Buffer.from(cookies.jwt, 'base64').toString('utf-8');
	request.locals.user = jwt ? JSON.parse(jwt) : null;
    console.log('request',JSON.stringify(jwt))
	return await resolve(request);

}

export const getSession = (request) =>{
    console.log(request)
    return {
        user: {
            id: "1",
            firstName: 'PrimerNombre',
            access: "Control Documental",
        }
    }
}


// export const getContext = ({ headers })=>{
//     const cookies = cookie.parse(headers.cookie || '');
//     return {
//         token:cookies['token']
//     };
// }
// export const getSession =asy1nc ({context})=>{
//     let initialState={...defaultState};
//     if (context['token']===auth_token){
//         console.log("tokens match");
//         initialState.authenticated=true
//         initialState.user=userDetails;
//     }
//     console.log(initialState)
//     return initialState
// }
// // import * as cookie from 'cookie';


// // export function getSession({ locals }) {
// // 	console.log('getSession hook: locals->' ,locals)
// // 	return {
// // 		user: locals.user && {
// // 			username: locals.user.username,
// // 			email: locals.user.email,
// // 			image: locals.user.image,
// // 			bio: locals.user.bio
// // 		}
// // 	};
// // }
// import busboy from 'busboy'
// // import {render} from '@sveltejs/kit'
// import type {Handle} from '@sveltejs/kit'
// export const handle: Handle = async ({request,resolve}) => {
//     console.log('in handle')
//     console.log(request)
//     if (request.path === 'your/path') {
//         const files = {}
//         await new Promise((resolve, reject) => {
//           const bb = new busboy({
//             headers: { 'content-type': request.headers['content-type'] },
//           })
//           bb.on('file', (fieldname, file, filename, encoding, mimetype) => {
//             console.log(
//               'File [%s]: filename=%j; encoding=%j; mimetype=%j',
//               fieldname,
//               filename,
//               encoding,
//               mimetype
//             )
//             console.log(file)
//             const buffers = []
//             files[fieldname] = {
//               filename,
//               encoding,
//               mimetype,
//             }
//             file
//               .on('data', (fileData) => {
//                 console.log('File [%s] got %d bytes', fieldname, fileData.length)
//                 buffers.push(fileData) //this adds files as buffers, which can be hard on memory. You can also write to a file using streams here.
//               })
//               .on('end', () => {
//                 console.log('File [%s] Finished', fieldname)
//                 const buffer = Buffer.concat(buffers)
//                 files[fieldname]['file'] = buffer
//               })
//           })
//             .on('field', (fieldname, val) => {
//               console.log('Field [%s]: value: %j', fieldname, val)
//               request.body[fieldname] = val
//             })
//             .on('finish', () => {
//               console.log('Done parsing form!')
//               request.body['files'] = files
//               resolve(request.body)
//             })
//             .on('error', (err) => {
//               console.log('failed', err)
//               reject(err)
//             })
    
//           bb.end(request.rawBody)
//         })
//       }
//       const response = await render(request)
//       return {
//         ...response,
//         headers: {
//           ...response.headers,
//         },
//       }
// }