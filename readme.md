# 9w
no!!!! i don't want say anything.

```js
const path = require('path');
const Jw = require('./index');

Jw(path.resolve(__dirname, './test/demo.pdf')).then((result)=>{
    console.log('result: ' , result);
},(err)=>{
    console.log('err: ' , err);
});
```