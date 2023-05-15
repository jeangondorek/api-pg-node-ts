import * as createUsuarios from './CreateUser';
import * as getByEmailUsuarios from './GetUserByEmail';

export const UserProvider = {
	...createUsuarios,
	...getByEmailUsuarios,
};