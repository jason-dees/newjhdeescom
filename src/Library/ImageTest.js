import ImageEditor from './ImageEditor';
import $ from 'jquery';
import ivysaur from "../Images/002.jpg";

var ImageTest = function(){
	var self = this;
	let editor = new ImageEditor($('#ImageTest'));
	console.log(editor);
	this.editor = editor;
	var i = this.editor;
    i.LoadFileUrl(ivysaur);
	setTimeout(function(){
		self.editor.DrawLine(10,10,10,100)
		self.editor.DrawLine(40,10,40,100)
		self.editor.DrawLine(10,50,40,50)
		self.editor.DrawLine(60,50,60,100);
		self.editor.DrawLine(60,40,60,35);
	}, 500);
	return this;
}
ImageTest.prototype.StartTest = function(){
	console.log(this.FileLoad());
}
ImageTest.prototype.FileLoad = function(){
	console.log("Image Loaded");
	return this.editor.GetFile() != null;
}


export default ImageTest;