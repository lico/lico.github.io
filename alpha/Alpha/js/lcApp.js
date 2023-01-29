function confirmDelete(delForm, itemName) {
    if (confirm("Delete '" + itemName +"' ?")) {
    	// pas de redirection dans le JS, l'action est exécutée via un POST, le bouton étant du type SUBMIT
        return true;
    }
    return false;
}

function confirmRestore(delForm, itemName) {
    if (confirm("Restore version " + itemName +"?")) {
    	// pas de redirection dans le JS, l'action est exécutée via un POST, le bouton étant du type SUBMIT
        return true;
    }
    return false;
}