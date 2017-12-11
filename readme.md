# 9w
no!!!! i don't want say anything.

```js
const path = require('path');
const qw = require('qw');

qw(path.resolve(__dirname, './test/demo.pdf')).then((result)=>{
    console.log('result: ' , result);
},(err)=>{
    console.log('err: ' , err);
});
```