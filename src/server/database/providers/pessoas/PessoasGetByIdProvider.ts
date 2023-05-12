import { ETablesNames } from '../../ETableNames';
import { Knex } from '../../knex/KnexIndex';
import { IPessoa } from '../../models/PessoaModel';

export const getByIdPessoas = async (id: number): Promise<IPessoa|Error> => {
	try {
		const result = await Knex(ETablesNames.pessoa).select('*').where('id', '=', id).first();

		if(result) return result;
            
		return new Error('cadastro da pessoa não encontrado');

	} catch (error) {
		return new Error('Erro ao buscar cadastro da pessoa');
	}
};