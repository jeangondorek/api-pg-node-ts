import { Router } from 'express';
import { CidadesController } from './../controllers/ControllersIndex';

const router = Router();

router.get('/', (req, res)=>{
	return res.send('ONLINE!');
});

/*
router.get('/cidades', CidadesController.getAll);
router.get('/cidades/:id', CidadesController.getById);*/

router.post('/cidades', CidadesController.createValidation, CidadesController.create);

/*
router.put('/cidades/:id', CidadesController.updateById);
router.delete('/cidades/:id', CidadesController.deleteById);*/

export {router};