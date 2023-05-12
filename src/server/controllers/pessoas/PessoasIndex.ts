import * as create from './PessoasCreate';
import * as getAll from './PessoasGetAll';
import * as getById from './PessoasGetById';
import * as updateById from './PessoasUpdateById';
import * as deleteById from './PessoasDeleteById';

export const PessoasController = {
	...create,
	...getAll,
	...getById,
	...updateById,
	...deleteById,
};