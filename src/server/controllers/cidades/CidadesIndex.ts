import * as create from './CidadesCreate';
import * as getAll from './CidadesGetAll';
import * as getById from './CidadesGetById';
import * as updateById from './CidadesUpdateById';
import * as deleteById from './CidadesDeleteById';

export const CidadesController = {
	...create,
	...getAll,
	...getById,
	...updateById,
	...deleteById,
};