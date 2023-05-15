import {Request, Response} from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware/Validation';
import { StatusCodes } from 'http-status-codes';
import { IUsuario } from '../../database/models/UsuarioModel';
import { UserProvider } from '../../database/providers/usuarios/IndexUser';

interface IBodyProps extends Omit<IUsuario, 'id'>{}

export const singUpValidation = validation((getSchema) => ({
	body: getSchema<IBodyProps>(yup.object().shape({
		nome: yup.string().required().min(3),
		email: yup.string().required().min(5),
		senha: yup.string().required().min(6),
	})),
}));


export const singUp = async (req: Request<{},{},IBodyProps>, res: Response) => {
	const result = await UserProvider.createUsuarios(req.body);
	if(result instanceof Error){
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			errors: {
				default: result.message
			}
		});
	}

	return res.status(StatusCodes.CREATED).json(result);
};