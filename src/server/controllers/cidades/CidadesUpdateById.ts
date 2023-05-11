import {Request, Response} from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware/Validation';
import { StatusCodes } from 'http-status-codes';
import { ICidade } from '../../database/models/CidadeModel';

interface IParamsProps{
	id?: number;
}

interface IBodyProps extends Omit<ICidade, 'id'>{}

export const updateByIdValidation = validation((getSchema) => ({
	params: getSchema<IParamsProps>(yup.object().shape({
		id: yup.number().integer().required().moreThan(0),
	})),
	body: getSchema<IBodyProps>(yup.object().shape({
		nome: yup.string().required().min(3),
	})),
}));


export const updateById = async (req: Request<IParamsProps, {}, IBodyProps>, res: Response) => {
	if(Number(req.params.id) === 99999999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
		errors:{
			default: 'Registro não encontrado'
		}
	});
	return res.status(StatusCodes.NO_CONTENT).json({
		id: req.params,
		nome: 'Caxias',
	});
};