import { ETablesNames } from '../../ETableNames';
import { Knex } from '../../knex/KnexIndex';
import { ICidade } from '../../models/CidadeModel';

export const createCidades = async (cidade: Omit<ICidade, 'id'>): Promise<number|Error> => {
	try {
		const[result] = await Knex(ETablesNames.cidade).insert(cidade).returning('id');

		if(typeof result === 'object'){
			return result.id;
		}else if(typeof result === 'number'){
			return result;
		}
            
		return new Error('Erro ao realizar cadastro da cidade');

	} catch (error) {
		return new Error('Erro no cadastro da cidade');
	}
};