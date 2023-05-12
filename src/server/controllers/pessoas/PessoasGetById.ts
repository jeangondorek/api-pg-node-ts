import {Request, Response} from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware/Validation';
import { StatusCodes } from 'http-status-codes';
import { PessoasProvider } from '../../database/providers/pessoas/PessoasIndexProvider';

interface IParamsProps{
	id?: number;
}

export const getByIdValidation = validation((getSchema) => ({
	params: getSchema<IParamsProps>(yup.object().shape({
		id: yup.number().integer().required().moreThan(0),
	}))
}));


export const getById = async (req: Request<IParamsProps>, res: Response) => {
	if(!req.params.id) return res.status(StatusCodes.BAD_REQUEST).json({
		errors:{
			default: 'Precisa informar "id"'
		}
	});

	const result = await PessoasProvider.getByIdPessoas(req.params.id);
	if(result instanceof Error){
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			errors : {
				default: result.message
			}
		});
	}

	return res.status(StatusCodes.OK).json(result);
};