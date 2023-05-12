import {Request, Response} from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware/Validation';
import { StatusCodes } from 'http-status-codes';
import { IPessoa } from '../../database/models/PessoaModel';
import { PessoasProvider } from '../../database/providers/pessoas/PessoasIndexProvider';

interface IBodyProps extends Omit<IPessoa, 'id'>{}

export const createValidation = validation((getSchema) => ({
	body: getSchema<IBodyProps>(yup.object().shape({
		nome: yup.string().required(),
		email: yup.string().required(),
		cidadeId: yup.integer().required(),
	}))
}));


export const create = async (req: Request<{},{},IBodyProps>, res: Response) => {
	const result = await PessoasProvider.createPessoas(req.body);
	if(result instanceof Error){
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			errors: {
				default: result.message
			}
		});
	}

	return res.status(StatusCodes.CREATED).json(result);
};