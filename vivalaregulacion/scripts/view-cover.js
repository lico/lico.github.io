$(document).ready(function() {
            // **ICI** : Spécifiez le chemin de votre image prédéfinie
            const IMAGE_TO_LOAD = 'https://cdn.upandcoding.com/vivalaregulacion/img/vivalaregulacion_cover_full.png';
            
            // Quand on clique sur l'image
            $('#clickableImage').click(function(e) {
                e.preventDefault(); // Empêche la redirection du lien
                
                // Affiche l'overlay avec le spinner de chargement
                $('#imageOverlay').fadeIn(300);
                $('#loadingSpinner').show();
                $('#loadedImage').hide();
                $('#imageControls').hide();
                
                // Charge l'image prédéfinie
                loadPredefinedImage();
            });
            
            function loadPredefinedImage() {
                // Crée un nouvel objet Image pour précharger
                const img = new Image();
                
                img.onload = function() {
                    // Image chargée avec succès
                    $('#loadedImage').attr('src', IMAGE_TO_LOAD);
                    $('#loadingSpinner').hide();
                    $('#loadedImage').fadeIn(500);
                    $('#imageControls').fadeIn(300);
                };
                
                img.onerror = function() {
                    // Erreur de chargement
                    $('#loadingSpinner').hide();
                    $('#imageControls').html('<p class="text-danger">Erreur lors du chargement de l\'image</p><button class="btn btn-default" id="closeOverlayBtn">Fermer</button>').fadeIn(300);
                    
                    // Réattache l'événement au nouveau bouton
                    $('#closeOverlayBtn').click(function() {
                        $('#imageOverlay').fadeOut(300);
                    });
                };
                
                // Démarre le chargement
                img.src = IMAGE_TO_LOAD;
            }
            
            // Fermer l'overlay
            $('#closeBtn, #closeOverlayBtn').click(function() {
                $('#imageOverlay').fadeOut(300);
            });
            
            // Fermer en cliquant sur le fond
            $('#imageOverlay').click(function(e) {
                if (e.target === this) {
                    $(this).fadeOut(300);
                }
            });
            
            // Fermer avec la touche Escape
            $(document).keydown(function(e) {
                if (e.key === 'Escape') {
                    $('#imageOverlay').fadeOut(300);
                }
            });
        });