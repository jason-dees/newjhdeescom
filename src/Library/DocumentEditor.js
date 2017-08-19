import $ from 'jquery';
import _ from 'underscore';

let DocumentEditor = function(containerId){
	this.timeout = null;
	this.beforeWords = '';
    this.lastTyped = now().valueOf();
	this.container = $(containerId);
	this.Id = -1;
	this.IdInput = null;
	this.NewButton = null;
	this.checkSeconds = 1;
};

DocumentEditor.prototype.setIdInput = function(input){
	let me = this;
	this.IdInput = $(input);
	this.IdInput.change(function(){me.startWords(input)});
	this.IdInput.change();
};

DocumentEditor.prototype.setNewButton = function(btn){
	let me = this;
	this.NewButton = $(btn);
	console.log(this.NewButton);
	$(btn).click(function(){
		me.newWords();
	});
};

DocumentEditor.prototype.send = function(action, data, doneFn){
	if(data === null){data = {};}

	let finalFn = function() {
        if (doneFn) {
            doneFn.apply(DocumentEditor.arguments);
        }
    };
	$.post('/Doc/' + action,data, finalFn,"json");
};

DocumentEditor.prototype.write = function(getEvent){
	//It deletes last
	let typedWords = this.current();
	let afterWords = getEvent.docWords + "";//This is the Real DocumentEditor.ment
	let beforeWords = getEvent.prevWords + "";//This is before the Real DocumentEditor.ment
	if(typedWords === afterWords){return;}//Nothing changed;
	let before = diffString(beforeWords, afterWords); //what happened
	let end = diffString(afterWords,typedWords); //Comparing current to typed;
	let diff = diffString(this.beforeWords, typedWords);//Since last update on client
	let finished = "";
	if(beforeWords === typedWords){
		if(this.beforeWords === afterWords){
			return this.sendUpdate(beforeWords); 
		}
		else{
			return this.current(afterWords); 
		}
	}
	for(let i=0; i<end.all.length; i++){
		let word = end.all[i].str;
		let isDel = _.indexOf(end.del,word)>-1;
		let isIns = _.indexOf(before.ins,word)>-1 || _.indexOf(diff.ins.word)>-1;
		let isBDel = _.indexOf(diff.del,word)>-1;
		if(end.all[i].action>-1 || (isDel && isIns && !isBDel)){
			//I need to add words that are both in deleted by end and added by before
			finished += word;
		}
	}
	if(lastCharacter(typedWords) === " "  && lastCharacter(finished) !== " "){
		finished += " ";
	}
	this.sendUpdate(finished);
};

DocumentEditor.prototype.sendUpdate = function(words){
	this.sendWords(words);
	this.beforeWords = words;
	return this.current(words);
};

DocumentEditor.prototype.newWords = function(){
	let me = this;
	let doneFn = function(e){
		me.current(e);
		me.IdInput.val(e.docId).change();
		me.current(e.docWords);
		me.Id = e.docId;
		me.getWordsTimeout();
	};
	let data = {words:'A thing',docId: -1};
	this.send('newWords',data,doneFn);
};

DocumentEditor.prototype.startWords = function(input){
	clearTimeout(this.timeout);
	this.Id = $(input).val();
	if(this.Id !== null && this.Id !== ''){
		this.getWords(true);
	}
};

DocumentEditor.prototype.getWords = function(isStart){
	let me = this;
	this.send('getWords', {docId: this.Id},function(e){
		if(isStart){
			me.current(e.docWords);
		}
		else{
			me.write(e);		
		}
		me.getWordsTimeout();
	});
};

DocumentEditor.prototype.getWordsTimeout = function(){
	let me = this;
	this.timeout = setTimeout(function(){
		me.getWords(false);
	},this.checkSeconds*1000);
};

DocumentEditor.prototype.sendContainerWords = function(){
	this.sendWords(this.current());
};

DocumentEditor.prototype.sendWords = function(words){
	let data = {docId: this.Id, words: words};
	this.send('sendWords',data,function(){});
};

DocumentEditor.prototype.current = function(value){
	if(value){
		this.container.val(value);
	}
	return this.container.val();
};

export default DocumentEditor;

function lastCharacter (str){
    str = str.toString();
    return str.lastCharacter();
}

