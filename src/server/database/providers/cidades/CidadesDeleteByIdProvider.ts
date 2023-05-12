import { ETablesNames } from '../../ETableNames';
import { Knex } from '../../knex/KnexIndex';

export const deleteCidades = async (id: number): Promise<void|Error> => {
	try {
		const result = await Knex(ETablesNames.cidade).where('id', '=', id).del();

		if(result > 0) return;
            
		return new Error(' cadastro da cidade não encontrado');

	} catch (error) {
		return new Error('Erro ao deletar cadastro da cidade');
	}
};