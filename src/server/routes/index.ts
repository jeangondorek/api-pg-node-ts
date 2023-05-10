import { Router } from 'express';
import {StatusCodes} from 'http-status-codes';

const router = Router();

router.get('/', (req, res)=>{
	return res.send('hi get');
});

router.get('/:id', (req, res)=>{
	return res.send(req.params);
});

router.post('/', (req, res)=>{
	return res.status(StatusCodes.FORBIDDEN).json(req.body);
});

router.put('/', (req, res)=>{
	return res.json(req.body);
});

router.delete('/', (req, res)=>{
	return res.send('x delete');
});

export {router};