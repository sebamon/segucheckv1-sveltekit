import { respond } from './_respond';
import {PrismaClient} from '@prisma/client'

export const post = async(request) => {
	// console.log('entro al auth.login request:',request)
	// console.log('entro al auth.login request.login:',request.body)
	const prisma = new PrismaClient()
	const credenciales = JSON.parse(request.body)
	const user = await prisma.users.count({
		where: {
			cuit: credenciales.cuit,
			password: credenciales.password,
		}


		})
	// console.log("retorno usuario",user)
	//const response = await fetch();


	return {
		body:{
			user : ''
		}
	}
	// const body = await fetch('users/login', {
	// 	user: {
	// 		cuit: request.body.email,
	// 		password: request.body.password
	// 	}
	// });

	// return respond(body);
}
