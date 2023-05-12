import { ICidade } from '../../models/CidadeModel';
import { IPessoa } from '../../models/PessoaModel';

declare module 'knex/types/tables'{
    interface Tables{
        cidade: ICidade
        pessoa: IPessoa
        //usuario: IUsuario
    }
}