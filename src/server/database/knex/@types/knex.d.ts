import { IUsuario, IPessoa, ICidade } from '../../models/IndexModels';

declare module 'knex/types/tables'{
    interface Tables{
        cidade: ICidade
        pessoa: IPessoa
        usuario: IUsuario
    }
}