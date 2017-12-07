'use strict';
const path = require('path');
const qw = require('../index');

qw(path.resolve(__dirname, 'demo.pdf')).then((result)=>{
    console.log('result: ' , result);
},(err)=>{
    console.log('err: ' , err);
});
