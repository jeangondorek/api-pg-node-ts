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
	it('Delete registro', async ()=> {
		const res2 = await testServer
			.post('/pessoas').set({Authorization: `Bearer ${accessToken}`})
			.send({ nome: 'Pedro', email: 'jsose', cidadeId});

		expect(res2.statusCode).toEqual(StatusCodes.CREATED);

		const res1 = await testServer
			.delete(`/pessoas/${res2.body}`).set({Authorization: `Bearer ${accessToken}`}).send();

		expect(res1.statusCode).toEqual(StatusCodes.NO_CONTENT);
	});
	it('Tenta deletar registro não existente', async ()=> {

		const res1 = await testServer
			.delete('/pessoas/99999999').set({Authorization: `Bearer ${accessToken}`}).send();

		expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
		expect(res1.body).toHaveProperty('errors.default');
	});
});

