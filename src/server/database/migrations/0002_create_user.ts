import { Knex } from 'knex';
import { ETablesNames } from '../ETableNames';


export async function up(knex: Knex) {
	return knex.
		schema.
		createTable(ETablesNames.usuario, table =>{
			table.bigIncrements('id').primary().index();
			table.string('nome').checkLength('>', 3).notNullable();
			table.string('email').checkLength('>', 5).index().unique().notNullable();
			table.string('senha').notNullable().checkLength('>', 6);

			table.comment('tabela usada para armazenar usuário');
		})
		.then(() => {
			console.log(`# create table ${ETablesNames.usuario}`);
		});
}


export async function down(knex: Knex) {
	return knex.schema.dropTable(ETablesNames.usuario).then(() => {
		console.log(`# drop table ${ETablesNames.usuario}`);
	});
}