function now(){
    return new Date();
}
/*
 * Javascript Diff Algorithm
 *  By John Resig (http://ejohn.org/)
 *  Modified by Chu Alan "sprite"
 *
 * Released under the MIT license.
 *
 * More Info:
 *  http://ejohn.org/projects/javascript-diff-algorithm/
 */

function escape(s) {
    let n = s;
    n = n.replace(/&/g, "&amp;");
    n = n.replace(/</g, "&lt;");
    n = n.replace(/>/g, "&gt;");
    n = n.replace(/"/g, "&quot;");

    return n;
}

function diff( o, n ) {
    let ns = {};
    let os = {};

    for ( let i = 0; i < n.length; i++ ) {
        if ( ns[ n[i] ] === null )
            ns[ n[i] ] = { rows: [], o: null };
        ns[ n[i] ].rows.push( i );
    }

    for ( let i = 0; i < o.length; i++ ) {
        if ( os[ o[i] ] === null )
            os[ o[i] ] = { rows: [], n: null };
        os[ o[i] ].rows.push( i );
    }

    for ( let i in ns ) {
        if ( ns[i].rows.length === 1 && typeof(os[i]) !== "undefined" && os[i].rows.length === 1 ) {
            n[ ns[i].rows[0] ] = { text: n[ ns[i].rows[0] ], row: os[i].rows[0] };
            o[ os[i].rows[0] ] = { text: o[ os[i].rows[0] ], row: ns[i].rows[0] };
        }
    }

    for ( let i = 0; i < n.length - 1; i++ ) {
        if ( n[i].text !== null && n[i+1].text === null && n[i].row + 1 < o.length && o[ n[i].row + 1 ].text === null &&
            n[i+1] === o[ n[i].row + 1 ] ) {
            n[i+1] = { text: n[i+1], row: n[i].row + 1 };
            o[n[i].row+1] = { text: o[n[i].row+1], row: i + 1 };
        }
    }

    for ( let i = n.length - 1; i > 0; i-- ) {
        if ( n[i].text !== null && n[i-1].text === null && n[i].row > 0 && o[ n[i].row - 1 ].text === null &&
            n[i-1] === o[ n[i].row - 1 ] ) {
            n[i-1] = { text: n[i-1], row: n[i].row - 1 };
            o[n[i].row-1] = { text: o[n[i].row-1], row: i - 1 };
        }
    }

    return { o: o, n: n };
}

function diffString( o, n ) {
    o = o.replace(/\s+$/, '');
    n = n.replace(/\s+$/, '');

    let out = diff(o === "" ? [] : o.split(/\s+/), n === "" ? [] : n.split(/\s+/) );
    let del = [];
    let fin = [];
    let ins = [];
    let all = [];
    let str = "";

    let oSpace = o.match(/\s+/g);
    if (oSpace === null) {
        oSpace = [""];
    } else {
        oSpace.push("");
    }
    let nSpace = n.match(/\s+/g);
    if (nSpace === null) {
        nSpace = [""];
    } else {
        nSpace.push("");
    }

    if (out.n.length === 0) {
        for (let i = 0; i < out.o.length; i++) {//Del
            str = escape(out.o[i]) + oSpace[i];
            del.push(str);
            all.push({action:-1, str: str});
        }
    } else {
        if (out.n[0].text === null) {
            for (n = 0; n < out.o.length && out.o[n].text === null; n++) { //Del
                str = escape(out.o[n]) + oSpace[n];
                del.push(str);
                all.push({action:-1, str: str});
            }
        }

        for ( let i = 0; i < out.n.length; i++ ) {
            if (out.n[i].text === null) {//Ins
                str = escape(out.n[i]) + nSpace[i];
                fin.push(str);
                ins.push(str);
                all.push({action:1, str: str});
            } else {
                str = out.n[i].text + nSpace[i];
                fin.push(str);
                all.push({action:0,str:str});
                for (n = out.n[i].row + 1; n < out.o.length && out.o[n].text === null; n++ ) {//Del
                    str = escape(out.o[n]) + oSpace[n];
                    del.push(str);
                    all.push({action:-1, str: str});
                }
            }
        }
    }

    return {del:del, fin:fin, ins:ins, all:all};
}
