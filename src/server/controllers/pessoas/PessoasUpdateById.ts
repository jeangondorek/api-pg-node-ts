import {Request, Response} from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware/Validation';
import { StatusCodes } from 'http-status-codes';
import { IPessoa } from '../../database/models/PessoaModel';
import { PessoasProvider } from '../../database/providers/pessoas/PessoasIndexProvider';

interface IParamsProps{
	id?: number;
}

interface IBodyProps extends Omit<IPessoa, 'id'>{}

export const updateByIdValidation = validation((getSchema) => ({
	params: getSchema<IParamsProps>(yup.object().shape({
		id: yup.number().integer().required().moreThan(0),
	})),
	body: getSchema<IBodyProps>(yup.object().shape({
		nome: yup.string().required().min(3),
		email: yup.string().required().min(3),
		cidadeId: yup.number().required(),
	})),
}));


export const updateById = async (req: Request<IParamsProps, {}, IBodyProps>, res: Response) => {
	if(!req.params.id) return res.status(StatusCodes.BAD_REQUEST).json({
		errors:{
			default: 'Preciso do "id"'
		}
	});
	const result = await PessoasProvider.updatePessoas(req.params.id, req.body);
	if(result instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
		errors:{
			default: result.message
		}
	});
	return res.status(StatusCodes.NO_CONTENT).json(result);
};