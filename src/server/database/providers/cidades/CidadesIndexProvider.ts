import * as createCidades from './CidadesCreateProvider';
import * as getAllCidades from './CidadesGetAllProvider';
import * as getByIdCidades from './CidadesGetByIdProvider';
import * as updateByIdCidades from './CidadesUpdateByIdProvider';
import * as deleteByIdCidades from './CidadesDeleteByIdProvider';

export const CidadesProvider = {
	...createCidades,
	...getAllCidades,
	...getByIdCidades,
	...updateByIdCidades,
	...deleteByIdCidades,
};