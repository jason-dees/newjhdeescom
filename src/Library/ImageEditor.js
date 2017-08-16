import ImageUI from './ImageUI.js';
import $ from 'jquery';


var ImageEditor = function(parent){
	var self = this;
	this.UI = new ImageUI(parent,self);
	this.canvas = $('<canvas></canvas>').css({'width':'100%', 'border':'1px solid black'});
    this.canvas.getContext = function(c){
        return self.canvas[0].getContext(c);
    }
	var canvas = this.canvas[0];
	var context = this.canvas.getContext('2d');
	this.__defineGetter__("Context", function(){
        return context;
    });
	this.UI.parent.append(this.canvas);
	this.imageData = new Image();
    this.imageData.onload = function(e){
        var img = self.imageData;
        var canvasHeight = img.height/(img.width/canvasWidth);
        canvas.height = canvasHeight;
        context.drawImage(img,0,0,canvas.width,canvas.height);
    }
	var canvasWidth = this.canvas.width();
	var canvasHeight = this.canvas.height();
	canvas.width = canvasWidth;
    this.selectedColor = '';
	this.changes = [];
	this.redos = [];
}
ImageEditor.prototype ={
	get Width(){
		return this.canvas.width();
	},
	get Height(){
		return this.canvas.height();
	},
	get DataUrl(){
		return this.canvas[0].toDataURL();
	}
}
ImageEditor.prototype.LoadFile = function(imageFile){
	this.LoadFileUrl(imageFile);
}
ImageEditor.prototype.LoadFileUrl = function(url){
    this.imageData.src = url;
	this.changes.push(this.DataUrl);
}
ImageEditor.prototype.Undo = function(){
	if(this.changes.length==0){return;}
	var prev = this.changes.pop();
	this.redos.push({url:this.DataUrl,args:prev.args});	
	this.imageData.src = prev.url;
}
ImageEditor.prototype.Redo = function(){
	if(this.redos.length==0){return;}
	var before = this.redos.pop();
	this.changes.push({url:this.DataUrl,args:before.args});	
	this.imageData.src = before.url;
}
ImageEditor.prototype.DrawLineSelectedColor = function(x1,y1,x2,y2){
	this.DrawLine(x1,y1,x2,y2,this.selectedColor);
}
ImageEditor.prototype.DrawLine = function(x1,y1,x2,y2,color){
	color = color || this.selectedColor;
	this.changes.push({url:this.DataUrl,args:arguments});
	this.redos = [];
	this.Context.beginPath();
	this.Context.moveTo(x1,y1);
	this.Context.lineTo(x2,y2);
	this.Context.strokeStyle = color;
	this.Context.stroke();
}
ImageEditor.prototype.FillColor = function(e){
	var colorAtMouse = this.GetColorAtMouse(e);
	var fillColor = "#FFFFFF";
	var canvasWidth = this.Width;
	var canvasHeight = this.Height;
    var context = this.canvas.getContext('2d');
	context.fillStyle = fillColor;
	var imageData = context.createImageData(1,1);
	imageData.data[3]=255;
	//do a bubble sort. Expand a rectangle all the way, check edges, if fail, shrink and note failure point.
	for(var x = 0; x<canvasWidth;x++){
		for(var y =0; y<canvasHeight; y++){
			context.putImageData(imageData,x,y);	
		}
	}
}
ImageEditor.prototype.GetColorAtMouse = function(e){
    var context = this.canvas.getContext('2d');
    return context.getImageData(e.offsetX,e.offsetY,1,1).data;
}
ImageEditor.prototype.GetColorStringAtMouse = function(e){
    var colorData = this.GetColorAtMouse(e);
    return "rgb(" +colorData[0] +"," +colorData[1] + "," +colorData[2] + ")";

}

export default ImageEditor;
