function setFocusToSection(event){

	if(event.keyCode === 13){
		event.preventDefault();

		document.getElementById("writingPad").focus();
		
	}
}


function consumeDisruptiveKeyEvents(event){

	var kCode = event.keyCode;

	if(kCode == 8){
		event.preventDefault();
	}
	if (kCode == 46){
		event.preventDefault();
	}
	if(event.ctrlKey && (kCode == 65 || kCode == 67 || kCode == 86 )){
		event.preventDefault();
	}
	if(kCode == 45){
		event.preventDefault();
	}
}

function setCaretPosition(ctrl, pos) {
  // Modern browsers
  if (ctrl.setSelectionRange) {
   		ctrl.focus();
    	ctrl.setSelectionRange(pos, pos);
  
  // IE8 and below
  } else if (ctrl.createTextRange) {
    	var range = ctrl.createTextRange();
    	range.collapse(true);
    	range.moveEnd('character', pos);
    	range.moveStart('character', pos);
    	range.select();
  }
}


function countWords() {
	var s = document.getElementById("writingPad").innerText;
	var wordCountP = document.getElementById("wordCount");

	var noOfWords = s.trim().split(/\s+/).length;

	if(s === ""){
		wordCountP.innerHTML = "0 words";
	}
	else{
		wordCountP.innerHTML = noOfWords + " words";
	}
   
}


function download(filename, text) {
    var element = document.createElement("a");

    text.replace(/\n\s*\n/g, "\n");

    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(filename + "\n \n" + text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function GoInFullscreen(element) {
	if(element.requestFullscreen)
		element.requestFullscreen();
	else if(element.mozRequestFullScreen)
		element.mozRequestFullScreen();
	else if(element.webkitRequestFullscreen)
		element.webkitRequestFullscreen();
	else if(element.msRequestFullscreen)
		element.msRequestFullscreen();
}

window.onload = function(){

	var mouseDown = false;


	countWords();

	document.getElementById("writingPad").focus();

	document.getElementById("title").addEventListener('keydown', function(event){

		setFocusToSection(event);

	});

	document.getElementById("writingPad").addEventListener('keydown',function(event){

		countWords();
		consumeDisruptiveKeyEvents(event);

	});

	document.getElementById("writingPad").addEventListener('contextmenu', function(event){

		event.preventDefault();

	});


	document.getElementById("writingPad").addEventListener('mousedown', function(event){


		mouseDown = true;
	
	});

	document.getElementById("writingPad").addEventListener('mouseup', function(event){

		mouseDown = false;

	});




	document.getElementById("writingPad").addEventListener('mousemove', function(event){

		if(mouseDown){

			console.log("mouse dragged");

			event.preventDefault();
			window.getSelection().removeAllRanges();

		}
		
	});

	document.getElementById("save").addEventListener("click", function(){
    
    	var text = document.getElementById("writingPad").innerText;
    	var filename = document.getElementById("title").innerText;
    
    	download(filename, text);
    	
    	document.getElementById("writingPad").focus();
    	
	}, false);

}




