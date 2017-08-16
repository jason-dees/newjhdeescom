import $ from 'jquery';

 var ImageUI = function(parent,editor){
	var self = this;
	this.parent = $(parent);
	this.editor = editor;
	this.toolbar = $('<div/>');
	var fileButton = self.AddButton('glyphicon-upload');
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
	var fileInput = this.fileInput[0];
	this.parent.append(this.toolbar);
	this.fileInput.on('change',function(e){
		var reader = new FileReader();
		reader.onload = function(event){
			editor.LoadFile(event.target.result);
		}
		reader.readAsDataURL(self.fileInput[0].files[0]); 
	});
    this.colorPick.on('click',this.ClickColorPicker.bind(self));
	this.penButton.on('click',this.ActivatePen.bind(self));
	this.CurrentColor = "black";
 }
ImageUI.prototype ={
	get CurrentColor(){
		return this.currentColor.css('backgroundColor');
	},
	set CurrentColor(val){
		this.currentColor.css('backgroundColor', val);
	}
}
ImageUI.prototype.ClearListeners = function(){
	this.editor.canvas.off();
	return this;
}
ImageUI.prototype.CanvasChange = function(){
	this.SetFileDownload();
}
ImageUI.prototype.SetFileDownload = function(){
	var dataUrl = this.editor.DataUrl;
	this.downloadButton.attr({'download':dataUrl, 'href': dataUrl});
}
ImageUI.prototype.Undo = function(){
	this.editor.Undo();
}
ImageUI.prototype.Redo = function(){
	this.editor.Redo();
}
ImageUI.prototype.ClickColorPicker = function(e){
    var self = this;
	var editor = this.editor;
    var colorPreview = $('<div class="color-preview"/>');
    editor.canvas.css('cursor','crosshair');
    this.parent.append(colorPreview);
	this.ClearListeners();
    editor.canvas.on('click',function(e){
        editor.selectedColor= editor.GetColorStringAtMouse(e);
		self.CurrentColor = editor.selectedColor;
		self.ClearListeners();
        colorPreview.remove();
    }).on('mouseover',function(e){
        colorPreview.show();
    }).on('mousemove',function(e){
        var hoverColor= colorPreview.css('backgroundColor', editor.GetColorStringAtMouse(e))
            .offset({top: e.pageY-colorPreview.height()-5,left:e.pageX+5});

    }).on('mouseleave', function(e){
        colorPreview.hide();
    });
}
ImageUI.prototype.ActivatePen = function(e){
	var editor = this.editor;
	var self = this;
	this.ClearListeners();
	var mouseIsDown = false;
	var shiftKey = false;
	var x1, y1;
	var drawLine = function(em){
		editor.DrawLine(x1, y1, em.offsetX, em.offsetY);
		x1 = em.offsetX, y1 = em.offsetY;
	}
	editor.canvas.on('mousedown',function(e){
		mouseIsDown = true;
		x1= e.offsetX, y1= e.offsetY;
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
}
ImageUI.prototype.AddButton = function(icon){
 	var btn = $('<a class="btn btn-default" type="button"/>');
	if(icon.indexOf('glyph')>-1){
		btn.append('<span class="glyphicon '+icon+'"></span>');
	}
	else{
		btn.append('<span class="glyphicon">' + icon + '</span>');
	}
	this.toolbar.append(btn);
	return btn;
 }

 export default ImageUI;