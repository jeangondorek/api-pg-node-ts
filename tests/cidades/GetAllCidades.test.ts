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
	let accessToken = '';
	beforeAll(async () => {
		const email = 'create-cidades@gmail.com';
		await testServer.post('/cadastrar').send({
			nome: 'teste', email, senha: '1234567'
		});
		const singInRes = await testServer.post('/entrar').send({email, senha: '1234567'});

		accessToken = singInRes.body.accessToken;
	});
	it('Get all registers', async ()=> {
		const res1 = await testServer
			.post('/cidades').set({Authorization: `Bearer ${accessToken}`})
			.send({ nome: 'Caxias'});

		expect(res1.statusCode).toEqual(StatusCodes.CREATED);

		const res2 = await testServer
			.get('/cidades').set({Authorization: `Bearer ${accessToken}`}).send();

			
		expect(Number(res2.header['x-total-count'])).toBeGreaterThan(0);
		expect(res2.statusCode).toEqual(StatusCodes.OK);
		expect(typeof res2.body).toEqual('object');
		expect(res2.body.length).toBeGreaterThan(0);
	});
});

