function steal() {
    var uri = "http://locahost:4545/steal";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", uri, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
                console.log("Steal successful!");
            } else {
                console.log("Steal failed.");
            }
        }
    };
    xhr.send();
    var steal =
}