import { ETablesNames } from '../../ETableNames';
import { Knex } from '../../knex/KnexIndex';
import { ICidade } from '../../models/CidadeModel';

export const getByIdCidades = async (id: number): Promise<ICidade|Error> => {
	try {
		const result = await Knex(ETablesNames.cidade).select('*').where('id', '=', id).first();

		if(result) return result;
            
		return new Error('cadastro da cidade não encontrado');

	} catch (error) {
		return new Error('Erro ao buscar cadastro da cidade');
	}
};