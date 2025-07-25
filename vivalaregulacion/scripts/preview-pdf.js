// Configuration PDF.js
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

        let currentPDF = null;
        let currentPage = 1;
        let totalPages = 0;
        let currentScale = 1.5;
        let currentPDFUrl = '';
        let currentPDFName = '';

        // Fonction pour télécharger un PDF
        function downloadPDF(filename, title) {
            // Créer un lien de téléchargement
            const link = document.createElement('a');
            link.href = filename; // Remplacez par le vrai chemin de vos PDFs
            link.download = filename;
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        // Fonction pour ouvrir la visionneuse PDF
        function openPDFViewer(pdfUrl, title) {
            // Vérification que jQuery et Bootstrap sont disponibles
            if (typeof $ === 'undefined') {
                alert('jQuery n\'est pas chargé!');
                return;
            }
            
            if (typeof $.fn.modal === 'undefined') {
                alert('Bootstrap modal n\'est pas disponible!');
                return;
            }
            
            currentPDFUrl = pdfUrl;
            currentPDFName = title;
            $('#pdfModalTitle').text(title);
            
            try {
                $('#pdfModal').modal('show');
            } catch(error) {
                console.error('Erreur lors de l\'ouverture de la modal:', error);
                alert('Erreur lors de l\'ouverture de la visionneuse');
                return;
            }
            
            // Réinitialiser les valeurs
            currentPage = 1;
            currentScale = 1.5;
            
            // Afficher le spinner de chargement
            $('#loadingSpinner').show();
            $('#canvasContainer').hide();
            $('#loadingProgress').css('width', '0%');
            
            loadPDF(pdfUrl);
        }

        // Charger le PDF avec PDF.js
        function loadPDF(url) {
            const loadingTask = pdfjsLib.getDocument({
                url: url,
                onProgress: function(progress) {
                    if (progress.total > 0) {
                        const percent = (progress.loaded / progress.total) * 100;
                        $('#loadingProgress').css('width', percent + '%');
                    }
                }
            });

            loadingTask.promise.then(function(pdf) {
                currentPDF = pdf;
                totalPages = pdf.numPages;
                $('#totalPages').text(totalPages);
                $('#currentPage').text(currentPage);
                
                // Masquer le spinner et afficher le canvas
                $('#loadingSpinner').hide();
                $('#canvasContainer').show();
                
                renderPage(currentPage);
                updateButtons();
            }).catch(function(error) {
                console.error('Erreur lors du chargement du PDF:', error);
                $('#loadingSpinner').html('<div class="alert alert-danger">Erreur lors du chargement du PDF</div>');
            });
        }

        // Rendre une page spécifique
        function renderPage(pageNum) {
            if (!currentPDF) return;

            currentPDF.getPage(pageNum).then(function(page) {
                const canvas = document.getElementById('pdfCanvas');
                const context = canvas.getContext('2d');
                
                const viewport = page.getViewport({ scale: currentScale });
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };

                page.render(renderContext);
                $('#currentPage').text(pageNum);
            });
        }

        // Mettre à jour l'état des boutons
        function updateButtons() {
            $('#prevPage').prop('disabled', currentPage <= 1);
            $('#nextPage').prop('disabled', currentPage >= totalPages);
        }

        // Gestionnaires d'événements
        $(document).ready(function() {
            // Vérifier que tout est bien chargé
            console.log('jQuery version:', $.fn.jquery);
            console.log('Bootstrap modal disponible:', typeof $.fn.modal !== 'undefined');
            
            // Navigation entre les pages
            $('#prevPage').click(function() {
                if (currentPage > 1) {
                    currentPage--;
                    renderPage(currentPage);
                    updateButtons();
                }
            });

            $('#nextPage').click(function() {
                if (currentPage < totalPages) {
                    currentPage++;
                    renderPage(currentPage);
                    updateButtons();
                }
            });

            // Contrôles de zoom
            $('#zoomIn').click(function() {
                currentScale += 0.2;
                renderPage(currentPage);
            });

            $('#zoomOut').click(function() {
                if (currentScale > 0.4) {
                    currentScale -= 0.2;
                    renderPage(currentPage);
                }
            });

            // Bouton de téléchargement dans la modal
            $('#downloadCurrent').click(function() {
                if (currentPDFUrl) {
                    const link = document.createElement('a');
                    link.href = currentPDFUrl;
                    link.download = currentPDFName + '.pdf';
                    link.target = '_blank';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            });

            // Navigation au clavier
            $(document).keydown(function(e) {
                if ($('#pdfModal').hasClass('in') || $('#pdfModal').is(':visible')) {
                    if (e.keyCode === 37) { // Flèche gauche
                        $('#prevPage').click();
                    } else if (e.keyCode === 39) { // Flèche droite
                        $('#nextPage').click();
                    } else if (e.keyCode === 27) { // Escape
                        $('#pdfModal').modal('hide');
                    }
                }
            });
        });