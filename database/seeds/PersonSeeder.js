'use strict'

/*
|--------------------------------------------------------------------------
| PersonSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class PersonSeeder {
  async run () {
    await Factory
  .get('people')
  .createMany(2)
  }
}

module.exports = PersonSeeder
