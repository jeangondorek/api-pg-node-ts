import { Knex } from 'knex';
import { ETablesNames } from '../ETableNames';


export async function up(knex: Knex) {
	return knex.
		schema.
		createTable(ETablesNames.cidade, table =>{
			table.bigIncrements('id').primary().index();
			table.string('nome', 150).index().notNullable();

			table.comment('tabela usada para armazenar cidades');
		})
		.then(() => {
			console.log(`# create table ${ETablesNames.cidade}`);
		});
}


export async function down(knex: Knex) {
	return knex.schema.dropTable(ETablesNames.cidade).then(() => {
		console.log(`# drop table ${ETablesNames.cidade}`);
	});
}

