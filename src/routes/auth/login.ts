import {PrismaClient} from '@prisma/client'
import * as cookies from 'cookie'
import {v4 as uuidV4} from 'uuid'
import jwt from 'jsonwebtoken'


export const post = async (request) => {
	const prisma = new PrismaClient()
	const credenciales = JSON.parse(request.body)

	console.log(authorization)

	
	//Guardo los datos que vienen del FRONT END y los guardo en como credenciales

	// console.log('jwt', jwt)
	try{
		const user =  await prisma.users.findUnique({
			select :{
				user_id :true,
				cuit:true,
				firstName:true,
				lastName:true,
				email:true,
				usersonroles:{
					include : {
						roles: true,
					},
				},
			},
			where: {
				credentials : {	
					cuit : credenciales.cuit,
					password: credenciales.password,
				},
			},
		})

		/**
		 * Si la consulta no devolvió usuario retorno mensaje de errror
		 */
		if(!user){
			return {		
				body : {
					user : {},
					message : 'Cuit o Password incorrectos',
					status  : 401
				}
			}
		}

		if(user){
			const roles = user.usersonroles.map(role => role.roles.rolDescription)
			const userForToken = {
				id: user.user_id,
				roles: roles,
			}
			const token=jwt.sign({userForToken},process.env.SECRET,{
				expiresIn: 60 * 60 * 24 * 7
			})
			const headers = {
				'Set-Cookie': cookies.serialize('seguToken',token, {
					httpOnly : true,
					maxAge : 60 * 60,
					sameSite: 'lax',
					path: '/panel'
				})
			}
			return {
				headers: headers,
				body:{
					 user,
					roles : roles,
					token,
					message : 'Credenciales Exitosas',
					status: 200
				}
			}
		}
		return {
			headers: {
				'set-cookie' : "segutoken=null",
			},
			body: {
				user : {},
				roles: {},
				token: null,
				message : 'Cuit y/o contraseña Incorrectos',
				status : 401
			}
		} 

	}catch(e)
	{
		return {
			headers: {
				'set-cookie' : "segutoken=null",
			},
			body: {
				user : {},
				message : 'Error al intentar conectar con la DB',
				status: 500 //ver cual es mejor
			}
		} 
	}
}
// headers: {
// 	'set-cookie': 'segutoken='+token,
// 	httpOnly : true,
// 	maxAge : 60,
// },