'use strict';

const { matchNumber , matchFloatNumber } = require('../lib/util');

class Parser {
    constructor(){
        this.cached = [];
        this.current = {};
        this.source = [];
        this.list = [];
    }
    setCached(cached){
        this.cached = cached;
        return this;
    }
    setCurrent(current){
        this.current = {
            id: current.id,
            list: current.list || []
        };
        return this;
    }
    setCurrentList(list){
        this.current.list = list;
        return this;
    }
    setSource(){
        let idx = this.searchSourceById(this.getCurrent().id);
        if ( idx >= 0 ){
            this.source[idx] = Object.assign({}, this.getCurrent());
        } else if ( this.getCurrent().id ){
            this.source.push(Object.assign({}, this.getCurrent()));
        }
        return this;
    }
    getCurrentList(){
        return this.current.list;
    }
    getValidateList(){
        let cached = this.getCached();
        let list = [];
        for ( let i = 0 ; i < cached.length -1 ; i += 2 ){
            let stockNum = matchNumber(cached[i]);
            let stockPrice = matchFloatNumber(cached[i + 1]);
            if ( !stockNum || !stockPrice ){
                return [];
            }
            list.push({stockNum, stockPrice});
        }
        return list;
    }
    getCurrent(){
        return this.current;
    }
    getCached(){
        return this.cached;
    }
    getSource(){
        return this.source;
    }
    searchSourceById(id){
        if ( !id ){
            return -1;
        }
        for (let i = 0; i < this.getSource.length; i++) {
            if ( this.getSource[i].id === id ){
                return i;
            }
        }
        return -1;
    }
    isCanCheck(){
        let cached = this.getCached();
        return cached.length && (cached.length % 2 === 0) ? true : false;
    }
    checkNumStr(numStr = ''){
        return matchNumber(numStr) || matchFloatNumber(numStr) ? true : false;
    }
    end(){
        return this.setSource().getSource();
    }
    next(id){
        return this.setSource().setCached([]).setCurrent({id});
    }
    parse(numStr = ''){
        numStr = '' + numStr;
        if ( !this.checkNumStr(numStr) ){
            return this.setCached([]);
        }
        this.setCached([].concat(this.getCached(), [numStr]));
        if ( this.isCanCheck() ){
            let list = this.getValidateList();
            if ( list.length && list.length > this.getCurrentList().length ){
                this.setCurrentList(list);
            }
        }
        return this;
    }
}
module.exports = Parser;