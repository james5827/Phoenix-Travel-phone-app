(function(){
    let addCustomers = Array.from(document.getElementsByClassName("tripAddCustomer"));

    addCustomers.forEach((btn) => {
        btn.addEventListener("click", listClick);
    });
})();

function listClick(){
    this.firstElementChild.classList.add("ActiveList", "ui-icon-delete");
    this.firstElementChild.classList.remove("ui-icon-mail");
    this.parentElement.nextElementSibling.appendChild(this);

    $("#testman").filterable("refresh");
    this.removeEventListener("click", listClick);
    this.addEventListener("click", invitedListClick);
}

function invitedListClick(){
    this.firstElementChild.classList.add("ui-icon-mail");
    this.firstElementChild.classList.remove("ActiveList");
    this.parentElement.previousElementSibling.appendChild(this);

    $("#testman").filterable("refresh");
    this.removeEventListener("click", invitedListClick);
    this.addEventListener("click", listClick);
}

function bookTrip(trip){
    console.log(trip);
    $.mobile.changePage("#page5");
    getItineraries(trip.Tour_No);
}

function getItineraries(tour_no){
    $.ajax({
        type: 'GET',
        url: rootUrl + /itineraries/ + tour_no
    })
    .done(()=>{

    })
    .fail((e)=>{
        alert(e.statusText);
    });
}