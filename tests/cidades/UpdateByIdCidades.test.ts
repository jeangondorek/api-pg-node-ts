import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cidades - Update', () => {

	it('Atualiza registro', async ()=> {

		const res1 = await testServer
			.put('/cidades/1')
			.send({ nome: 'Caxias'});

		expect(res1.statusCode).toEqual(StatusCodes.CREATED);
		expect(typeof res1.body).toEqual('object');
	});

	it('Tenta atualizar registro com nome muito curto', async ()=> {

		const res1 = await testServer
			.put('/cidades/1')
			.send({ nome: 'Ca'});

		expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
		expect(res1.body).toHaveProperty('errors.body.nome');
	});
});

