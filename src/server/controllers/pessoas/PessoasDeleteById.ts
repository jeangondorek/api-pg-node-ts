import {Request, Response} from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware/Validation';
import { StatusCodes } from 'http-status-codes';
import { PessoasProvider } from '../../database/providers/pessoas/PessoasIndexProvider';

interface IParamsProps{
	id?: number;
}

export const deleteByIdValidation = validation((getSchema) => ({
	params: getSchema<IParamsProps>(yup.object().shape({
		id: yup.number().integer().required().moreThan(0),
	}))
}));


export const deleteById = async (req: Request<IParamsProps>, res: Response) => {
	
	if(!req.params.id){
		return res.status(StatusCodes.BAD_REQUEST).json({
			errors:{
				default: 'o parametro "id" precisa ser informado'
			}
		});
	}

	const result = await PessoasProvider.deletePessoas(req.params.id);
	if(result instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
		errors:{
			default: result.message
		}
	});

	return res.status(StatusCodes.NO_CONTENT).send('Registro excluído!');
};