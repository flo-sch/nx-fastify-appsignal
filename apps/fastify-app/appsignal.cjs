const { Appsignal } = require("@appsignal/nodejs");

const name = process.env.APPSIGNAL_APP_NAME || "Fastify App";
const environment = process.env.APPSIGNAL_APP_ENV || "local";

module.exports = new Appsignal({
  active: true,
  environment,
  name,
  pushApiKey: process.env.APPSIGNAL_PUSH_API_KEY,
  revision: process.env.APP_REVISION,
});
