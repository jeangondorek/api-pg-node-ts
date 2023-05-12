import { ETablesNames } from '../../ETableNames';
import { Knex } from '../../knex/KnexIndex';
import { IPessoa } from '../../models/PessoaModel';

export const createPessoas = async (pessoa: Omit<IPessoa, 'id'>): Promise<number|Error> => {
	try {

		const [{count}] = await Knex(ETablesNames.cidade).where('id', '=', pessoa.cidadeId).count<[{count:number}]>('* as count');

		if (count === 0){
			return new Error('A cidade usada no cadastro não foi encontrada');
		}

		const[result] = await Knex(ETablesNames.pessoa).insert(pessoa).returning('id');

		if(typeof result === 'object'){
			return result.id;
		}else if(typeof result === 'number'){
			return result;
		}
            
		return new Error('Erro ao realizar cadastro da pessoa');

	} catch (error) {
		return new Error('Erro no cadastro da pessoa');
	}
};