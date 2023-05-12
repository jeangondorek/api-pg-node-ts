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

describe('Pessoas - Update', () => {

	it('Atualiza registro', async ()=> {

		const res2 = await testServer
			.post('/pessoas')
			.send({ nome: 'Pedro', email: 'jsose', cidadeId: 1});

		expect(res2.statusCode).toEqual(StatusCodes.CREATED);

		const res1 = await testServer
			.put(`/pessoas/${res2.body}`).send({ nome: 'Pedro', email: 'jsose', cidadeId: 1});

		expect(res1.statusCode).toEqual(StatusCodes.NO_CONTENT);
		expect(typeof res1.body).toEqual('object');
	});

	it('Tenta atualizar registro com nome muito curto', async ()=> {

		const res2 = await testServer
			.post('/pessoas')
			.send({ nome: 'Pedro', email: 'jsose', cidadeId: 1});

		expect(res2.statusCode).toEqual(StatusCodes.CREATED);

		const res1 = await testServer
			.put(`/pessoas/${res2.body}`).send({ nome: 'Ca'});

		expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
		expect(res1.body).toHaveProperty('errors.body.nome');
	});
	it('Tenta atualizar registro que não existe', async ()=> {

		const res1 = await testServer
			.put('/pessoas/99999999')
			.send({ nome: 'Pedro', email: 'jsose', cidadeId: 1});

		expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
		expect(res1.body).toHaveProperty('errors.default');
	});
});

