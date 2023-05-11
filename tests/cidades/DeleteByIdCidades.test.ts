import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cidades - Delete', () => {

	it('Delete registro', async ()=> {

		const res1 = await testServer
			.delete('/cidades/1');

		expect(res1.statusCode).toEqual(StatusCodes.ACCEPTED);
	});
});

