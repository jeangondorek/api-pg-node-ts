import { Knex } from 'knex';
import { ETablesNames } from '../ETableNames';


export async function up(knex: Knex) {
	return knex.
		schema.
		createTable(ETablesNames.pessoa, table =>{
			table.bigIncrements('id').primary().index();
			table.string('nome').checkLength('<=', 150).index().notNullable();
			table.string('email').index().unique().notNullable();
			table.bigInteger('cidadeId').index().notNullable().references('id').inTable(ETablesNames.cidade).onUpdate('CASCADE').onDelete('RESTRICT');

			table.comment('tabela usada para armazenar pessoa');
		})
		.then(() => {
			console.log(`# create table ${ETablesNames.pessoa}`);
		});
}


export async function down(knex: Knex) {
	return knex.schema.dropTable(ETablesNames.pessoa).then(() => {
		console.log(`# drop table ${ETablesNames.pessoa}`);
	});
}

