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


describe('Cidades - Create', () => {

	it('Cria registro', async ()=> {

		const res1 = await testServer
			.post('/cadastrar')
			.send({ nome: 'hhhh',
				email: 'hhhh1hh',
				senha: 'hhh@hhh1h'});

		expect(res1.statusCode).toEqual(StatusCodes.CREATED);
		expect(typeof res1.body).toEqual('number');
	});

	it('Tenta criar registro com nome muito curto', async ()=> {

		const res1 = await testServer
			.post('/cadastrar').send({ nome: 'hhh',
				email: 'hhhh',
				senha: 'hhhhhhh'});

		expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
		expect(res1.body).toHaveProperty('errors.body.email');
	});
});

