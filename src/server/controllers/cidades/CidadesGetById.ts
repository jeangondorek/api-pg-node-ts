import {Request, Response} from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware/Validation';
import { StatusCodes } from 'http-status-codes';

interface IParamsProps{
	id?: number;
}

export const getByIdValidation = validation((getSchema) => ({
	params: getSchema<IParamsProps>(yup.object().shape({
		id: yup.number().integer().required().moreThan(0),
	}))
}));


export const getById = async (req: Request<IParamsProps>, res: Response) => {
	return res.status(StatusCodes.OK).json(1);
};