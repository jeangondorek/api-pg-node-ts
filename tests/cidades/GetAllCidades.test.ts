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

describe('Cidades - Get All', () => {

	it('Get all registers', async ()=> {
		const res1 = await testServer
			.post('/cidades')
			.send({ nome: 'Caxias'});

		expect(res1.statusCode).toEqual(StatusCodes.CREATED);

		const res2 = await testServer
			.get('/cidades').send();

			
		expect(Number(res2.header['x-total-count'])).toBeGreaterThan(0);
		expect(res2.statusCode).toEqual(StatusCodes.OK);
		expect(typeof res2.body).toEqual('object');
		expect(res2.body.length).toBeGreaterThan(0);
	});
});

