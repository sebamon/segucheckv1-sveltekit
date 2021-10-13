import { writable } from 'svelte/store';
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params }) {
	// the `slug` parameter is available because this file
	// is called [slug].json.js
	const { slug } = params;

	const user = await prisma.users.findUnique(
		{
			where: {
				user_id: Number(slug)
												}
		})

	if (user) {
		return {
			body: {
				user
			}
		};
	}
}