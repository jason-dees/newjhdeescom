import $ from 'jquery';
import _ from 'underscore';

let DocumentEditor = function(){
	this.timeout = null;
	this.beforeWords = '';
    this.lastTyped = now().valueOf();
	this.Id = -1;
    this.checkSeconds = 1;
    this.currentWords = '';
};

let fakeString = "fake network call";

DocumentEditor.prototype.setId = function(id){
    this.Id = id;
    if(id === null || id === '' || id === undefined){
        return;
    }
    if(isNaN(id)){
        this.current("That's not a valid number...");
    }
	this.startWords();
}

DocumentEditor.prototype.send = function(action, data, doneFn){
	if(data === null){data = {};}

	let finalFn = function() {
        if (doneFn) {
            doneFn.apply(DocumentEditor, arguments);
        }
    };
    
    return $.post('/Doc/?action=' + action, data, finalFn, "json")
        .fail(() => console.log(arguments));
};

DocumentEditor.prototype.write = function(getEvent){
	//It deletes last
	let typedWords = this.currentWords;
	let afterWords = getEvent.docWords + "";//This is the Real DocumentEditor.ment
	let beforeWords = getEvent.prevWords + "";//This is before the Real DocumentEditor.ment

	if(typedWords === afterWords){ return; }//Nothing changed;

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
        me.current(e.docWords);
        window.location.hash = '#/doc/'+e.docId;
		me.Id = e.docId;
		me.getWordsTimeout();
	};
	let data = {words:'A thing',docId: -1};
    this.send('newWords',data,doneFn);
};

DocumentEditor.prototype.startWords = function(){
	clearTimeout(this.timeout);
    window.location.hash = '#/doc/'+this.Id;

	if(this.Id !== null && this.Id !== ''){
		this.getWords(true);
	}
};

DocumentEditor.prototype.getWords = function(isStart){
	let me = this;
	//this.send('getWords', {docId: this.Id},function(e){
		if(isStart){
            //me.current(e.docWords);
            me.current(fakeString);
		}
		else{
            //me.write(e);
            me.write({docWords:me.current()});
		}
		me.getWordsTimeout();
	//});
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
    fakeString = words;
	//this.send('sendWords',data,function(){});
};

DocumentEditor.prototype.current = function(value){
	if(value){
        this.currentWords = value;
	}
    return this.currentWords;
};

export default DocumentEditor;

function lastCharacter (str){
    str = str.toString();
    return str.slice(str.length-1);
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
    var n = s;
    n = n.replace(/&/g, "&amp;");
    n = n.replace(/</g, "&lt;");
    n = n.replace(/>/g, "&gt;");
    n = n.replace(/"/g, "&quot;");

    return n;
}

function diff( o, n ) {
    var ns = new Object();
    var os = new Object();

    for ( var i = 0; i < n.length; i++ ) {
        if ( ns[ n[i] ] == null )
            ns[ n[i] ] = { rows: new Array(), o: null };
        ns[ n[i] ].rows.push( i );
    }

    for ( var i = 0; i < o.length; i++ ) {
        if ( os[ o[i] ] == null )
            os[ o[i] ] = { rows: new Array(), n: null };
        os[ o[i] ].rows.push( i );
    }

    for ( var i in ns ) {
        if ( ns[i].rows.length == 1 && typeof(os[i]) !== "undefined" && os[i].rows.length == 1 ) {
            n[ ns[i].rows[0] ] = { text: n[ ns[i].rows[0] ], row: os[i].rows[0] };
            o[ os[i].rows[0] ] = { text: o[ os[i].rows[0] ], row: ns[i].rows[0] };
        }
    }

    for ( var i = 0; i < n.length - 1; i++ ) {
        if ( n[i].text !== null && n[i+1].text == null && n[i].row + 1 < o.length && o[ n[i].row + 1 ].text == null &&
            n[i+1] == o[ n[i].row + 1 ] ) {
            n[i+1] = { text: n[i+1], row: n[i].row + 1 };
            o[n[i].row+1] = { text: o[n[i].row+1], row: i + 1 };
        }
    }

    for ( var i = n.length - 1; i > 0; i-- ) {
        if ( n[i].text !== null && n[i-1].text == null && n[i].row > 0 && o[ n[i].row - 1 ].text == null &&
            n[i-1] == o[ n[i].row - 1 ] ) {
            n[i-1] = { text: n[i-1], row: n[i].row - 1 };
            o[n[i].row-1] = { text: o[n[i].row-1], row: i - 1 };
        }
    }

    return { o: o, n: n };
}

function diffString( o, n ) {
    o = o.replace(/\s+$/, '');
    n = n.replace(/\s+$/, '');

    var out = diff(o == "" ? [] : o.split(/\s+/), n == "" ? [] : n.split(/\s+/) );
    var del = [];
    var fin = [];
    var ins = [];
    var all = [];
    var str = "";

    var oSpace = o.match(/\s+/g);
    if (oSpace == null) {
        oSpace = [""];
    } else {
        oSpace.push("");
    }
    var nSpace = n.match(/\s+/g);
    if (nSpace == null) {
        nSpace = [""];
    } else {
        nSpace.push("");
    }

    if (out.n.length == 0) {
        for (var i = 0; i < out.o.length; i++) {//Del
            str = escape(out.o[i]) + oSpace[i];
            del.push(str);
            all.push({action:-1, str: str});
        }
    } else {
        if (out.n[0].text == null) {
            for (n = 0; n < out.o.length && out.o[n].text == null; n++) { //Del
                str = escape(out.o[n]) + oSpace[n];
                del.push(str);
                all.push({action:-1, str: str});
            }
        }

        for ( var i = 0; i < out.n.length; i++ ) {
            if (out.n[i].text == null) {//Ins
                str = escape(out.n[i]) + nSpace[i];
                fin.push(str);
                ins.push(str);
                all.push({action:1, str: str});
            } else {
                var pre = "";
                str = out.n[i].text + nSpace[i];
                fin.push(str);
                all.push({action:0,str:str});
                for (n = out.n[i].row + 1; n < out.o.length && out.o[n].text == null; n++ ) {//Del
                    str = escape(out.o[n]) + oSpace[n];
                    del.push(str);
                    all.push({action:-1, str: str});
                }
            }
        }
    }

    return {del:del, fin:fin, ins:ins, all:all};
}

