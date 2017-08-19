import $ from 'jquery';

 let ImageUI = function(parent,editor){
	let self = this;
	this.parent = $(parent);
	this.editor = editor;
	this.toolbar = $('<div/>');
	let fileButton = self.AddButton('glyphicon-upload');
	this.fileInput = $('<input class="btn" type="file"/>');
	fileButton.on('click',function(){
		self.changes = [];
		self.redos = [];
		self.SetFileDownload();
		fileInput.click();		
	});
    this.colorPick = self.AddButton('glyphicon-tint');
    this.currentColor = self.AddButton('&nbsp;');
	this.penButton = self.AddButton('pen');
	this.downloadButton = self.AddButton('download');
	this.undoButton = self.AddButton('undo').click(this.Undo.bind(this));
	this.redoButton = self.AddButton('redo').click(this.Redo.bind(this));
	let fileInput = this.fileInput[0];
	this.parent.append(this.toolbar);

	this.fileInput.on('change',function(){
		let reader = new FileReader();
		reader.onload = function(event){
			editor.LoadFile(event.target.result);
		};

		reader.readAsDataURL(self.fileInput[0].files[0]); 
	});
    this.colorPick.on('click',this.ClickColorPicker.bind(self));
	this.penButton.on('click',this.ActivatePen.bind(self));
	this.CurrentColor = "black";
 };

ImageUI.prototype ={
	get CurrentColor(){
		return this.currentColor.css('backgroundColor');
	},
	set CurrentColor(val){
		this.currentColor.css('backgroundColor', val);
	}
};

ImageUI.prototype.ClearListeners = function(){
	this.editor.canvas.off();
	return this;
};

ImageUI.prototype.CanvasChange = function(){
	this.SetFileDownload();
};

ImageUI.prototype.SetFileDownload = function(){
	let dataUrl = this.editor.DataUrl;
	this.downloadButton.attr({'download':dataUrl, 'href': dataUrl});
};

ImageUI.prototype.Undo = function(){
	this.editor.Undo();
};

ImageUI.prototype.Redo = function(){
	this.editor.Redo();
};

ImageUI.prototype.ClickColorPicker = function(){
    let self = this;
	let editor = this.editor;
    let colorPreview = $('<div class="color-preview"/>');
    editor.canvas.css('cursor','crosshair');
    this.parent.append(colorPreview);
	this.ClearListeners();
    editor.canvas.on('click',function(e){
        editor.selectedColor= editor.GetColorStringAtMouse(e);
		self.CurrentColor = editor.selectedColor;
		self.ClearListeners();
        colorPreview.remove();
    }).on('mouseover',function(){
        colorPreview.show();
    }).on('mouseleave', function(){
        colorPreview.hide();
    });
};

ImageUI.prototype.ActivatePen = function(){
	let editor = this.editor;
	let self = this;
	this.ClearListeners();
	let shiftKey = false;
	let x1, y1;
	let drawLine = function(em){
		editor.DrawLine(x1, y1, em.offsetX, em.offsetY);
		x1 = em.offsetX;
		y1 = em.offsetY;
	};

	editor.canvas.on('mousedown',function(e){
		x1= e.offsetX;
		y1= e.offsetY;
		editor.canvas.on('mousemove',function(em){
			shiftKey = em.shiftKey;
			if(!shiftKey){
				drawLine(em);
			}	
		});
	}).on('mouseup',function(e){
		editor.canvas.off('mousemove');
		if(shiftKey){drawLine(e);}
		self.CanvasChange();
	});
};

ImageUI.prototype.AddButton = function(icon){
 	let btn = $('<a class="btn btn-default" type="button"/>');
	if(icon.indexOf('glyph')>-1){
		btn.append('<span class="glyphicon '+icon+'"></span>');
	}
	else{
		btn.append('<span class="glyphicon">' + icon + '</span>');
	}
	this.toolbar.append(btn);
	return btn;
 };

 export default ImageUI;