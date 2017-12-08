'use strict';

const { matchNumber , matchFloatNumber } = require('../lib/util');

class Parser {
    constructor(isFull){
        this.cached = [];
        this.current = {};
        this.source = [];
        this.isStart = true;
        this.isFull = !!isFull;
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
        if ( this.getStart() ){
            return this.appendList(list);
        }
        this.current.list[this.getCurrentList().length - 1] = list;
        return this;
    }
    appendList(list){
        this.current.list.push(list);
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
    setStart(start){
        this.isStart = start;
        return this;
    }
    getCurrentList(){
        return this.current.list;
    }
    getCurrent(){
        return this.current;
    }
    getCached(){
        return this.cached;
    }
    getAllSource(){
        return this.source;
    }
    getStart(){
        return this.isStart;
    }
    getSource(){
        let allSource = this.getAllSource();
        let source = [];
        for (let i = 0; i < allSource.length; i++) {
            if ( allSource[i].list.length > 0 ){
                source.push(Object.assign({},allSource[i]));
            }
        }
        return source;
    }
    searchSourceById(id){
        if ( !id ){
            return -1;
        }
        let source = this.getAllSource();
        for (let i = 0; i < source.length; i++) {
            if ( source[i].id === id ){
                return i;
            }
        }
        return -1;
    }
    computedValidateList(){
        let cached = this.getCached();
        let list = [];
        for ( let i = 0 ; i < cached.length -1 ; i += 2 ){
            let x = matchNumber(cached[i]);
            let y = matchFloatNumber(cached[i + 1]);
            if ( !x || !y ){
                return [];
            }
            list.push({x , y});
        }
        return list;
    }
    isCanCheck(){
        let cached = this.getCached();
        return cached.length && (cached.length % 2 === 0) ? true : false;
    }
    checkNumStr(numStr = ''){
        return matchNumber(numStr) || matchFloatNumber(numStr) ? true : false;
    }
    end(){
        this.setSource().setCached([]).setStart(true).setCurrent({id:null});
        return this.isFull ? this.getAllSource() : this.getSource();
    }
    next(id){
        return this.setSource().setCached([]).setStart(true).setCurrent({id});
    }
    parse(numStr = ''){
        numStr = '' + numStr;
        if ( !this.checkNumStr(numStr) ){
            return this.setCached([]).setStart(true);
        }
        this.setCached([].concat(this.getCached(), [numStr]));
        if ( this.isCanCheck() ){
            let list = this.computedValidateList();
            if ( list.length ){
                this.setCurrentList(list);
                this.setStart(false);
            }
        }
        return this;
    }
}
module.exports = Parser;