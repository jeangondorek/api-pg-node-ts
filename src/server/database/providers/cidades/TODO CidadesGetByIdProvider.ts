import { ETablesNames } from '../../ETableNames';
import { Knex } from '../../knex/KnexIndex';
import { ICidade } from '../../models/CidadeModel';

export const create = async (cidade: Omit<ICidade, 'id'>): Promise<number|Error> => {
	try {
		const[result] = await Knex(ETablesNames.cidade).insert(cidade).returning('id');

		if(typeof result === 'object'){
			return result.id;
		}else if(typeof result === 'number'){
			return result;
		}
            
		return new Error('Erro ao realizar cadastro na cidade');

	} catch (error) {
		return new Error('Erro ao realizar cadastro na cidade');
	}
};