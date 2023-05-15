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

describe('Pessoas - Get All', () => {
	let cidadeId: number | undefined = undefined;
	beforeAll(async ()=>{
		const resCidade = await testServer.post('/cidades').send({nome: 'teste'});

		cidadeId = resCidade.body;
	});
	
	it('Get all registers', async ()=> {
		const res1 = await testServer
			.post('/pessoas')
			.send({ nome: 'Pedro', email: 'jsose', cidadeId});

		expect(res1.statusCode).toEqual(StatusCodes.CREATED);

		const res2 = await testServer
			.get('/pessoas').send();

			
		expect(Number(res2.header['x-total-count'])).toBeGreaterThan(0);
		expect(res2.statusCode).toEqual(StatusCodes.OK);
		expect(typeof res2.body).toEqual('object');
		expect(res2.body.length).toBeGreaterThan(0);
	});
});

