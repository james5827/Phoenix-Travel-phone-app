let currentDiv = document.getElementById("bookingsDiv");
(function(){
    let invitesTab = document.getElementById("invitesTab");
    let bookingsTab = document.getElementById("bookingsTab");

    let bookingsDiv = document.getElementById("bookingsDiv");
    let invitesDiv = document.getElementById("invitesDiv");

    bookingsTab.addEventListener("click", ()=>{
        if(currentDiv !== bookingsDiv) {
            bookingsDiv.classList.remove("invisibleTab");
            currentDiv.classList.add("invisibleTab");
            currentDiv = bookingsDiv;
        }
    });

    invitesTab.addEventListener("click", ()=>{
        if(currentDiv !== invitesDiv) {
            invitesDiv.classList.remove("invisibleTab");
            currentDiv.classList.add("invisibleTab");
            currentDiv = invitesDiv;
        }
    });
})();

function bookingClick(booking){
    let hidden = booking.getElementsByClassName("hiddenBookingInformation");
    let toggle = booking.getElementsByClassName("toggleParagraph");

    toggle[0].classList.toggle("hideToggle");
    hidden[0].classList.toggle("showBookingInformation");
}

function getBookings() {
    $.ajax({
        type: 'GET',
        url: rootUrl + '/customer_bookings/' + localStorage.getItem("CustomerId")
    })
    .done((data)=>{
        let allBookingsDiv = document.getElementById("bookingsContent");
        allBookingsDiv.innerHTML = "";

        data.forEach((booking)=>{
            allBookingsDiv.appendChild(new Booking(booking).render());
        });

        $(document).enhanceWithin();
    })
    .fail((e)=>{
        alert(e.statusText);
    });
}

class Booking extends Component
{
    constructor(data){
        super(data);
    }

    render(){
        let outerContainer = document.createElement("div");
        outerContainer.innerHTML = `
            <div class="ui-body ui-body-a booking ui-corner-all" onclick="bookingClick(this)">
                <h2 class="inviteTitle" style="margin-top: 0"><span>${this.properties.Tour_Name}</span></h2>
                <h4 class="inviteTitle" style="margin-bottom: 0">Departure date: <span>${this.properties.Departure_Date}</span></h4>
                <p class="toggleParagraph">Tap to toggle information</p>

                <div class="hiddenBookingInformation bookingTransformHeight">
                    <h4 class="inviteTitle">Booking Date: <span>${this.properties.Booking_Date}</span></h4>
                    <h4 class="inviteTitle">Deposit Amount: <span>${this.properties.Deposit_Amount}</span></h4>
                    <h4 class="inviteTitle">Duration: <span>35 Days</span></h4>
                    <h2 style="margin-bottom: 0;">Additional Passengers</h2>
                    <div class="additionalPassengers">
                    </div>
                    <button class="decline">Delete</button>
                </div>
            </div>`;

        let element = outerContainer.lastElementChild.lastElementChild.lastElementChild.previousElementSibling;
        getAdditionalPassengers(element, this.properties.Trip_Booking_No);

        return outerContainer;
    }
}

function getAdditionalPassengers(el, trip_booking_no) {
    $.ajax({
        type: 'GET',
        url: rootUrl + '/additional_customers_bookings/' + trip_booking_no
    })
        .done((data)=>{
            let htmlString = '';

            if(data[0]) {
                data.forEach((passenger)=>{
                    htmlString += new AdditionalPassenger(passenger).render();
                });
                el.innerHTML = htmlString;
            }
        })
        .fail((e)=>{
            alert(e.statusText);
        });
}

function getInvites() {
    $.ajax({
        type: 'GET',
        url: rootUrl + '/customer_invites/' + localStorage.getItem('CustomerId')
    })
    .done((data)=>{
        let allInvitesDiv = document.getElementById("invitesContent");
        let htmlString = '';

        data.forEach((invite) => {
            htmlString += new Invite(invite).render();
        });

        allInvitesDiv.innerHTML = htmlString;
    })
    .fail((e)=>{
        alert(e.statusText);
    });
}

function acceptInvite(component, Trip_Booking_No){

}

function declineInvite(component, Trip_Booking_No){

}

class AdditionalPassenger extends Component
{
    constructor(data){
        super(data);
    }

    render(){
        let classList = "ui-btn ui-btn-inline ui-shadow ui-corner-all ui-btn-icon-right";
        return `
            <button class="${classList} ${this.properties.Accepted_Invite === "1" ? 'ui-icon-check' : 'ui-icon-mail'}">
                ${this.properties.First_Name} ${this.properties.Middle_Initial} ${this.properties.Last_Name}
            </button>
        `;
    }
}

class Invite extends Component
{
    constructor(data){
        super(data);
    }

    render(){
        return `
            <div class="ui-body ui-body-a invites">
                    <h4 class="inviteTitle">Booking Number: <span>${this.properties.Trip_Booking_No}</span></h4>
                    <h4 class="inviteTitle">Tour: <span>${this.properties.Tour_Name}</span></h4>
                    <h4 class="inviteTitle">Departure date: <span>${this.properties.Departure_Date}</span></h4>
                    <h4 class="inviteTitle" style="margin-bottom: 0;">Inviter: <span>${this.properties.First_Name} ${this.properties.Middle_Initial} ${this.properties.Last_Name}</span></h4>

                    <div class="ui-grid-a">
                        <div class="ui-block-a" style="padding-right: 2px">
                            <button class="ui-btn ui-shadow ui-corner-all ui-btn-icon-right ui-icon-check accept" onclick="acceptInvite(this, ${this.properties.Trip_Booking_No})">Accept</button>
                        </div>
                        <div class="ui-block-b" style="padding-left: 2px">
                            <button class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-delete decline" onclick="declineInvite(this, ${this.properties.Trip_Booking_No})">Decline</button>
                        </div>
                    </div>
                </div>`;
    }
}