<?php

function getCrashs($place) {
    $placeEncode = urlencode($place);
    $url = "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/accidents-corporels-de-la-circulation-millesime/records?select=*&where=nom_com%20like%20%22" . $placeEncode . "%22&order_by=an%20DESC%2C%20mois%20DESC%2C%20jour%20DESC%2C%20hrmn%20DESC&limit=100&lang=fr";
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HEADER, false);
    $response = curl_exec($curl);
    curl_close($curl);
    $data = json_decode($response, true);
    return $data;
}

function crashsFilter($crashs) {
    if (!isset($crashs['results']) || !is_array($crashs['results'])) {
        return ["error" => "Structure de données invalide ou vide"];
    }

    $filtered_crashes = [];
    foreach ($crashs['results'] as $record) {
        $filtered_crashes[] = [
            "num_accident" => $record['num_acc'] ?? 'N/A',
            "Ville" => $record['nom_com'] ?? 'N/A',
            "année" => $record['an'] ?? 'N/A',
            "mois" => $record['mois'] ?? 'N/A',
            "jour" => $record['jour'] ?? 'N/A',
            "heure/minute" => $record['hrmn'] ?? 'N/A',
            "luminosité" => $record['lum'] ?? 'N/A',
            "agglomération" => $record['agg'] ?? 'N/A',
            "atmosphère" => $record['atm'] ?? 'N/A',
            "collision" => $record['col'] ?? 'N/A',
            "Adresse" => $record['adr'] ?? 'N/A',
            "Surface" => $record['surf'] ?? 'N/A',
            "Sexe" => $record['sexe'] ?? 'N/A',
            "gravité" => $record['grav'] ?? 'N/A',
        ];
    }

    return $filtered_crashes;
}

if(isset($_GET['lieu'])) {
    $place = filter_var($_GET['lieu']);
    $crashs = getCrashs($place);
    $filtered_crashes = crashsFilter($crashs);
    header('Content-Type: application/json');
    echo json_encode($filtered_crashes);
} else {
    header('Content-Type: application/json');
    echo json_encode(["error" => "Lieu non spécifié"]);
}
