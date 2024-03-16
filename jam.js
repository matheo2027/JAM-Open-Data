function displayData(data) {
    const accidents = JSON.parse(data);

    // Tri des accidents par date, du plus récent au plus ancien
    accidents.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA; // Tri décroissant
    });

    let tableHTML = "<table border='1'>";
    tableHTML += "<tr><th>Numéro d'Accident</th><th>Date et Heure</th><th>Ville</th><th>Année</th><th>Mois</th><th>Jour</th><th>Heure/Minute</th><th>Luminosité</th><th>Agglomération</th><th>Atmosphère</th><th>Collision</th><th>Adresse</th><th>Surface</th><th>Sexe</th><th>Gravité</th></tr>";

    // Génération du HTML pour chaque accident
    accidents.forEach(accident => {
        tableHTML += `<tr>
            <td>${accident.num_accident}</td>
            <td>${accident.date}</td>
            <td>${accident.Ville}</td>
            <td>${accident.année}</td>
            <td>${accident.mois}</td>
            <td>${accident.jour}</td>
            <td>${accident["heure/minute"]}</td>
            <td>${accident.luminosité}</td>
            <td>${accident.agglomération}</td>
            <td>${accident.atmosphère}</td>
            <td>${accident.collision}</td>
            <td>${accident.Adresse}</td>
            <td>${accident.Surface}</td>
            <td>${accident.Sexe.join(", ")}</td>
            <td>${accident.gravité.join(", ")}</td>
        </tr>`;
    });

    tableHTML += "</table>";
    document.getElementById("result").innerHTML = tableHTML;
}


function searchCity() {
    var userInput = document.getElementById("userCity").value;
    if (!userInput.trim()) {
        document.getElementById("result").innerHTML = "Veuillez entrer un nom de ville.";
        return; // Sortie précoce pour éviter une requête inutile
    }

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log(xhr.responseText); // Assurez-vous que cette sortie est ce que vous attendez.
                // Vérifiez si la réponse n'est pas vide avant d'essayer de la parser
                if(xhr.responseText.trim()) {
                    displayData(xhr.responseText);
                } else {
                    console.log("Réponse vide ou invalide reçue du serveur.");
                    document.getElementById("result").innerHTML = "Réponse vide ou invalide reçue du serveur.";
                }
            } else {
                document.getElementById("result").innerHTML = "Erreur lors de la requête : " + xhr.status;
            }
        }
    };
    xhr.open("GET", "crashs.php?lieu=" + encodeURIComponent(userInput), true);
    xhr.send();
}
