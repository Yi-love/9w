# 9w
Parse the stock price file.

```js
const path = require('path');
const qw = require('@cray/9w');

qw(path.resolve(__dirname, './test/demo.pdf')).then((result)=>{
    console.log('result: ' , result);
},(err)=>{
    console.log('err: ' , err);
});
```