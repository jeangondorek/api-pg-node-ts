import { ETablesNames } from '../../ETableNames';
import { Knex } from '../../knex/KnexIndex';
import { IUsuario } from '../../models/UsuarioModel';

export const getByEmailUsuarios = async (email: string): Promise<IUsuario|Error> => {
	try {
		const result = await Knex(ETablesNames.usuario).select('*').where('email', '=', email).first();

		if(result) return result;
            
		return new Error('cadastro da usuario não encontrado');

	} catch (error) {
		return new Error('Erro ao buscar cadastro da usuario');
	}
};