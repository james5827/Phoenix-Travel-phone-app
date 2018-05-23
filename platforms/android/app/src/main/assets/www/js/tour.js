function getTours(){
    $.ajax({
            type: 'GET',
            url: rootUrl + '/tours'
        })
        .done(function(data){
            let allToursDiv = document.getElementById("filterableTour");

            data.forEach(function(tour){
                //outer div
                let tourDiv = document.createElement("div");
                tourDiv.setAttribute('class', 'ui-body ui-body-a tour ui-corner-all');
                tourDiv.setAttribute('id', tour.Tour_Name);
                tourDiv.setAttribute('tabindex', '1');

                //title
                let tourTitle = document.createElement("h1");
                let tourTitleText = document.createTextNode(tour.Tour_Name);
                tourTitle.appendChild(tourTitleText);

                tourDiv.appendChild(tourTitle);

                //description
                let tourDescrption = document.createElement('p');
                let tourDescrptionText = document.createTextNode(tour.Description);
                tourDescrption.setAttribute("class", 'tourDescription');
                tourDescrption.appendChild(tourDescrptionText);

                tourDiv.appendChild(tourDescrption);

                //map div
                let tourMapDiv = document.createElement('div');
                tourMapDiv.setAttribute('class', 'map transform');
                tourMapDiv.setAttribute('id', tour.Tour_Name + " Map");

                tourDiv.appendChild(tourMapDiv);

                //Map Paragraph
                let tourMapP = document.createElement("p");
                tourMapP.setAttribute('id', tour.Tour_Name + 'MapClick');
                tourMapP.setAttribute("class", "MapClick");

                // i tag
                let iTag = document.createElement("i");
                let iTagText = document.createTextNode("Click To See Map");
                iTag.appendChild(iTagText);

                tourMapP.appendChild(iTag);

                tourDiv.appendChild(tourMapP);

                //Trip Div
                let tourTripDiv = document.createElement("div");
                tourTripDiv.setAttribute('id', tour.Tour_Name + " Trips");

                //Trip Div Title
                let tripTitle = document.createElement("h5");
                let tripTitleText = document.createTextNode("Upcoming Trips");
                tripTitle.setAttribute("class", "ui-btn ui-btn-active tourBtn");
                tripTitle.setAttribute("style", "margin-bottom:0;");
                tripTitle.appendChild(tripTitleText);

                tourTripDiv.appendChild(tripTitle);

                //Upcoming Trips List div
                let upComingTrips = document.createElement("div");
                upComingTrips.setAttribute("class", "upComingTrips");

                //list
                let tripList = document.createElement("ul");
                tripList.setAttribute("data-role", "listview");
                tripList.setAttribute("data-filter", "true");
                tripList.setAttribute("class", "tourTripList");

                upComingTrips.appendChild(tripList);

                ////////////////////////////////////////////////////////////////////////////

                let nextPrevBtnDiv = document.createElement("div");
                nextPrevBtnDiv.setAttribute("class", "ui-grid-a tourTripGrid");

                let nextDiv = document.createElement("div");
                nextDiv.setAttribute("class", "ui-block-a");
                let nextBtn = document.createElement("a");
                let nextBtnText = document.createTextNode("Next");
                nextBtn.setAttribute("class", "ui-btn ui-btn-mini ui-shadow tourTripButtons");
                nextBtn.appendChild(nextBtnText);
                nextDiv.appendChild(nextBtn);

                let prevDiv = document.createElement("div");
                prevDiv.setAttribute("class", "ui-block-b");
                let prevBtn = document.createElement("a");
                let prevBtnText = document.createTextNode("Previous");
                prevBtn.setAttribute("class", "ui-btn ui-btn-mini ui-shadow tourTripButtons");
                prevBtn.appendChild(prevBtnText);
                prevDiv.appendChild(prevBtn);

                nextPrevBtnDiv.appendChild(nextDiv);
                nextPrevBtnDiv.appendChild(prevDiv);

                upComingTrips.appendChild(nextPrevBtnDiv);

                /////////////////////////////////////////////////////////////////////////////

                //Review Button
                let reviewsBtn = document.createElement("button");
                let reviewBtnText = document.createTextNode("Reviews");
                reviewsBtn.appendChild(reviewBtnText);
                reviewsBtn.setAttribute("class","tourReviewBtn ui-btn-active");

                upComingTrips.appendChild(reviewsBtn);

                tourTripDiv.appendChild(upComingTrips);

                tourDiv.appendChild(tourTripDiv);

                allToursDiv.appendChild(tourDiv);

                ///////////////////////////////Events Move Later/////////////////////////

                tourDiv.addEventListener("click", mapEvent(tourMapDiv));
                tourDiv.addEventListener("mouseleave", mapBlurEvent(tourMapDiv));

                tourTripDiv.addEventListener("click", (e)=>{e.stopPropagation()});
                tourMapDiv.addEventListener("click", (e)=>{e.stopPropagation()});

                getTrips(tripList, tour.Tour_no);
            });

            let tourPage = document.getElementById("page4");
            let tours = Array.from(document.getElementsByClassName("tour"));

            $(tourPage).enhanceWithin();

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

            let upcomingTripsBtns = Array.from(document.getElementsByClassName("tourBtn"));

            upcomingTripsBtns.forEach((btn) => {
                btn.addEventListener("click", ()=>{
                    let upcomingTrips = btn.nextElementSibling;
                    upcomingTrips.classList.toggle("upComingTrips-active");
                    btn.classList.toggle("tourBtn-active");
                });
            });
        })
        .fail(function(e){
            alert(e.statusText);
        });
}

function getTrips(list, tour_no){
    console.log(tour_no);
    $.ajax({
            type: 'GET',
            url: rootUrl + '/tour_trips/' + tour_no
    })
    .done((data)=>{
        data.forEach((trip)=>{
            let listItem = document.createElement('li');

            let anchor = document.createElement('a');
            let anchorText = document.createTextNode(trip.Departure_Date);
            anchor.appendChild(anchorText);

            let span = document.createElement('span');
            let spanText = document.createTextNode(trip.Max_Passengers);
            span.setAttribute("class", 'tripPositionSpan');
            span.appendChild(spanText);

            anchor.appendChild(span);
            listItem.appendChild(anchor);
            list.appendChild(listItem);
            $(list).listview('refresh');

            initMap();
        });
    })
    .fail((data)=>{
        alert(e.statusText);
    });
}

function initMap(){
    let apostles = {lat: -38.6621, lng: 143.1051};
    let wineries = {lat: -37.6877, lng: 145.4574};
    let melbourne = {lat: -37.8136, lng: 144.9631};

    let apostlesmap = new google.maps.Map(document.getElementById("ApostlesMap"), {
        zoom: 15,
        center: apostles,
        disableDefaultUI: true
    });
}

//TODO: add to onDeviceReady
(function initTourEvents(){

    //Replace with massive for each and add events
    //Tour Divs
    let apostlesTour = document.getElementById("ApostlesTour");

    //Map Divs
    let apostlesMap = document.getElementById("ApostlesMap");

    //View Trip Buttons
    let apostlesViewBtn = document.getElementById("ApostlesTripBtn");

    apostlesTour.addEventListener("click", mapEvent(apostlesMap));
    apostlesTour.addEventListener("mouseleave", mapBlurEvent(apostlesMap));
    apostlesMap.addEventListener("click", (e)=>{e.stopPropagation()});
    apostlesViewBtn.addEventListener("click", (e)=>viewBtnEvent(apostlesViewBtn, e));

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