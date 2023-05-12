import { ETablesNames } from '../../ETableNames';
import { Knex } from '../../knex/KnexIndex';
import { ICidade } from '../../models/CidadeModel';

export const updateCidades =  async (id: number, cidade: Omit<ICidade, 'id'>): Promise<void|Error> => {
	try {
		const result = await Knex(ETablesNames.cidade).update(cidade).where('id', '=', id);

		if(result > 0)return;
            
		return new Error('Erro ao atualizar cadastro da cidade');

	} catch (error) {
		return new Error('Erro no atualizar cidade');
	}
};