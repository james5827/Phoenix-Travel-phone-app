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
                console.log("book trip " + data.trip_booking_no + "  " + data.result);
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

    console.log(addPassengers);

    $.ajax({
        type: 'POST',
        url: rootUrl + '/invite_passenger',
        data: {
            tripNo_emailArray : addPassengers
        }
    })
    .done((data)=>{
        console.log(data);
        SearchedAdditionalCustomer.addedPassengers = [];
    })
    .fail((e)=>{
        alert(e.statusText);
    });
}

function getTripBookForm(trip){
    $.mobile.changePage("#page5");
    getItineraries(trip.Tour_No);

    console.log(trip);

    let tourName = document.getElementById("bookingTourName");
    let tripDate = document.getElementById("bookingTripDate");
    let depositAmount = document.getElementById("bookingDepositAmount");
    tourName.value = trip.Tour_Name;
    tripDate.value = trip.Departure_Date;
    depositAmount.value = trip.Standard_Amount;

    let json = {
        trip_id : trip.Trip_Id,
        primary_customer : window.localStorage.getItem("CustomerId"),
        deposit_amount : trip.Standard_Amount
    };

    let bookTripBtn = document.getElementById("bookTripBtn");
    bookTripBtn.onclick = bookTrip(json);
}

function getItineraries(tour_no){
    $.ajax({
        type: 'GET',
        url: rootUrl + /itineraries/ + tour_no
    })
    .done((data)=>{
        console.log(data);
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
        console.log(data);
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
                <td>${this.properties.Day_No}</td>
                <td>${this.properties.Activities}</td>
                <td>${this.properties.Meals}</td>
            </tr>`;
    }
}

class SearchedAdditionalCustomer extends Component {

    constructor(data){
        super(data)
    }

    render(){
        return `
            <li class="tripAddCustomer" onclick="listClick(this)"><a href="#" class="ui-icon-mail">${this.properties.Email}</a></li>
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

    console.log(SearchedAdditionalCustomer.addedPassengers);

    $("#filterAddPassengers").listview("refresh");
}