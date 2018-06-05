function getTours(){
    $.ajax({
            type: 'GET',
            url: rootUrl + '/tours'
        })
        .done(function(data){
            let tourContainer = document.getElementById("filterableTour");
            tourContainer.innerHTML = '';

            data.forEach((tour)=>{
                tourContainer.appendChild(new Tour(tour).render());
            });

            tourPageEvents()
        })
        .fail(function(e){
            alert(e.statusText);
        });
}

function getTrips(list, tour_no){
    $.ajax({
        type: 'GET',
        url: rootUrl + '/tour_trips/' + tour_no
    })
        .done((data)=>{
            let htmlString = '';
            data.forEach((trip)=>{
                htmlString += new Trip(trip).render();
            });
            list.innerHTML = htmlString;
            $(list).listview("refresh");
        })
        .fail((e)=>{
            alert(e.statusText);
        });
}

function tourPageEvents(){
    let tourPage = document.getElementById("page4");
    let tours = Array.from(document.getElementsByClassName("tour"));

    tourPage.addEventListener("scroll", ()=>{
        tours.forEach((tour)=>{
            if(window.innerHeight > tour.getBoundingClientRect().bottom
                && 0 < tour.getBoundingClientRect().top || tour.contains(document.activeElement) || tour === document.activeElement)
                tour.classList.add("transform-visible");
            else
                tour.classList.remove("transform-visible");
        });
    });

    tours.forEach((tour)=>{
        if(window.innerHeight > tour.getBoundingClientRect().top + tour.offsetHeight)
            tour.classList.add("transform-visible");
    });

    $("#filterableTour").filterable({
        filter: function(event, ui) {
            let test = Array.from(ui.items);
            test.forEach((tour)=>{
                if((tour.getBoundingClientRect().top !== 0) && window.innerHeight > tour.getBoundingClientRect().bottom) {
                    tour.firstElementChild.classList.add("transform-visible");
                }else {
                    tour.firstElementChild.classList.remove("transform-visible");
                }
            });
        }
    });
}

class Tour extends Component
{
    constructor(data){
        super(data);
    }

    render(){
            let outerContainer = document.createElement("div");
            outerContainer.innerHTML = `
            <div class="ui-body ui-body-a tour ui-corner-all" tabindex="1">
                <h1>${this.properties.Tour_Name}</h1>
                <p class="tourDescription">${this.properties.Description}</p>
                <div class="map transform"></div>
                <p class="MapClick"><i>Click to see map.</i></p>
                <div>
                    <h5 class="ui-btn ui-btn-active tourBtn" style="margin-bottom: 0;">Upcoming Trips</h5>
                    <div class="upComingTrips">
                        <ul data-role="listview" data-inset="true" class="tourTripList">
                        </ul>
                        <button class="tourReviewBtn ui-btn-active" onclick="loadReviewPage(${this.properties.Tour_no}, '${this.properties.Tour_Name}')()">Reviews</button>
                    </div>
                </div>
            </div>`;

        //TODO add inline event listeners
        let tourDiv = outerContainer.firstElementChild;
        let mapDiv = tourDiv.lastElementChild.previousElementSibling.previousElementSibling;
        let tripDiv = tourDiv.lastElementChild;
        let tripBtn = tripDiv.firstElementChild;
        let tripList = tripDiv.lastElementChild.firstElementChild;

        initMap(mapDiv, this.properties.Route_Map);

        tourDiv.addEventListener("click", mapEvent(mapDiv));
        tourDiv.addEventListener("mouseleave", mapBlurEvent(mapDiv));

        tripDiv.addEventListener("click", (e)=>{e.stopPropagation()});
        mapDiv.addEventListener("click", (e)=>{e.stopPropagation()});

        tripBtn.addEventListener("click", ()=>{
            let upcomingTrips = tripBtn.nextElementSibling;
            upcomingTrips.classList.toggle("upComingTrips-active");
            tripBtn.classList.toggle("tourBtn-active");
        });

        $(tourDiv).enhanceWithin();

        getTrips(tripList, this.properties.Tour_no);
        return outerContainer;
    }
}

class Trip extends Component
{
    constructor(data){
        super(data);
    }

    render(){
        return `<li onclick='getTripBookForm(${JSON.stringify(this.properties)})'><a>${this.properties.Departure_Date}<span>${this.properties.Max_Passengers} - Positions Left</span></a></li>`;
    }
}

function initMap(map, routeMap){
    let apostles = {lat: -38.6621, lng: 143.1051};
    let googleMap = new google.maps.Map(map, {
        zoom: 15,
        center: apostles,
        disableDefaultUI: true
    });
}

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

