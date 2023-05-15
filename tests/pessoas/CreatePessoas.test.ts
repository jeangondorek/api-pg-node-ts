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


describe('Pessoas - Create', () => {

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
	it('Cria registro', async ()=> {

		const res1 = await testServer
			.post('/pessoas').set({Authorization: `Bearer ${accessToken}`})
			.send({ nome: 'Pedro', email: 'jsose', cidadeId});

		expect(res1.statusCode).toEqual(StatusCodes.CREATED);
		expect(typeof res1.body).toEqual('number');
	});

	it('Cria registro duplicado', async ()=> {

		const res1 = await testServer
			.post('/pessoas').set({Authorization: `Bearer ${accessToken}`})
			.send({ nome: 'Pedro', email: 'jsosed', cidadeId});
		expect(res1.statusCode).toEqual(StatusCodes.CREATED);
		expect(typeof res1.body).toEqual('number');

		const res2 = await testServer
			.post('/pessoas').set({Authorization: `Bearer ${accessToken}`})
			.send({ nome: 'Pedro', email: 'jsosed', cidadeId});

		expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
		expect(res2.body).toHaveProperty('errors.default');
	});

	it('Tenta criar registro com nome muito curto', async ()=> {

		const res1 = await testServer
			.post('/pessoas').set({Authorization: `Bearer ${accessToken}`})
			.send({ nome: 'Pe', email: 'jsosedd', cidadeId});

		expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
		expect(res1.body).toHaveProperty('errors.body.nome');
	});
});

