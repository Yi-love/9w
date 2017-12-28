# 9w
Parse the stock price file.

```js
const path = require('path');
const qw = require('qw');

qw(path.resolve(__dirname, './test/demo.pdf')).then((result)=>{
    console.log('result: ' , result);
},(err)=>{
    console.log('err: ' , err);
});
```