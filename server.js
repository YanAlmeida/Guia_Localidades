const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require("body-parser");
const c = require('./const');
const parametrosFoursquare = require('./params-foursquare')
const textoRecomendacao = require('./texto-recomendacao')
const traduzir = require('./traduzir')
require('./config-express')(app)

let resposta;
let teste;
let nome_local;
let endereco_local;
let categoria_local;
let coordenadas_local;

const respostaFoursquare = (res, intent) =>
  async function(err, resp, body) {
    if (err) {
      console.error(err);
    } else {
      const jsonBody = JSON.parse(body);
      resposta = jsonBody.response.groups[0].items[0].venue;

      nome_local = resposta.name;
      endereco_local = resposta.location.formattedAddress;
      coordenadas_local = resposta.location.lat + ", " + resposta.location.lng;
      categoria_local = await traduzir(resposta.categories[0].name);

      const objResposta = {
        fulfillmentText: textoRecomendacao({
          nome_local,
          endereco_local,
          categoria_local,
          coordenadas_local,
          cod_texto: intent
        })
      }
      
      console.log(objResposta);
      
      res.json(objResposta);
    }
  };

app.post(c.URL_AULA_PLN, function(req, res) {
  console.log('RECEBIDO', req.body);
  let intentName = req.body.queryResult.intent.displayName;
  switch (intentName) {
    case c.ESCOLHA_INICIAL:
    case c.REPETIR: 
      const {
        cidades: cidade,
        Estados: estado,
        local
      } = req.body.queryResult.parameters;

      request(
        parametrosFoursquare({
          cidade,
          estado,
          local
        }),
        respostaFoursquare(res, intentName)
      );
    break;
  }
});

const listener = app.listen(process.env.PORT, () => {
  console.log(c.APP_LISTENING + listener.address().port);
});
