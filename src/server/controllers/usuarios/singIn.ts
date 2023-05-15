import {Request, Response} from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware/Validation';
import { StatusCodes } from 'http-status-codes';
import { IUsuario } from '../../database/models/UsuarioModel';
import { UserProvider } from '../../database/providers/usuarios/IndexUser';
import { JWTService, PasswordCryto } from '../../shared/services/ServicesIndex';

interface IBodyProps extends Omit<IUsuario, 'id'| 'nome'>{}

export const singInValidation = validation((getSchema) => ({
	body: getSchema<IBodyProps>(yup.object().shape({
		email: yup.string().required().min(5),
		senha: yup.string().required().min(6),
	})),
}));


export const singIn = async (req: Request<{},{},IBodyProps>, res: Response) => {
	const { email, senha } = req.body;

	const result = await UserProvider.getByEmailUsuarios(email);
	if(result instanceof Error){
		return res.status(StatusCodes.UNAUTHORIZED).json({
			errors: {
				default: 'email ou senha erradas'
			}
		});
	}

	const passwordMatch = await PasswordCryto.verifyPassword(senha, result.senha);

	if(!passwordMatch){
		return res.status(StatusCodes.UNAUTHORIZED).json({
			errors: {
				default: 'email ou senha erradas'
			}
		});
	}else{

		const accessToken = JWTService.sign({uid: result.id});
		if ( accessToken === 'JWT_SECRET_NOT_FOUND' ){
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				errors: {
					default: 'erro ao gerar token'
				}
			});
		}
		return res.status(StatusCodes.OK).json({ accessToken });
	}
};