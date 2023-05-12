import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import { Knex } from '../../src/server/database/knex/KnexIndex';

beforeAll(async () => {
	await Knex.migrate.latest();
});
  
afterAll(async () => {
	await Knex.destroy();
});

describe('Cidades - Delete', () => {

	it('Delete registro', async ()=> {
		const res2 = await testServer
			.post('/cidades')
			.send({ nome: 'Caxias'});

		expect(res2.statusCode).toEqual(StatusCodes.CREATED);

		const res1 = await testServer
			.delete(`/cidades/${res2.body}`).send();

		expect(res1.statusCode).toEqual(StatusCodes.NO_CONTENT);
	});
	it('Tenta deletar registro não existente', async ()=> {

		const res1 = await testServer
			.delete('/cidades/99999999').send();

		expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
		expect(res1.body).toHaveProperty('errors.default');
	});
});

