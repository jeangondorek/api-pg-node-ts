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

	let accessToken = '';
	beforeAll(async () => {
		const email = 'create-pessoa@gmail.com';
		await testServer.post('/cadastrar').send({
			nome: 'teste', email, senha: '1234567'
		});
		const singInRes = await testServer.post('/entrar').send({email, senha: '1234567'});

		accessToken = singInRes.body.accessToken;
	});
	
	let cidadeId: number | undefined = undefined;
	beforeAll(async ()=>{
		const resCidade = await testServer.post('/cidades').set({Authorization: `Bearer ${accessToken}`}).send({nome: 'teste'});

		cidadeId = resCidade.body;
	});
	
	it('Get all registers', async ()=> {
		const res1 = await testServer
			.post('/pessoas').set({Authorization: `Bearer ${accessToken}`})
			.send({ nome: 'Pedro', email: 'jsose', cidadeId});

		expect(res1.statusCode).toEqual(StatusCodes.CREATED);

		const res2 = await testServer
			.get('/pessoas').set({Authorization: `Bearer ${accessToken}`}).send();

			
		expect(Number(res2.header['x-total-count'])).toBeGreaterThan(0);
		expect(res2.statusCode).toEqual(StatusCodes.OK);
		expect(typeof res2.body).toEqual('object');
		expect(res2.body.length).toBeGreaterThan(0);
	});
});

