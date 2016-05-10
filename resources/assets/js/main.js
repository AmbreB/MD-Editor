var marked = require('marked');

$(function(){
	var app = {
		init : function(){

			// Initialisation des deux éditeurs

			var mdEditor = CodeMirror(document.getElementById('container'), {
				value: "Hi there",
				mode:  "text/x-markdown",
				lineNumbers: true,
				theme: "default",
				autofocus: true,
				fontSize: "24px"
			})
			mdEditor.getWrapperElement().style["font-size"] = 16 +"px";
  			mdEditor.refresh();
			app.getText(mdEditor);
		},
		getText : function(mdEditor){

			// Récupère la valeur du contenu de l'éditeur MD

			$('.CodeMirror').on('keypress keyup keydown', function(){
				var text = mdEditor.getValue();
				app.mdToHTML(text);
			});
		},
		setText : function(text){

			$('#result').html(text);

		},
		mdToHTML : function(text){

			// Transforme le MD en HTML

			var text = marked(text);
			app.setText(text)
		},
	}
	app.init();
});

