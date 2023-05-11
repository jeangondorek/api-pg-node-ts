import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cidades - Get All', () => {

	it('Get all registers', async ()=> {

		const res1 = await testServer
			.get('/cidades');

		expect(res1.statusCode).toEqual(StatusCodes.OK);
		expect(typeof res1.body).toEqual('object');
	});
});

