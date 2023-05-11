import {Request, Response} from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware/Validation';
import { StatusCodes } from 'http-status-codes';

interface IParamsProps{
	id?: number;
}

export const deleteByIdValidation = validation((getSchema) => ({
	params: getSchema<IParamsProps>(yup.object().shape({
		id: yup.number().integer().required().moreThan(0),
	}))
}));


export const deleteById = async (req: Request<IParamsProps>, res: Response) => {
	return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('NOT IMPLEMENTED!');
};