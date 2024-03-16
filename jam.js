function searchCity() {
    var userInput = document.getElementById("userCity").value;
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                document.getElementById("result").innerHTML = xhr.responseText;
            } else {
                document.getElementById("result").innerHTML = "Erreur lors de la requête : " + xhr.status;
            }
        }
    };

    xhr.open("GET", "crashs.php?lieu=" + encodeURIComponent(userInput), true);
    xhr.send();
}


function filterData(type) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                document.getElementById("result").innerHTML = xhr.responseText;
            } else {
                document.getElementById("result").innerHTML = "Erreur lors de la requête : " + xhr.status;
            }
        }
    };

    xhr.open("POST", "filter_data.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("type=" + type);
}
