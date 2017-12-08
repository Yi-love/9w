'use strict';

const path = require('path');
const { PdfReader } = require('pdfreader');
const Parser = require('./parser');

/**
 * [qw 解析pdf]
 * @param  {[String]}  filePath [文件路径]
 * @param  {Boolean} isFull   [是否输出全部数据，包含空对象]
 * @return {[Promise]}           [description]
 */
function qw(filePath , isFull) {
    const parser =  new Parser(isFull);
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

module.exports = (filePath , isFull)=>{
    return qw(filePath , isFull);
}