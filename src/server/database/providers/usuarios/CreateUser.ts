import { ETablesNames } from '../../ETableNames';
import { Knex } from '../../knex/KnexIndex';
import { IUsuario } from '../../models/UsuarioModel';

export const createUsuarios = async (usuario: Omit<IUsuario, 'id'>): Promise<number|Error> => {
	try {
		const[result] = await Knex(ETablesNames.usuario).insert(usuario).returning('id');

		if(typeof result === 'object'){
			return result.id;
		}else if(typeof result === 'number'){
			return result;
		}
            
		return new Error('Erro ao realizar cadastro da usuario');

	} catch (error) {
		return new Error('Erro no cadastro da usuario');
	}
};