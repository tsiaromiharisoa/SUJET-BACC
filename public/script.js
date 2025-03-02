
document.addEventListener('DOMContentLoaded', function() {
    // Variables pour stocker les filtres sélectionnés
    let selectedMatiere = '';
    let selectedSerie = 'A'; // Série A par défaut
    let selectedType = 'sujet'; // Type par défaut: sujet

    // Sélecteurs pour les boutons de filtre
    const matiereButtons = document.querySelectorAll('.btn.matiere');
    const serieButtons = document.querySelectorAll('.btn.serie');
    const typeButtons = document.querySelectorAll('.btn.type');
    
    // Élément pour afficher les documents
    const documentsList = document.getElementById('documents-list');
    const resultTitle = document.getElementById('result-title');
    
    // Attacher les événements aux boutons de matière
    matiereButtons.forEach(button => {
        button.addEventListener('click', function() {
            matiereButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            selectedMatiere = this.getAttribute('data-matiere');
            updateDocumentsList();
        });
    });
    
    // Attacher les événements aux boutons de série
    serieButtons.forEach(button => {
        button.addEventListener('click', function() {
            serieButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            selectedSerie = this.getAttribute('data-serie');
            updateDocumentsList();
        });
    });
    
    // Attacher les événements aux boutons de type (sujet/correction)
    typeButtons.forEach(button => {
        button.addEventListener('click', function() {
            typeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            selectedType = this.getAttribute('data-type');
            updateDocumentsList();
        });
    });
    
    // Fonction pour mettre à jour la liste des documents
    function updateDocumentsList() {
        // Vérifier si tous les filtres nécessaires sont sélectionnés
        if (!selectedMatiere) {
            resultTitle.textContent = 'Veuillez sélectionner une matière';
            documentsList.innerHTML = '';
            return;
        }
        
        // Mettre à jour le titre des résultats
        const typeText = selectedType === 'sujet' ? 'Sujets' : 'Corrigés';
        const matiereText = getMatiereFullName(selectedMatiere);
        resultTitle.textContent = `${typeText} ${matiereText} - Série ${selectedSerie}`;
        
        // Simuler une liste de documents par années (2000-2023)
        // Dans un cas réel, ces données viendraient d'une API ou d'une base de données
        const years = [];
        for (let year = 2023; year >= 2000; year--) {
            years.push(year);
        }
        
        // Créer la liste des documents PDF avec icônes
        let documentsHTML = '';
        
        years.forEach(year => {
            const baseFolder = selectedType === 'sujet' ? 'fonctionnement/sujet/' : 'fonctionnement/correction/';
            const matiereLower = selectedMatiere.toLowerCase();
            // Construction du chemin du fichier avec la série spécifique
            const fileName = `${matiereLower}_TA_${selectedSerie}_${year}.pdf`;
            const filePath = `${baseFolder}${selectedMatiere}/${selectedSerie}/${fileName}`;
            
            documentsHTML += `
                <div class="pdf-item" data-file="${filePath}">
                    <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzODQgNTEyIj48cGF0aCBmaWxsPSIjZTQyNTI1IiBkPSJNMTgxLjkgMjU2LjFjLTUtMTYtNC45LTMyLjctLjEtNDguNiAzLjQtMTEuMiA5LjctMTkuNyAxNS44LTI0LjIgNC45LTMuNyAxNC43LTkuNyAzNi4xLTkuN3MzMS4yIDYgMzYuMSA5LjdjNi4xIDQuNSAxMi40IDEzIDUuOCAyNC4yIDQuNSAxNS45IDQuNyAzMi42LS4zIDQ4LjZoMGMtLjQgMS4yLS45IDIuNC0xLjQgMy41LTkuNyAyNi4yLTM5LjcgMzYuOS00MC41IDM3LTItLjQtMzkuNS04LjUtNDguNC0zNy41LS43LTEuMi0xLjMtMi41LTEuOS0zLjh6bTY0LjkgNTAuNy0xMi45IDMwLjlzMjkuNyAyNi42IDIwLjQgMzMuMmMtMTQuNiAxMC01Ny43LTMyLjktODYuOCA5LjJDMTY0LjU2IDM4MS44IDIyMyAzMDkgMjQ2LjggMzA2LjhjMTIuOC0uMiAzOS43IDkuMSAzMS4yIDE4Ljd6bS45OS05LjZjMTMuMi00Ni40IDExLjktMTM3LjQtMi44LTE3MC45LTguMS0xOC40LTI0LTI3LjEtMzYuNy0yNy4xLTEyLjcgMC0yOC41IDguNy0zNi43IDI3LjEtNy41IDE3LTEyLjkgNDYuNi0xMi45IDg0LjkgMCA0MS4zIDUuNCAxOS42IDExLjQgMjQgNC42LTEwLjE1IDEyLjUtMjEuOCAyOC4yLTIxLjhzMjMuNiAxMS42NSAyOC4yIDIxLjhjNS45LTQuNCAxMS40LTYxLjEgMTEuNC0yNC4xLjA0LTM4LjM1LjA0LTY3Ljk1IDEuMS04NSAxLTEzLjktMS0zNy43LTktNTJINzVjMTQuNSAxLjQgMy40IDI3LjkgMTUuNCBoMTY2YzExLjk1IDAgMjEuNjUgOS41NSAyMS42NSAyMS4zNVYzOTkuSDE4Ny4zM0wxOTYuOSAzMDAuMnpNMCAzMTUuNXYxNzUuMWgzODRWMzE1LjV6Ii8+PC9zdmc+" alt="PDF" class="pdf-icon">
                    <span>${matiereText} série ${selectedSerie} ${year} - ${typeText}</span>
                </div>
            `;
        });
        
        documentsList.innerHTML = documentsHTML;
        
        // Ajouter l'événement de clic pour télécharger
        attachDownloadEvents();
    }
    
    // Fonction pour obtenir le nom complet de la matière
    function getMatiereFullName(code) {
        const matieres = {
            'HG': 'Histoire-Géographie',
            'MLG': 'Malagasy',
            'FRS': 'Français',
            'PC': 'Physique-Chimie',
            'MATH': 'Mathématiques'
        };
        return matieres[code] || code;
    }
    
    // Fonction pour attacher les événements de téléchargement
    function attachDownloadEvents() {
        const pdfItems = document.querySelectorAll('.pdf-item');
        
        pdfItems.forEach(item => {
            item.addEventListener('click', function() {
                const filePath = this.getAttribute('data-file');
                downloadFile(filePath);
            });
        });
    }
    
    // Fonction pour télécharger un fichier
    function downloadFile(filePath) {
        const link = document.createElement('a');
        link.href = filePath;
        link.download = filePath.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    // Appeler updateDocumentsList une fois pour initialiser
    updateDocumentsList();
});
