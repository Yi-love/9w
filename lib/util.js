'use strict';

/**
 * 获取数值字符串
 * @param {String} numStr 
 */
function getNumberString(numStr = '') {
    return ('' + numStr).replace(/,/g, '').replace(/(\*|\(\d\))/,'').trim();
}
/**
 * [matchMaxSymbol 标记]
 * @param  {String} numStr [description]
 * @return {[type]}        [description]
 */
function matchMaxSymbol(numStr = ''){
  return /^(\*|\(\d\))$/.test(('' + numStr).trim());
}
/**
 * 匹配整数
 * @param {String} numStr
 */
function matchNumber(numStr = '') {
    let number = getNumberString(numStr);
    return /^[1-9]{1}[0-9]*$/.test(number) ? +number : 0;
}
/**
 * 匹配浮点数
 * @param {String} numStr 
 */
function matchFloatNumber(numStr = '') {
    let floatNumber = getNumberString(numStr);
    return /^[0-9]+.[0-9]{1,3}$/.test(floatNumber) || matchNumber(floatNumber) ? +floatNumber : 0;
}

exports.matchNumber = matchNumber;
exports.matchFloatNumber = matchFloatNumber;
exports.matchMaxSymbol = matchMaxSymbol;