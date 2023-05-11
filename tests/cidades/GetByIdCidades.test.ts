import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cidades - Get by Id', () => {

	it('Get by id registro', async ()=> {

		const res1 = await testServer
			.get('/cidades/1');

		expect(res1.statusCode).toEqual(StatusCodes.OK);
		expect(typeof res1.body).toEqual('number');
	});
});

