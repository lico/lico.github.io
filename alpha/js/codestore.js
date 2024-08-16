/********************************************************
Set of Global JavaScript functions to be used
troughout CodeStore!

Jake Howlett, v7.6, 16/11/2010 
********************************************************/

var CodeStore = {
	BaseURL: "/store.nsf/",
	Replies:{},
	Reply:{}
};

/*
mailto replaces the mailto:
anchor link and prevents
spambots harvesting the 
address.
*/

function mailto(name, domain)
{
 location.href = "mailto:" + name + "@" + domain;
}


//Remove leading and trailing spaces from a string
//Originally written by Jim Fricker
function trim(aStr) {
	return aStr.replace(/^\s{1,}/, "").replace(/\s{1,}$/, "")
}

/* Validate reader's posts */
CodeStore.Reply.validate = function( frm ){
  if ( trim(frm.CommentName.value) === "" || trim(frm.CommentBody.value) === ""){
	alert ("You need to fill out the required fields (*)!");
	return false;
  } else if (frm.EmailAlert.checked && trim(frm.CommentEmail.value) === "") {
  	alert ("You need to enter an email address if you want alerts when you get a reply!");
	return false;
  } else {
  	return true;
  }
  
  return true;
 }

CodeStore.Reply.toggle = function (id){
		//does the form exist in the DOM? If so, delete. Otherwise, add.
		
		if ( !$('reply_form_'+id) ) {
			 
			$('reply_area_'+id).innerHTML='<h4 class="form">Reply to this comment</h4>'+
					'<form id="reply_form_'+id+'" name="reply_form_'+id+'" method="post" onsubmit="return CodeStore.Reply.validate(this)" action="reply?CreateDocument&amp;ParentUNID='+id+'">'+
					'<dl class="form">'+
					'<dt>Name <span class="required">*</span></dt><dd><input type="text" name="CommentName" class="text" value="'+document.forms['reply'].CommentName.value+'" /></dd>'+
					'<dt>Email </dt><dd><input type="text" name="CommentEmail" class="text" value="'+document.forms['reply'].CommentEmail.value+'" /></dd>'+
					'<dt>Website </dt><dd><input type="text" name="CommentWebsite" class="text" value="'+document.forms['reply'].CommentWebsite.value+'" /></dd>'+
					'<dt></dt><dd><input type="checkbox" name="CommentRemember" value="1" '+((document.forms['reply'].CommentRemember.checked)?'checked ':'')+'/> Remember my details<br>'+
					'<input type="checkbox" name="CommentEmailPrivate" value="1" '+((document.forms['reply'].CommentEmailPrivate.checked)?'checked ':'')+'/>&nbsp;Keep my email address private<br>'+
					'<input type="checkbox" name="EmailAlert" value="1" '+((document.forms['reply'].EmailAlert.checked)?'checked ':'')+'/> Send me an email when somebody replies to this.</dd>'+
					'<dt>Comment <span class="required">*</span></dt><dd><textarea name="CommentBody"></textarea></dd>'+
					'<dt></dt><dd><input type="submit" class="button" value="Post It!"> <a href="#" onclick="CodeStore.Reply.toggle(\''+id+'\');return false;">Cancel</a></dd>'+
					'</dl></form>';
		
			document.forms["reply_form_"+id]['CommentBody'].focus();
			//$('reply_area_'+Reply.id).addClassName('form-on');
			//$('reply_link_'+Reply.id).addClassName('reply-link-on');
			
			return false;
			
		 } else {
		 	var el = $('reply_form_'+id);
		 	if (el){ 
				el.parentNode.removeChild(el);
			}
			
			$('reply_area_'+id).innerHTML='<p class="reply"><a class="button" href="reply?OpenForm&amp;ParentUNID='+id+'" onclick="CodeStore.Reply.toggle(\''+id+'\'); return false;" id="reply_link_'+id+'">Reply to this comment</a></p>';
			return false;
		} 
}

CodeStore.Replies.toggle = function (link, id){
	alert(id);
	$(id).style.display = ($(id).style.display=="none")?"block":"none";
	link.innerHTML = link.innerHTML.replace(
		($(id).style.display=="none")?"Hide":"Show",
		($(id).style.display=="none")?"Show":"Hide"
	);	
}

/*
The following two functions are used to add the Mozilla
search engine.
*/

function errorMsg()
{
alert("A Mozilla variant is needed to install a sherlock plugin");
}

function addEngine(name,ext,cat)
{
if ( (typeof window.sidebar == "object") 
	&& (typeof window.sidebar.addSearchEngine == "function"))
	{
		window.sidebar.addSearchEngine( "http://www.codestore.net/mozilla/searchplugin/codestore.src", "http://www.codestore.net/mozilla/searchplugin/codestore.gif", "codestore.net", "Web" );
	} else { 
		errorMsg(); 
	}
}

function $(id){
	return document.getElementById(id);
}

function twitterCallback(twitters) {
	var statusHTML = "";
	var username = "";
	var max_twits = 5;
	var count=(twitters.length<max_twits)?twitters.length:max_twits;
	for (var i=0; i<count; i++){
		username = twitters[i].user.screen_name
		statusHTML += ('<li>'+replaceURLWithHTMLLinks(twitters[i].text)+'</li>')
	}
	document.getElementById('twitter_update_list').innerHTML = "<ul>"+statusHTML+"</ul>";
}

function replaceURLWithHTMLLinks(text) {
  var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  return text.replace(exp,"<a href='$1'>$1</a>"); 
}