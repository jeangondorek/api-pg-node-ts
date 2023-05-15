import { Router } from 'express';
import { CidadesController, PessoasController, UsuariosController } from './../controllers/ControllersIndex';
import { ensureAuthenticated } from '../shared/middleware/MiddlewaresIndex';

const router = Router();

router.get('/', (req, res)=>{
	return res.send('ONLINE!');
});

router.get('/cidades', ensureAuthenticated, CidadesController.getAllValidation, CidadesController.getAll);
router.post('/cidades', ensureAuthenticated, CidadesController.createValidation, CidadesController.create);
router.get('/cidades/:id', ensureAuthenticated, CidadesController.getByIdValidation, CidadesController.getById);
router.put('/cidades/:id', ensureAuthenticated, CidadesController.updateByIdValidation, CidadesController.updateById);
router.delete('/cidades/:id', ensureAuthenticated, CidadesController.deleteByIdValidation, CidadesController.deleteById);

router.get('/pessoas', ensureAuthenticated, PessoasController.getAllValidation, PessoasController.getAll);
router.post('/pessoas', ensureAuthenticated, PessoasController.createValidation, PessoasController.create);
router.get('/pessoas/:id', ensureAuthenticated, PessoasController.getByIdValidation, PessoasController.getById);
router.put('/pessoas/:id', ensureAuthenticated, PessoasController.updateByIdValidation, PessoasController.updateById);
router.delete('/pessoas/:id', ensureAuthenticated, PessoasController.deleteByIdValidation, PessoasController.deleteById);

router.post('/cadastrar', UsuariosController.singUpValidation, UsuariosController.singUp);
router.post('/entrar', UsuariosController.singInValidation, UsuariosController.singIn);

export {router};