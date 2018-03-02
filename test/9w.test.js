'use strict';

const fs = require('fs');
const path = require('path');
const qw = require('../index');

fs.writeFileSync(path.resolve(__dirname, 'data.json') , '');

process.on('uncaughtException', function(err) {
    console.error('Error caught in uncaughtException event:', err);
})

qw(path.resolve(__dirname, '01815.pdf') , true).then((result)=>{
    console.log('result write the file data.json: ' , JSON.stringify(result));
    fs.writeFileSync(path.resolve(__dirname, 'data.json') , JSON.stringify(result));
},(err)=>{
    console.log('err: ' , err);
});
