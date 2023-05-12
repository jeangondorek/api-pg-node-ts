import { ETablesNames } from '../../ETableNames';
import { Knex } from '../../knex/KnexIndex';
import { IPessoa } from '../../models/PessoaModel';

export const updatePessoas =  async (id: number, pessoa: Omit<IPessoa, 'id'>): Promise<void|Error> => {
	try {
		const result = await Knex(ETablesNames.pessoa).update(pessoa).where('id', '=', id);

		if(result > 0)return;
            
		return new Error('Erro ao atualizar cadastro da pessoa');

	} catch (error) {
		return new Error('Erro no atualizar pessoa');
	}
};