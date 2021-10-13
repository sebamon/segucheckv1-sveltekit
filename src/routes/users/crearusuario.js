import { writable } from 'svelte/store';
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

// run inside `async` function
prisma.users.create({
    data:{
        name: 'Sebastian',
        email: 'seba@hotmail.com',
        lastName: 'Mon',
        cuit: '20343973722',
        gender: 'Masculino',
        dateOfBirth: '09-02-1989',
        nationality: 'Argentino',
        studyLevel: 'Terciario',
        degree: 'Nose que es',
        profilePic: 'url:fotobienpiola',
        password: '1234',
    },
})

export const usuarios =  prisma.users.findMany()


export const user = writable([]);
const userDetail = {};
let loaded = false;


export const fetchUser = async () => {
	if (loaded) return;
	const usuarios =  prisma.users.findMany()
	loaded = true;
};
/*
export const getPokemonById = async (id) => {
	if (pokemonDetails[id]) return pokemonDetails[id];

	try {
		const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
		const res = await fetch(url);
		const data = await res.json();
		pokemonDetails[id] = data;
		return data;
	} catch (err) {
		console.error(err);
		return null;
	}
};

*/
