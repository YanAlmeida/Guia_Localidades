const translate = require("translate");
translate.engine = "libre";
module.exports = async msg => {
  const text = await translate(msg, "pt");
  return text;
};