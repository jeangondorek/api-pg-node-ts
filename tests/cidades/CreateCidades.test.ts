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

	let accessToken = '';
	beforeAll(async () => {
		const email = 'create-cidades@gmail.com';
		await testServer.post('/cadastrar').send({
			nome: 'teste', email, senha: '1234567'
		});
		const singInRes = await testServer.post('/entrar').send({email, senha: '1234567'});

		accessToken = singInRes.body.accessToken;
	});
	

	it('Cria registro', async ()=> {

		const res1 = await testServer
			.post('/cidades')
			.set({Authorization: `Bearer ${accessToken}`})
			.send({ nome: 'Caxias'});

		expect(res1.statusCode).toEqual(StatusCodes.CREATED);
		expect(typeof res1.body).toEqual('number');
	});

	it('Tenta criar registro com nome muito curto', async ()=> {

		const res1 = await testServer
			.post('/cidades')
			.set({Authorization: `Bearer ${accessToken}`})
			.send({ nome: 'Ca'});

		expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
		expect(res1.body).toHaveProperty('errors.body.nome');
	});
});

