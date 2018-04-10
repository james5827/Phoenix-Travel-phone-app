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

//TODO: add to onDeviceReady
(function initTourEvents(){
    let tourPage = document.getElementById("page4");
    let tours = Array.from(document.getElementsByClassName("tour"));
    tourPage.addEventListener("scroll", ()=>{
        tours.forEach((tour)=>{
            if(window.innerHeight > tour.getBoundingClientRect().bottom)
                tour.classList.add("transform-visible");
            else
                tour.classList.remove("transform-visible");
        });
    });

    $("#filterableTour").filterable({
        filter: function(event, ui) {
            let test = Array.from(ui.items);
            test.forEach((tour)=>{
                if((tour.getBoundingClientRect().top !== 0) && window.innerHeight > tour.getBoundingClientRect().bottom) {
                    tour.classList.add("transform-visible");
                }else {
                    tour.classList.remove("transform-visible");
                }
            });
        }
    });

    let apostlesTour = document.getElementById("ApostlesTour");
    let wineriesTour = document.getElementById("WineriesTour");
    let melbourneTour = document.getElementById("MelbourneTour");
    
    apostlesTour.addEventListener("click", mapEvent(document.getElementById("ApostlesMap")));
    apostlesTour.addEventListener("blur", mapBlurEvent(document.getElementById("ApostlesMap")));

    wineriesTour.addEventListener("click", mapEvent(document.getElementById("WineriesMap")));
    wineriesTour.addEventListener("blur", mapBlurEvent(document.getElementById("WineriesMap")));

    melbourneTour.addEventListener("click", mapEvent(document.getElementById("MelbourneMap")));
    melbourneTour.addEventListener("blur", mapBlurEvent(document.getElementById("MelbourneMap")));
})();

function mapEvent(node){
    return function(){
        node.classList.toggle("transform-active");
    }
}

function mapBlurEvent(node){
    return function(){
        node.classList.remove("transform-active");
    }
}
