import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import * as yup from 'yup';

interface ICidade{
	nome: string;
	estado: string;
}

const bodyValidation: yup.Schema<ICidade> = yup.object().shape({
	nome: yup.string().required().min(3),
	estado: yup.string().required().min(3),
});

export const create = async (req: Request<{},{},ICidade>, res: Response) => {
	let validatedData: ICidade | undefined=undefined;
	try {
		validatedData = await bodyValidation.validate(req.body, { abortEarly: false });
	} catch (err) {
		const yupError = err as yup.ValidationError;
		const error: Record<string,string> = {};

		yupError.inner.forEach(err => {
			if (err.path === undefined) return;
			error[err.path] = err.message;
		});

		return res.status(StatusCodes.BAD_REQUEST).json(
			{
				errors: error,
			}
		);
	}
	return res.send('Create!'+ validatedData);
};