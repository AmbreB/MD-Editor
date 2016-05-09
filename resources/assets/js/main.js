$(function(){
	var app = {
		init : function(){
			var mdEditor = CodeMirror(document.getElementById('container'), {
				value: "# Hello",
				mode:  "text/x-markdown",
				lineNumbers: true,
				theme: "default"
			})

			var htmlEditor = CodeMirror(document.getElementById('container'), {
				value: "<h1>Hello</h1>",
				mode: "text/html",
				lineNumbers: true,
				theme: "default"
			})
			app.getText(mdEditor);
		},
		getText : function(editor){
			$('.CodeMirror').on('keypress', function(){
				var text = editor.getValue();
				console.log(text);
			});
		},
	}
	app.init();
});

