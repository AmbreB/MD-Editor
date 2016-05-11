var marked = require('marked');

$(function(){
	var app = {
		// Attribut servant à stocker l'instance de l'objet CodeMirror
		mdEditor : undefined,
		// Numéro du document courant
		docId : 0,
		// Attribut servant à stocker les documents
		docs : [],
		// Attribut servant à définir les valeurs par défaut d'un nouveau doc
		def : {
			text : "# Ceci est un texte par défaut",
			title : "Ceci est un titre par défaut"
		},
		// Initialisation de l'éditeur
		init : function(){
			// Récupère les documents dans localStorage s'il y a
			this.open()
			// Crée un éditeur CodeMirror
			this.mdEditor = CodeMirror(document.getElementById('container'), {
				value: "",
				mode:  "text/x-markdown",
				lineNumbers: true,
				theme: "default",
				autofocus: true,
			});
			// Changement de la taille de la typographie de l'éditeur
			this.mdEditor.getWrapperElement().style["font-size"] = 16 +"px";
  			this.mdEditor.refresh();

  			this.refreshEditor();
			this.printDocList();

			this.bindListeners();

		},
		getCurrentDoc : function(){

			if (this.docs.length == 0){
				this.createDoc();
			} else if (this.docs.length <= this.docId) {
				console.log("Y'a pas de document ici :", this.docId, "docs", this.docs);
			} 
			return this.docs[this.docId];
		},
		// Récupère la valeur du contenu de l'éditeur MD
		getText : function(){
			return this.mdEditor.getValue();
		},
		bindListeners : function(){
			// Récupère la valeur de l'éditeur, la transforme et l'affiche
			$('.CodeMirror, #title').on('keypress keyup keydown', function(){
				var text = app.mdEditor.getValue();
				var title = $('#title').val();

				var htmlText = app.mdToHTML(text);
				app.setText(htmlText);

			});
			// Sauvegarde des valeurs dans l'objet
			$('#save').on('click', function(){
				var text = app.mdEditor.getValue();
				var title = $('#title').val();

				app.saveCurrent(title, text);
			});
			// Crée un nouveau document
			$('#create').on('click', function(){
				app.createDoc();
			});
			// Refresh les valeurs du title et du texte au clic sur un lien
			$('a[data_id]').on('click', function(){
				app.docId = parseInt($(this).attr('data_id'));
				app.refreshEditor();
			});
		},
		// Ajoute le texte transformé à la div "result"
		setText : function(text){
			$('#result').html(text);
		},
		// Transforme le MD en HTML
		mdToHTML : function(text){
			return marked(text);
		},
		// Sauvegarde les valeurs title et text dans l'objet courant et réaffiche la liste des docs
		saveCurrent : function(title, text){
			this.docs[this.docId] = {text: text, title: title};
			localStorage.setItem('docs', JSON.stringify(this.docs));
			this.printDocList();
		},
		// Crée un nouvel objet dans docs, définit une valeur par défaut
		// save et refresh l'interface
		createDoc : function(){
			this.docs.push({});

			var text = this.def.text;
			var title = this.def.title;

			this.docId = this.docs.length - 1;
			this.saveCurrent(title, text);
			this.refreshEditor();
		},
		// Récupère le tableau d'objets des documents
		open : function(){
			var docs = JSON.parse(localStorage.getItem("docs"));
			if (docs){
				this.docs = docs;
			}
		},
		// Affiche la liste des documents 
		printDocList : function(){
			$('#doclist').empty();
			for (var i=0; i < this.docs.length; i++){
				$('<a>', {
					text:this.docs[i].title,
					href:"#",
					data_id:i,
				}).appendTo('#doclist');
			}
		},
		// Récupère l'objet correspondant au document courant
		// Met à jour le titre et la valeur de l'éditeur
		refreshEditor : function(){
 
			var doc = this.getCurrentDoc();

			$('#title').val(doc.title); 
			this.mdEditor.setValue(doc.text);

			var text = this.getText();
			var htmlText = this.mdToHTML(text);
			
			this.setText(htmlText);
		},
	}
	app.init();
});
