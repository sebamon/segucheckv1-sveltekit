import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

type user = {
	user_id: number;
	firstName: string;
	lastName: string;
	cuit: string;
	email: string;
	useronles: {
		rol_id: number;
		rolDescription: string;
	};
};

export async function get() {
	console.log('** API USUARIOS - GET **')
	try {
		const users = await prisma.users.findMany({
			where: {},
			select: {
				user_id: true,
				firstName: true,
				lastName: true,
				cuit: true,
				email: true,
				usersonroles: {
					include: {
						roles: true
					}
				}
			}
		});
		if (users.length > 0) {
			return {
				body: {
					users: users,
					status: 'OK',
					message: 'Busqueda de Usuarios Exitosa'
				}
			};
		} else {
			return {
				body: {
					users: {},
					status: 'INFO',
					message: 'No hay usuarios registrados'
				}
			};
		}
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code === 'P2002') {
				console.log(
					'There is a unique constraint violation, a new user cannot be created with this email',
					e
				);
			}
			return {
				body: {
					users: {},
					status: 'ERROR',
					message: 'El Usuario no se pudo crear, email ya existente',
				}
			};
		}
		throw e;
	}
}

export const post = async (request) => {
	console.log('** API USUARIOS - POST **')
	const formBody = JSON.parse(request.body).values;
	console.log('formBody ', formBody)
	let roles = [];
	try {
		if (formBody.roles_assigned['rol1'] === true) {
			roles.push({ rol_id: 1, assignedBy: 1, user_id: 1 });
		}
		if (formBody.roles_assigned['rol2'] === true) {
			roles.push({ rol_id: 2, assignedBy: 1, user_id: 1 });
		}
		if (formBody.roles_assigned['rol3'] === true) {
			roles.push({ rol_id: 3, assignedBy: 1, user_id: 1 });
		}
		if(!formBody.profilePic){
			formBody.profilePic = {
				fileName : 'Error',
				fileExtension : 'error'
			}
		}

		console.log('formBody post usuarios', formBody)
		const newUser = await prisma.users.create({
			data: {
				firstName: formBody.firstName,
				lastName: formBody.lastName,
				cuit: formBody.cuit,
				email: formBody.email,
				phone: formBody.phone,
				degree: formBody.degree,
				gender: formBody.gender,
				nationality: formBody.nationality,
				studyLevel: formBody.studyLevel,
				dateOfBirth: new Date(formBody.dateOfBirth),
				profilePic: formBody.profilePic,
				password: '1234'
			}
		});
	  
		const newUserId = newUser.user_id;
		roles.forEach(async (element) => {
			let rolInsert = await prisma.usersonroles.create({
				data: {
					user_id: newUserId,
					rol_id: element.rol_id,
					assignedBy: '1'
				}
			});
			if (element.rol_id == 3) {
				let operator = await prisma.operator.create({
					data: {
						user_id: newUserId,						
					}
				});
			}
		});
		if(newUserId){
			return {
				body: {
					users: newUser,
					status: 'NEW',
					message: 'Usuario creado con éxito',
				}
			}
		}else{
			return {
				body: {
					users: {},
					status: 'INFO',
					message: 'No se pudo crear el usuario',
				}
			}
		}
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			// The .code property can be accessed in a type-safe manner
			if (e.code === 'P2002') {
				console.log(
					'There is a unique constraint violation, a new user cannot be created with this email',
					e
				);
			}
			return {
				body: {
					status: 'ERROR',
					message: 'El usuario no se pudo crear, email ya existente',
					users: e
				}
			};
		}
		throw e;
	}
};
