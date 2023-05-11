import { ICidade } from '../../models/CidadeModel';

declare module 'knex/types/tables'{
    interface Tables{
        cidade: ICidade
        //pessoa: IPessoa
        //usuario: IUsuario
    }
}