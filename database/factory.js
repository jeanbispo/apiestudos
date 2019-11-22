'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('people', async (faker) => {
  return {
    name: faker.name({ middle: true }),
    email: faker.email({domain: "ezri.com.br"}),
    cpf: Number(faker.cpf().replace(/[^\d]+/g,'')),
    phone: Number(faker.phone({ country: 'uk', mobile: true, formatted: false })),
    cep: 41280630
  }
})
