# dotenv+joi 教學
- dotenv 是將.env文件中的全域變數加載到process.env。
 - joi 是JavaScript物件的Object schema描述語言和驗證器。
 
簡單來說dotenv是用來設定開發全域變數再拿給config做使用，優點在於把變數設定值儲存在.env中可以防止有心人利用。而joi是搭配dotenv(可用也可不用)他能夠有效的驗證你輸入的設定值是否正確符合規範，規範的內容就是交給joi囉！

例如： 規範ENV_USERNAME最大長度6預設值 jack
```js
ENV_USERNAME: Joi.string().default('jack').max(6),
```
[joi API Reference](https://github.com/hapijs/joi/blob/v13.0.1/API.md#arraymaxlimit)
 ## Usage
1. clone the repository
```
$ git clone https://github.com/andy6804tw/dotenv-joi_tutorial.git
$ cd dotenv-joi_tutorial
```
2. install package
```
$ npm install
```
3. run script
```
$ npm start
```

## 教學

1. 新增 .env 檔案
在這裡面可以設定你要的變數值
```
ENV_PASSWORD='1234'
ENV_USERNAME='andy'
```
2. 新增 config.js 檔
在這裡面完成joi的驗證規範
```js
const Joi =require('joi') ;
// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  ENV_USERNAME: Joi.string().default('jack').max(6), //預設為jack 限制長度最大6
  ENV_PASSWORD: Joi.number().allow(['root','sudo']) //密碼規範數字 例外密碼允許['root'與'sudo']
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

```
3. 在index.js中呼叫數值
```js
const config=require('../config/config.js')

console.log('ENV_NAME: '+config.name)
console.log('ENV_PASSWORD: '+config.password)
```

## MIT License
```
Copyright (c) 2017 Yi Lin Tsai 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
