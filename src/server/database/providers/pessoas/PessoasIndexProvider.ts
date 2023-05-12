import * as createPessoas from './PessoasCreateProvider';
import * as getAllPessoas from './PessoasGetAllProvider';
import * as getByIdPessoas from './PessoasGetByIdProvider';
import * as updateByIdPessoas from './PessoasUpdateByIdProvider';
import * as deleteByIdPessoas from './PessoasDeleteByIdProvider';
import * as count from './PessoasCount';

export const PessoasProvider = {
	...createPessoas,
	...getAllPessoas,
	...getByIdPessoas,
	...updateByIdPessoas,
	...deleteByIdPessoas,
	...count,
};