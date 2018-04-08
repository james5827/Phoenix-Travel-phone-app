function initMap(){
    let apostles = {lat: -38.6621, lng: 143.1051};
    let wineries = {lat: -37.6877, lng: 145.4574};
    let melbourne = {lat: -37.8136, lng: 144.9631};

    let apostlesmap = new google.maps.Map(document.getElementById("ApostlesMap"), {
        zoom: 15,
        center: apostles,
        disableDefaultUI: true
    });

    let wineriesmap = new google.maps.Map(document.getElementById("WineriesMap"), {
        zoom: 17,
        center: wineries,
        disableDefaultUI: true
    });

    let melbournemap = new google.maps.Map(document.getElementById("MelbourneMap"), {
        zoom: 15,
        center: melbourne,
        disableDefaultUI: true
    });
}
