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

describe('Cidades - Get by Id', () => {
	let accessToken = '';
	beforeAll(async () => {
		const email = 'create-cidades@gmail.com';
		await testServer.post('/cadastrar').send({
			nome: 'teste', email, senha: '1234567'
		});
		const singInRes = await testServer.post('/entrar').send({email, senha: '1234567'});

		accessToken = singInRes.body.accessToken;
	});
	it('Get by id registro', async ()=> {

		const res2 = await testServer
			.post('/cidades').set({Authorization: `Bearer ${accessToken}`})
			.send({ nome: 'Caxias'});

		expect(res2.statusCode).toEqual(StatusCodes.CREATED);

		const res1 = await testServer
			.get(`/cidades/${res2.body}`).set({Authorization: `Bearer ${accessToken}`});

		expect(res1.statusCode).toEqual(StatusCodes.OK);
		expect(res1.body).toHaveProperty('nome');
	});

	it('Get by id de registro que não existe', async ()=> {

		const res2 = await testServer
			.post('/cidades').set({Authorization: `Bearer ${accessToken}`})
			.send({ nome: 'Caxias'});

		expect(res2.statusCode).toEqual(StatusCodes.CREATED);

		const res1 = await testServer
			.get('/cidades/99999999').set({Authorization: `Bearer ${accessToken}`}).send();

		expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
		expect(res1.body).toHaveProperty('errors.default');
	});
});

