'use strict';

const path = require('path');
const { PdfReader } = require('pdfreader');
const Parser = require('./parser');

function qw(filePath) {
    const parser =  new Parser();
    const pdfreader = new PdfReader();
    return new Promise((resolve , reject)=>{
        pdfreader.parseFileItems(path.resolve(__dirname , filePath) , (err, item)=>{
            if ( err ){
                return reject(err);
            }
            if ( !item ){
                return resolve(parser.end());
            }else if ( item.page ){
                return parser.next(item.page);
            }else if ( item.text ){
                return parser.parse(item.text);
            }
        });
    });
}

module.exports = (filePath)=>{
    return qw(filePath);
}