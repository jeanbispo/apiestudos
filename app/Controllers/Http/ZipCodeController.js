'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with zipcodes
 */

const Util = require('./../../Functions/UtilFunctions')

class ZipCodeController extends Util {
  /**
   * Show a list of all zipcodes.
   * GET zipcodes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ params, request, response, view }) {
    response.json(params.zipcode)
    let cep = params.zipcode;
    if(cep){
      try {
        let data = await this.httpGet(`https://viacep.com.br/ws/${cep}/json/`);
        let res = this.deepCopy(data);
        if(!this.isJson(data)){
          throw data
        } else if(res.erro == true){
          throw "Cep não encontrado"
        }
        response.json(JSON.parse(data));
      } catch (error) {
        response.json({ error: error });
      }
    }
    else {
      response.json('CEP não Informado')
    }

  }
}

module.exports = ZipCodeController
