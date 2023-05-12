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

describe('Pessoas - Delete', () => {

	it('Delete registro', async ()=> {
		const res2 = await testServer
			.post('/pessoas')
			.send({ nome: 'Pedro', email: 'jsose', cidadeId: 1});

		expect(res2.statusCode).toEqual(StatusCodes.CREATED);

		const res1 = await testServer
			.delete(`/pessoas/${res2.body}`).send();

		expect(res1.statusCode).toEqual(StatusCodes.NO_CONTENT);
	});
	it('Tenta deletar registro não existente', async ()=> {

		const res1 = await testServer
			.delete('/pessoas/99999999').send();

		expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
		expect(res1.body).toHaveProperty('errors.default');
	});
});

