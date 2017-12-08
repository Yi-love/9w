'use strict';

const fs = require('fs');
const path = require('path');
const qw = require('../index');

fs.writeFileSync(path.resolve(__dirname, 'data.json') , '');

qw(path.resolve(__dirname, '02858.pdf') , true).then((result)=>{
    console.log('result write the file data.json: ' , JSON.stringify(result));
    fs.writeFileSync(path.resolve(__dirname, 'data.json') , JSON.stringify(result));
},(err)=>{
    console.log('err: ' , err);
});
