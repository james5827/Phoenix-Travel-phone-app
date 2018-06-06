(function(){
    let addCusSearch = document.getElementById("addCustomersSearch");

    let ajaxTimeout = null;
    addCusSearch.addEventListener("keyup", (event)=>{
        ajaxTimeout ? clearTimeout(ajaxTimeout) : null;

        ajaxTimeout = setTimeout(()=>{
            findAdditionalCustomer(event.target.value);
        }, 1000);
    });
})();

function bookTrip(json){
    return () =>{
        $.ajax({
                type: 'POST',
                url: rootUrl + '/book_trip',
                data: json
            })
            .done((data)=>{
                if(data.result)
                {
                    bookAdditionalPassengers(data.trip_booking_no);
                    $.mobile.changePage("#page3");
                }
            })
            .fail((e)=>{
                alert(e.statusText);
            });
        };
}

function bookAdditionalPassengers(trip_booking_no)
{
    let addPassengers = SearchedAdditionalCustomer.addedPassengers.slice();
    addPassengers.unshift(trip_booking_no);

    $.ajax({
        type: 'POST',
        url: rootUrl + '/invite_passenger',
        data: {
            tripNo_emailArray : addPassengers
        }
    })
    .done((data)=>{
        SearchedAdditionalCustomer.addedPassengers = [];
    })
    .fail((e)=>{
        alert(e.statusText);
    });
}

function getTripBookForm(trip){
    $.mobile.changePage("#page5");

    console.log(trip);

    getItineraries(trip.tour_no);

    let tourName = document.getElementById("bookingTourName");
    let tripDate = document.getElementById("bookingTripDate");
    let depositAmount = document.getElementById("bookingDepositAmount");
    tourName.value = trip.tour_name;
    tripDate.value = trip.departure_date;
    depositAmount.value = trip.standard_amount;

    let json = {
        trip_id : trip.trip_id,
        primary_customer : window.localStorage.getItem("CustomerId"),
        deposit_amount : trip.standard_amount
    };

    let bookTripBtn = document.getElementById("bookTripBtn");
    bookTripBtn.onclick = bookTrip(json);
}

function getItineraries(tour_no){

    console.log(tour_no);

    $.ajax({
        type: 'GET',
        url: rootUrl + '/itineraries/' + tour_no
    })
    .done((data)=>{
        let itineraryBody = document.getElementById('itineraryBody');
        itineraryBody.innerHTML = '';

        let htmlBodyString = '';
        data.forEach((itinerary) => {
            let itineraryObject = new Itinerary(itinerary);
            htmlBodyString += itineraryObject.render();
        });
        itineraryBody.innerHTML= htmlBodyString;

        $(itineraryBody.parentElement).table("refresh");
    })
    .fail((e)=>{
        alert(e.statusText);
    });
}

function findAdditionalCustomer(email){
    let inviteList = document.getElementById("filterAddPassengers");
    $.ajax({
        type: 'GET',
        url: rootUrl + '/additional_passenger_email/' + (email === '' ? "<" : email)
    })
    .done((data)=>{
        let htmlString = '';
        data.forEach((customer) => {
            htmlString += new SearchedAdditionalCustomer(customer).render();
        });
        inviteList.innerHTML = htmlString;
        $(inviteList).listview("refresh");
    }).fail((e)=>{
        alert(e.statusText);
    });
}

class Itinerary extends Component
{
    constructor(data){
        super(data);
    }

    render(){
        return `
            <tr>
                <td>${this.properties.day_no}</td>
                <td>${this.properties.activities}</td>
                <td>${this.properties.meals}</td>
            </tr>`;
    }
}

class SearchedAdditionalCustomer extends Component {

    constructor(data){
        super(data)
    }

    render(){
        return `
            <li class="tripAddCustomer" onclick="listClick(this)"><a href="#" class="ui-icon-mail">${this.properties.email}</a></li>
        `;
    }
}

SearchedAdditionalCustomer.addedPassengers = [];

function listClick(element){
    let el = element.firstElementChild;

    if($(el).hasClass("ActiveList")) {
        el.classList.remove('ActiveList', 'ui-icon-delete');
        el.classList.add('ui-icon-mail');

        SearchedAdditionalCustomer.addedPassengers.pop();

        element.parentElement.previousElementSibling.appendChild(element);
    } else {
        el.classList.remove('ui-icon-mail');
        el.classList.add('ActiveList', 'ui-icon-delete');

        SearchedAdditionalCustomer.addedPassengers.push(el.textContent);

        element.parentElement.nextElementSibling.appendChild(element);
    }

    $("#filterAddPassengers").listview("refresh");
}