// import * as cookie from 'cookie';

// export async function handle({ request, resolve }) {
// 	const cookies = cookie.parse(request.headers.cookie || '');
// 	const jwt = cookies.jwt && Buffer.from(cookies.jwt, 'base64').toString('utf-8');
// 	request.locals.user = jwt ? JSON.parse(jwt) : null;
// 	return await resolve(request);
// }

// export function getSession({ locals }) {
// 	return {
// 		user: locals.user && {
// 			username: locals.user.username,
// 			email: locals.user.email,
// 			image: locals.user.image,
// 			bio: locals.user.bio
// 		}
// 	};
// }

// // src/hooks.ts https://blog.logrocket.com/exploring-sveltekit-the-newest-svelte-based-framework/
// import {defaultState} from '$lib/store';
// import type { RequestHandler, Response } from "@sveltejs/kit";

// import * as cookie from 'cookie';
// const auth_token='demo_token_for_example';

// const userDetails={name:"Deb",age:45}

// // export const getContext:GetContext=({ headers })=>{
// //     const cookies = cookie.parse(headers.cookie || '');
// //     return {
// //         token:cookies['token']
// //     };
// // }
// export const getSession:getSession=async ({context})=>{
//     let initialState={...defaultState};
//     if (context['token']===auth_token){
//         console.log("tokens match");
//         initialState.authenticated=true
//         initialState.user=userDetails;
//     }
//     console.log(initialState)
//     return initialState
// }