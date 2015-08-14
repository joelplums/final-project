function arrowkeys (e) {
	var code = e.which || e.code;
	if (code === 38) {
		e.preventDefault();
		$(document.activeElement).prev().focus();
		focusEndOfLine();
	} else if (code === 40) {
		$(document.activeElement).next().focus();
	}
	
}

function h1TabDisable (e) {
	var keyCode = e.which || e.keyCode;
	if (keyCode === 9) {
			e.preventDefault();
		}
}	

function h1CatchNewLine (e) {
	var code = e.which || e.code;
	if (code === 13) {
		e.preventDefault();
		$(this).next().focus();
			
	}

}

function notelineCatchNewLine (e) {
	var code = e.which || e.code;
	if (code === 13) {
		e.preventDefault();
		if ($(this).next().html().length > 0) {
			$(this).next().focus();
		} else if($(this).next().attr("contenteditable")==="false" && $(this).attr("data-tab")==="true") {
			$(this).after("<div class=noteline data-tab=true contenteditable=true></div>");
			$(this).next().css("padding-left","80px");
			initialiseNoteLineHandlers();
		} else if ($(this).next().attr("contenteditable")==="false") {
			$(this).after("<div class=noteline data-tab=false contenteditable=true></div>");
			initialiseNoteLineHandlers();
		} else if ($(this).attr("data-tab")==="true") {
			$(this).next().attr("data-tab","true");
			$(this).next().css("padding-left","80px");
		}

		$(this).next().focus();

	
	}
}


function focusEndOfLine() {
	var sel = window.getSelection();
	var range = document.createRange();
	range.setStart(sel.focusNode, sel.focusNode.length);
	range.setEnd(sel.focusNode, sel.focusNode.length);
	sel.removeAllRanges();
	sel.addRange(range);
};

function tabIndent (e) {
	var keyCode = e.which || e.keyCode;
	if (keyCode === 9) {
			e.preventDefault();
			$(this).css("padding-left","80px");
			$(this).attr("data-tab", "true");


		}
};

function backspace (e) {
	var code = e.which || e.code;
	if (code === 8 && $(this).html().length === 0) {
		e.preventDefault();
		
		// if to check indent (remove indent) or non indent (prev line)
		if ($(this).attr("data-tab") === "true") {
			$(this).css("padding-left","30px");
			$(this).attr("data-tab", "false");
		} else {
			$(this).prev().focus();
			focusEndOfLine();
		}
	}
};


function newnote () {
	
		$("#workspace").append($(
				"<div class=newnote>" +
				"<img class=done src=images/done.svg>" +
				"<div class=recipients>" +
					"<span class=address>" +
						"<img src=images/recipient.svg>" +
						"<div class=email contenteditable=true>example@nmail.com, example2@nmail.com, ... etc</div>" +
						"<button>Send Note</button>" +
					"</span>" +
				"</div>" +
				"<div class=confirmation>Sent.</div>" +
				"<h1 contenteditable=true></h1>" +
				"<div class=noteline contenteditable=true></div>" +
				"<div class=noteline contenteditable=true></div>" +
				"<div class=noteline contenteditable=true></div>" +
				"<div class=noteline contenteditable=false></div>" +
				"</div>"
			));
	initialiseNoteHandlers();
};

function recipients () {
	var recipients = $(this).next();
	recipients.fadeIn(400);
	recipients.css("display","inline-block");
	$(this).fadeOut(600);
	recipients.children().fadeIn(900).css("visibility","visible");
	$(".email").click(clearPlaceholder);
	$("button").click(sendWrapUp);

	
}

function clearPlaceholder () {
	$(this).html($(""));
	$(this).css("color","black");
}

function sendWrapUp () {
	var recipients = $(this).siblings();
	recipients.fadeOut(400);
	// recipients.css("display","inline-block");
	$(this).fadeOut(600);
	$(".address").delay(1800).fadeOut(800);
	$(".recipients").fadeOut(800);
	var confirmation = $(this).parent().parent().next();
	$(confirmation).css("visibility","visible");
	$(confirmation).hide();
	$(confirmation).fadeIn(2000, "swing");
	$(".done").click(recipients);

}



function initialiseNoteHandlers () {
	$(document).keydown(arrowkeys);
	$(".done").click(recipients);
	$("h1").focus();
	$("h1").keydown(h1TabDisable);
	$("h1").keypress(h1CatchNewLine);
	$(".noteline").keypress(notelineCatchNewLine);
	$(".noteline").keydown(tabIndent)
	$(".noteline").keydown(backspace);

};

function initialiseNoteLineHandlers() {
	$(".noteline").unbind();
	$(".noteline").keypress(notelineCatchNewLine);
	$(".noteline").keydown(tabIndent);
	$(".noteline").keydown(backspace);	
}
$(document).ready(function() {
	initialiseNoteHandlers();
	$("#plus").click(newnote);
	
});




