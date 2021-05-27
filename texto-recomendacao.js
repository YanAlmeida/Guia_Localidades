const c = require('./const');
module.exports = ({
  nome_local,
  endereco_local,
  categoria_local,
  coordenadas_local,
  cod_texto
}) => {
  switch (cod_texto) {
    case c.ESCOLHA_INICIAL:
      return (
        "Uma ótima recomendação é o " +
        nome_local +
        ", localizado em " +
        endereco_local +
        ".\nEste local é um(a) " +
        categoria_local +
        ".\nCaso precise, as coordenadas são: " +
        coordenadas_local +
        ".\nDeseja buscar outro tipo de localidade?"
      );
    case c.REPETIR:
      return (
        "Outra recomendação é o " +
        nome_local +
        ", localizado em " +
        endereco_local +
        ".\nEste local é um(a) " +
        categoria_local +
        ".\nCaso precise, as coordenadas são: " +
        coordenadas_local +
        ".\nAlgo mais?"
      );      
  }
};
