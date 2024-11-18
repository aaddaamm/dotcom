import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler() {
	// this function needs to be able to crawl goodreads shelves and import them into the database
	console.log('hello');

	return new Response('Hello world');
}
