'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PersonSchema extends Schema {
  up () {
    this.create('people', (table) => {
      table.increments()
      table.string('name', 254).notNullable()
      table.string('email', 254).notNullable().unique()
      table.bigInteger('cpf').notNullable().unique()
      table.bigInteger('phone').notNullable()
      table.integer('cep', 8).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('people')
  }
}

module.exports = PersonSchema
