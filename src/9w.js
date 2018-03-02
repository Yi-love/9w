'use strict';

const PDFParser = require('pdf2json');
const Parser = require('./parser');

/**
 * [解析pdf]
 * @param  {[type]} pages  [pdf页面]
 * @param  {[type]} parser [价格解析对象]
 * @return {[type]}        [description]
 */
let parsePagesTexts = (pages , parser)=>{
    for ( let i = 0 ; i < pages.length ; i++ ){
        let texts = pages[i].Texts || [];
        parser.next(i);
        for ( let j = 0 ; j < texts.length ; j++ ){
            parser.parse(decodeURIComponent(texts[j].R[0].T));
        }
    }
    return parser.end();
};

/**
 * [处理func句柄]
 * @param  {[type]}   parser   [价格解析对象]
 * @param  {Function} callback [回调]
 * @return {[type]}            [description]
 */
let resolveHandler = (parser , callback)=>{
    return (pdfData)=>{
        let data;
        try{
            data = parsePagesTexts(pdfData.formImage.Pages || [] , parser);
        }catch(err){
            return callback(err);
        }
        return callback(void 0 , data);
    };
}

/**
 * [qw 解析pdf]
 * @param  {[String]}  filePath [文件路径]
 * @param  {Boolean} isFull   [是否输出全部数据，包含空对象]
 * @return {[Promise]}           [description]
 */
function qw(filePath , isFull) {
    const parser =  new Parser(isFull);
    const pdfParser = new PDFParser();
    return new Promise((resolve , reject)=>{
        pdfParser.on("pdfParser_dataError", error => reject(error));
        pdfParser.on("pdfParser_dataReady", resolveHandler(parser , (err , data)=>{
            return err ? reject(err) : resolve(data);
        }));
        pdfParser.loadPDF(filePath);
    });
}

module.exports = (filePath , isFull)=>{
    return qw(filePath , isFull);
}