import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import { Knex } from '../../src/server/database/knex/KnexIndex';

beforeAll(async () => {
	await Knex.migrate.latest();
});
  
afterAll(async () => {
	await Knex.destroy();
});

describe('Cidades - Get by Id', () => {

	it('Get by id registro', async ()=> {

		const res2 = await testServer
			.post('/cidades')
			.send({ nome: 'Caxias'});

		expect(res2.statusCode).toEqual(StatusCodes.CREATED);

		const res1 = await testServer
			.get(`/cidades/${res2.body}`);

		expect(res1.statusCode).toEqual(StatusCodes.OK);
		expect(res1.body).toHaveProperty('nome');
	});

	it('Get by id de registro que não existe', async ()=> {

		const res2 = await testServer
			.post('/cidades')
			.send({ nome: 'Caxias'});

		expect(res2.statusCode).toEqual(StatusCodes.CREATED);

		const res1 = await testServer
			.get('/cidades/99999999').send();

		expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
		expect(res1.body).toHaveProperty('errors.default');
	});
});

