import { respond } from './_respond';
import {PrismaClient} from '@prisma/client'
import * as cookies from 'cookie'
import {v4 as uuidV4} from 'uuid'
import jwt from 'jsonwebtoken'


export const post = async (request) => {
	const prisma = new PrismaClient()
	const credenciales = JSON.parse(request.body)
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
		if(!user){
			return {
				headers: {
					'set-cookie' : "segutoken=null",
				},
				body : {
					user : {},
					message : 'Cuit o Password incorrectos',
				}
			}
		}
		const roles = user.usersonroles.map(role => role.roles.rolDescription)
		console.log('role',roles)
		const token=jwt.sign({id:user.user_id},'LACLAVESECRETA',{ //traer clave secreta de un .env
			expiresIn: 60 * 60 * 24 * 7
		})
		console.log('token',token)

		// localStorage.setItem('seguToken',token)
		if(user){
			// const sessionId = uuidV4()
			// console.log(sessionId)
			// const headers = {
			// 	"set-cookie": cookies.serialize("session_id",sessionId, {
			// 		httpOnly: true,
			// 		sameSite: "lax",
			// 		maxAge: 60 * 60 * 24 *7,
			// 		patch: "/",
			// 		authorization: token,
			// 	}),
			// }
			return {
				headers: {
					'set-cookie': 'segutoken='+token,
					httpOnly : true,
					maxAge: 60,
					// Authorization : `Beaver ` + token
				},
				body:{
					user:user,
					roles: roles,
					message : 'Credenciales Exitosas'
				}
			}
		}
		return {
			body: {
				user : {},
				roles: {},
				token: null,
				message : 'Cuit y/o contraseña Incorrectos'
			}
		} 

	}catch(e)
	{
		return {
			body: {
				user : {},
				message : 'Error al intentar conectar con la DB'
			}
		} 
	}
}

// function generateAccessToken(user){
// 	return jwt.sign(
// 		user,
// 		process.env.SECRET,
// 		{expiresIN:'5m'}
// 	)
	
// }