import { respond } from './_respond';
import {PrismaClient} from '@prisma/client'
import * as cookies from 'cookie'
import {v4 as uuidV4} from 'uuid'
import jwt from 'jsonwebtoken'
// import {jwt} from '../../../node_modules/jsonwebtoken'
// var jwt = require('jsonwebtoken')

export const post = async (request) => {
	const prisma = new PrismaClient()
	const credenciales = JSON.parse(request.body)
	console.log('jwt', jwt)
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
		jwt.sign({
			user: user
		},
			'hola'
		)

		// jwt.sign(user)
		console.log('jwt', jwt)
		
		// const accessToken = generateAccessToken(user)
		// request.headers('authorization', accessToken).json({
		// 	message: 'Usuario Autenticado',
		// 	token: accessToken
		// })
		// request.locals.Storage('usd',213)
		if(user){
			const sessionId = uuidV4()
			console.log(sessionId)
			const headers = {
				"set-cookie": cookies.serialize("session_id",sessionId, {
					httpOnly: true,
					sameSite: "lax",
					maxAge: 60 * 60 * 24 *7,
					patch: "/",
					authorization: 'dasdd',
				}),
			}
			return {
				headers,
				body:{
					user:user,
					message : 'Credenciales Exitosas'
				}
			}
		}
		return {
			body: {
				user : {},
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