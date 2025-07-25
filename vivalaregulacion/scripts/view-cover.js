$(document).ready(function() {
    // **ICI** : Spécifiez le chemin de votre image prédéfinie
    const IMAGE_TO_LOAD = 'https://cdn.upandcoding.com/vivalaregulacion/img/vivalaregulacion_cover_full.png';
    
    // Ajouter le HTML de l'overlay à la page s'il n'existe pas
    if ($('#imageOverlay').length === 0) {
        const overlayHTML = `
            <div id="imageOverlay" class="image-overlay" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.8);
                z-index: 9999;
                display: none;
            ">
                <div class="close-btn" id="closeBtn" style="
                    position: absolute;
                    top: 20px;
                    right: 30px;
                    color: white;
                    font-size: 30px;
                    cursor: pointer;
                    z-index: 10000;
                ">&times;</div>
                <div class="image-container" style="
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    max-width: 90vw;
                    max-height: 90vh;
                    text-align: center;
                ">
                    <div id="loadingSpinner" class="loading-spinner" style="
                        border: 4px solid #f3f3f3;
                        border-top: 4px solid #3498db;
                        border-radius: 50%;
                        width: 50px;
                        height: 50px;
                        animation: spin 1s linear infinite;
                        margin: 20px auto;
                        display: none;
                    "></div>
                    <img id="loadedImage" class="loaded-image" src="" alt="" style="
                        max-width: 100%;
                        max-height: 100%;
                        border-radius: 10px;
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
                        display: none;
                    ">
                    <div id="imageControls" style="margin-top: 15px; display: none;">
                        <button class="btn btn-default" id="closeOverlayBtn">Fermer</button>
                    </div>
                </div>
            </div>
            <style>
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .close-btn:hover {
                    color: #ccc !important;
                }
            </style>
        `;
        $('body').append(overlayHTML);
    }
    
    // DÉLÉGATION D'ÉVÉNEMENTS : écoute sur le document pour les éléments qui seront créés plus tard
    $(document).on('click', '#clickableImage', function(e) {
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
        };
        
        // Démarre le chargement
        img.src = IMAGE_TO_LOAD;
    }
    
    // Fermer l'overlay - utilisation de la délégation d'événements aussi
    $(document).on('click', '#closeBtn, #closeOverlayBtn', function() {
        $('#imageOverlay').fadeOut(300);
    });
    
    // Fermer en cliquant sur le fond
    $(document).on('click', '#imageOverlay', function(e) {
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