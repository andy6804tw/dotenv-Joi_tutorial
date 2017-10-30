const Joi =require('joi') ;
// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  ENV_USERNAME: Joi.string().default('jack').max(6), //預設為jack 限制長度最大6
  ENV_PASSWORD: Joi.number().allow(['root','sudo']) //密碼規範數字 例外密碼允許['root'與'sudo']
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}


const config={
  name: envVars.ENV_USERNAME,
  password: envVars.ENV_PASSWORD
}

module.exports =config;
