function confirmDeleteOld(delForm, itemName) {
    if (confirm("Delete " + itemName +"?")) {
    	// pas de redirection dans le JS, l'action est exécutée via un POST, le bouton étant du type SUBMIT
        return true;
    }
    return false;
}

function confirmDelete(delForm, itemName) {
	var inSt = $(this).prop('checked');
	var $toggle = $(this);
	
	$.confirm({
	  title: 'Confirm Deletion',
	  content: 'Delete deletion of : ' + itemName,
	  type: 'red',
	  buttons: {
		confirm: {
		  text: 'Confirm',
		  btnClass: 'btn-primary',
		  action: function(){
			return true;
		  }
		},
		cancel: {
		  text: 'Cancel',
		  action: function(){
			return false;
		  }
		}
	  }
	});
}
 
