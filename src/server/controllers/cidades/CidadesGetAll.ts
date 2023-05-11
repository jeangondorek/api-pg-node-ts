import {Request, Response} from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware/Validation';
import { StatusCodes } from 'http-status-codes';

interface IQueryProps{
	page?: number;
	limit?: number;
	filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
	query: getSchema<IQueryProps>(yup.object().shape({
		page: yup.number().moreThan(0),
		limit: yup.number().moreThan(0),
		filter: yup.string(),
	}))
}));


export const getAll = async (req: Request<{},{},{}, IQueryProps>, res: Response) => {
	return res.status(StatusCodes.OK).json([{'nome': 'sas'},{'nome': 'sas'}]);
};