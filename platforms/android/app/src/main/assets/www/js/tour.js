

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

(function initTourClicks(){
    let apostlesTour = document.getElementById("ApostlesTour");
    let wineriesTour = document.getElementById("WineriesTour");
    let melbourneTour = document.getElementById("MelbourneTour");

    let toggle = true;
    let x = 0;
    let mapShowInterval;

    apostlesTour.addEventListener("click", () => {
        let ApMapClick = document.getElementById("ApostlesMapClick");
        let ApMap = document.getElementById("ApostlesMap");

        if(toggle) {
            clearInterval(mapShowInterval);
            mapShowInterval = setInterval(() => {
                ApMap.style.height = `${x}vh`;
                x += 0.5;
                if(x === 50){
                    clearInterval(mapShowInterval);
                }
            }, 10);
            ApMapClick.style.display = "none";
            ApMap.style.borderWidth = "1px";
        }
        else{
            clearInterval(mapShowInterval);
            ApMapClick.style.display = "block";
            mapShowInterval = setInterval(() => {
                ApMap.style.height = `${x}vh`;
                --x;
                if(x === 0){
                    clearInterval(mapShowInterval);
                    ApMap.style.borderWidth = "0";
                    ApMap.style.height = `${x}`;
                }
            }, 10);
        }
        toggle = !toggle;
    });

    wineriesTour.addEventListener("click", () => {

    });

    melbourneTour.addEventListener("click", () => {

    });
})();
