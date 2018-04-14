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

    //Tour Scroll Event
    tourPage.addEventListener("scroll", ()=>{
        tours.forEach((tour)=>{
            if(window.innerHeight > tour.getBoundingClientRect().bottom
                && 0 < tour.getBoundingClientRect().top || tour.contains(document.activeElement) || tour === document.activeElement)
                tour.classList.add("transform-visible");
            else
                tour.classList.remove("transform-visible");
        });
    });

    //Tour Filter Event
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

    //Tour Divs
    let apostlesTour = document.getElementById("ApostlesTour");
    let wineriesTour = document.getElementById("WineriesTour");
    let melbourneTour = document.getElementById("MelbourneTour");

    //Map Divs
    let apostlesMap = document.getElementById("ApostlesMap");
    let wineriesMap = document.getElementById("WineriesMap");
    let melbourneMap = document.getElementById("MelbourneMap");

    //View Trip Buttons
    let apostlesViewBtn = document.getElementById("ApostlesTripBtn");
    let wineriesViewBtn = document.getElementById("WineriesTripBtn");
    let melbourneViewBtn = document.getElementById("MelbourneTripBtn");

    let upcomingTripsBtns = Array.from(document.getElementsByClassName("tourBtn"));

    upcomingTripsBtns.forEach((btn) => {
        btn.addEventListener("click", ()=>{
            let upcomingTrips = btn.nextElementSibling;
            upcomingTrips.classList.toggle("upComingTrips-active");
            btn.classList.toggle("tourBtn-active");
        });
    });

    apostlesTour.addEventListener("click", mapEvent(apostlesMap));
    apostlesTour.addEventListener("mouseleave", mapBlurEvent(apostlesMap));

    wineriesTour.addEventListener("click", mapEvent(wineriesMap));
    wineriesTour.addEventListener("mouseleave", mapBlurEvent(wineriesMap));

    melbourneTour.addEventListener("click", mapEvent(melbourneMap));
    melbourneTour.addEventListener("mouseleave", mapBlurEvent(melbourneMap));

    apostlesMap.addEventListener("click", (e)=>{e.stopPropagation()});
    wineriesMap.addEventListener("click", (e)=>{e.stopPropagation()});
    melbourneMap.addEventListener("click", (e)=>{e.stopPropagation()});

    apostlesViewBtn.addEventListener("click", (e)=>viewBtnEvent(apostlesViewBtn, e));
    wineriesViewBtn.addEventListener("click", (e)=>viewBtnEvent(wineriesViewBtn, e));
    melbourneViewBtn.addEventListener("click", (e)=>viewBtnEvent(melbourneViewBtn, e));
})();

function mapEvent(node){
    return function(){
        node.classList.toggle("transform-active");
        node.parentElement.classList.add("transform-visible");
    }
}

function mapBlurEvent(node){
    return function(){
        node.classList.remove("transform-active");
        node.parentElement.lastElementChild.firstElementChild.classList.remove("tourBtn-active");
        node.parentElement.lastElementChild.lastElementChild.classList.remove("upComingTrips-active");
    }
}

function viewBtnEvent(node, e){
    e.stopPropagation();
}