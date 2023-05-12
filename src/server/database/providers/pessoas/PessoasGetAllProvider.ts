import { ETablesNames } from '../../ETableNames';
import { Knex } from '../../knex/KnexIndex';
import { IPessoa } from '../../models/PessoaModel';

export const getAllPessoas = async (page: number, limit: number, filter: string): Promise<IPessoa[] | Error> => {
	try {
		const result = await Knex(ETablesNames.pessoa)
			.select('*')
			.where('nome', 'like', `%${filter}%`)
			.offset((page-1)*limit)
			.limit(limit);

		return result;

	} catch (error) {
		return new Error('Erro ao buscar lista de cadastro das Pessoas');
	}
};