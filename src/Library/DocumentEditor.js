var DocumentEditor= function(containerId){
	this.timeout = null;
	this.beforeWords = '';
	this.lastTyped = now().valueOf();
	this.container = $(containerId);
	this.Id = -1;
	this.IdInput = null;
	this.NewButton = null;
	this.checkSeconds = 1;
}
DocumentEditor.prototype.setIdInput = function(input){
	var me = this;
	this.IdInput = $(input);
	this.IdInput.change(function(){me.startWords(input)});
	this.IdInput.change();
}
DocumentEditor.prototype.setNewButton = function(btn){
	var me = this;
	this.NewButton = $(btn);
	$(btn).click(function(){
		me.newWords();
	});
}
DocumentEditor.prototype.send = function(action,data,doneFn){
	if(data == null){data = {};}
	var finalFn = function(){
		if(doneFn){
			doneFn.apply(DocumentEditor.arguments);
		}
	}
	$.post('/DocumentEditor.' + action,data, finalFn,"json");
}
DocumentEditor.prototype.write = function(getEvent){
	//It deletes last
	var typedWords = this.current();
	var afterWords = getEvent.docWords + "";//This is the Real DocumentEditor.ment
	var beforeWords = getEvent.prevWords + "";//This is before the Real DocumentEditor.ment
	if(typedWords == afterWords){return;}//Nothing changed;
	var before = diffString(beforeWords, afterWords); //what happened
	var end = diffString(afterWords,typedWords); //Comparing current to typed;
	var diff = diffString(this.beforeWords, typedWords);//Since last update on client
	var finished = "";
	if(beforeWords == typedWords){ 
		if(this.beforeWords == afterWords){
			return this.sendUpdate(beforeWords); 
		}
		else{
			return this.current(afterWords); 
		}
	}
	for(var i=0; i<end.all.length; i++){
		var word = end.all[i].str;
		var isDel = _.indexOf(end.del,word)>-1;
		var isIns = _.indexOf(before.ins,word)>-1 || _.indexOf(diff.ins.word)>-1;
		var isBDel = _.indexOf(diff.del,word)>-1;
		if(end.all[i].action>-1 || (isDel && isIns && !isBDel)){
			//I need to add words that are both in deleted by end and added by before
			finished += word;
		}
	}
	if(lastCharacter(typedWords) == " "  && lastCharacter(finished) != " "){
		finished += " ";
	}
	this.sendUpdate(finished);
}
DocumentEditor.prototype.sendUpdate = function(words){
	this.sendWords(words);
	this.beforeWords = words;
	return this.current(words);
}
DocumentEditor.prototype.newWords = function(){
	var me = this;
	var doneFn = function(e){
		me.current(e);
		me.IdInput.val(e.docId).change();
		me.current(e.docWords);
		me.Id = e.docId;
		me.getWordsTimeout();
	};
	var data = {words:'A thing',docId: -1};
	this.send('newWords',data,doneFn);
}
DocumentEditor.prototype.startWords = function(input){
	clearTimeout(this.timeout);
	this.Id = $(input).val();
	if(this.Id != null && this.Id != ''){
		this.getWords(true);
	}
}
DocumentEditor.prototype.getWords = function(isStart){
	var me = this;
	this.send('getWords', {docId: this.Id},function(e){
		if(isStart){
			me.current(e.docWords);
		}
		else{
			me.write(e);		
		}
		me.getWordsTimeout();
	});
}
DocumentEditor.prototype.getWordsTimeout = function(){
	var me = this;
	this.timeout = setTimeout(function(){
		me.getWords(false);
	},this.checkSeconds*1000);
}
DocumentEditor.prototype.sendContainerWords = function(){
	this.sendWords(this.current());
}
DocumentEditor.prototype.sendWords = function(words){
	var data = {docId: this.Id, words: words};
	this.send('sendWords',data,function(){});
}
DocumentEditor.prototype.current = function(value){
	if(value){
		this.container.val(value);
	}
	return this.container.val();
}

export default DocumentEditor;