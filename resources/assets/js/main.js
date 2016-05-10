var marked = require('marked');

$(function(){
	var app = {
		init : function(){
			var mdEditor = CodeMirror(document.getElementById('container'), {
				value: "# Hello",
				mode:  "text/x-markdown",
				lineNumbers: true,
				theme: "default",
				autofocus: true
			})

			var htmlEditor = CodeMirror(document.getElementById('container'), {
				value: "<h1>Hello</h1>",
				mode: "text/html",
				lineNumbers: true,
				theme: "default",
				readOnly: "nocursor"
			})
			app.getText(mdEditor, htmlEditor);
		},
		getText : function(mdEditor, htmlEditor){
			$('.CodeMirror').on('keypress keyup keydown', function(){
				var text = mdEditor.getValue();
				app.mdToHTML(text, htmlEditor);
			});
		},
		setText : function(value, htmlEditor){
			var text = htmlEditor.setValue(value);
		},
		mdToHTML : function(text, htmlEditor){
			var text = marked(text);
			app.setText(text, htmlEditor)
		},
	}
	app.init();
});

