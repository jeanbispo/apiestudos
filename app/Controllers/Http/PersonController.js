'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */



const Person = use('App/Models/Person');
const { validate } = use('Validator')
const Util = require('./../../Functions/UtilFunctions')


const rules = {
  name: 'required',
  email: 'required|email|unique:people,email',
  cpf: 'required|number|max:11',
  phone: 'required|number',
  cep: 'required|number|min:8|max:8'
}

const rules2 = {
  email: 'email|unique:people,email',
  cpf: 'number|max:11',
  phone: 'number',
  cep: 'number|min:8|max:8'
}

const messages = {
    'email.required': 'Você deve fornecer um endereço de email.',
    'email.email': 'Você deve fornecer um endereço de email válido.',
    'email.unique': 'Este e-mail já está registado.',

    'name.required': 'Você deve fornecer um nome.',

    'cpf.required': 'Você deve fornecer um CPF.',
    'cpf.number': 'CPF deve ser apenas números',
    'cpf.max': 'Numero de CPF maior que o permitido.',
    'cpf.unique': 'Este CPF já está registado.',

    'phone.required': 'Você deve fornecer um telefone.',
    'phone.number': 'Telefone deve ser apenas números.',


    'cep.required': 'Você deve fornecer um cep.',
    'cep.number': 'CEP deve ser apenas números.',
    'cep.min': 'Numero de CEP incompleto.',
    'cep.max': 'Numero de CEP maior que o padrão.',

}

/**
 * Resourceful controller for interacting with people
 */
class PersonController extends Util {
  /**
   * Show a list of all people.
   * GET people
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response }) {
    return await Person.all()
  }

    /**
   * Show a unique person.
   * GET people
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show ({ params, request, response }) {
    const person = await Person.find(params.id);

    if(this.isEmpty(person)) return response.status(404).json({ error: 'Pessoa não encontrada' });
    return person
  }

  /**
   * Create/save a new person.
   * POST people
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {


    const data = this.deepCopy(request.all());
    if( !this.isEmpty(this.removeObjectProperties(data, ['name','email','cpf','phone','cep'])) ){
      return response.status(418).json({ error: 'Requisição com parâmetros inválidos' });
    }



    const validation = await validate(request.all(), rules, messages)

    if (validation.fails()) {
      return response.status(418).json({ error: validation.messages() });
    }
    const person = await Person.create(request.all())
    return response.status(201).json({ 
      error: false,
      person: person
     });
  }


  /**
   * Update person details.
   * PUT or PATCH people/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

    const data = this.deepCopy(request.all());

    if( !this.isEmpty(this.removeObjectProperties(data, ['name','email','cpf','phone','cep'])) ){
      return response.status(418).json({ error: 'Requisição com parâmetros inválidos' });
    }

    const person = await Person.find(params.id);
    if(this.isEmpty(person)) return response.status(404).json({ error: 'Pessoa não encontrada' });


    const validation = await validate(request.all(), rules2, messages)

    if (validation.fails()) {
      return response.status(418).json({ error: validation.messages() });
    }

    person.merge(request.all());


    await person.save();
    return response.status(201).json({ 
      error: false,
      person: person
     });
  }

  /**
   * Delete a person with id.
   * DELETE people/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const person = await Person.find(params.id);

    if(this.isEmpty(person)) return response.status(404).json({ error: 'Pessoa não encontrada' });
    await person.delete()
    return response.status(200).json({ 
      error: false,
      message: `Pessoa ID ${person.id} foi deletada com sucesso`
     });
  }
}

module.exports = PersonController
