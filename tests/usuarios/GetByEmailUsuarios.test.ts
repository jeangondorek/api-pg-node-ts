import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import { Knex } from '../../src/server/database/knex/KnexIndex';

beforeAll(async () => {
	await Knex.migrate.latest();
	await Knex.seed.run();
});
  
afterAll(async () => {
	await Knex.destroy();
});

describe('Usuarios - Get by email', () => {

	it('Get by email registro', async ()=> {

		const res2 = await testServer
			.post('/cadastrar').send({ nome: 'hhhh',
				email: 'hhhhhh2',
				senha: 'hhhhhhh'});

		expect(res2.statusCode).toEqual(StatusCodes.CREATED);

		const res1 = await testServer
			.post('/entrar').send({ email: 'hhhhhh2',
				senha: 'hhhhhhh'});

		expect(res1.statusCode).toEqual(StatusCodes.OK);
		expect(res1.body).toHaveProperty('accessToken');
	});

	it('Get by email de registro que não existe', async ()=> {

		const res2 = await testServer
			.post('/cadastrar').send({ nome: 'hhhh',
				email: 'hhhhhh33',
				senha: 'hhhhhhh33'});

		expect(res2.statusCode).toEqual(StatusCodes.CREATED);

		const res1 = await testServer
			.post('/entrar').send({ email: 'hhhhhh33',
				senha: 'hhhhhhh233'});

		expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
		expect(res1.body).toHaveProperty('errors.default');
	});
});

