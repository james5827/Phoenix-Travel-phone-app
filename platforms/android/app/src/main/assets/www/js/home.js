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

    let bookings = Array.from(document.getElementsByClassName("booking"));

    bookings.forEach((booking)=>{
        booking.addEventListener("click", ()=>{
            console.log("hello");

            let hidden = booking.getElementsByClassName("hiddenBookingInformation");
            let toggle = booking.getElementsByClassName("toggleParagraph");

            toggle[0].classList.toggle("hideToggle");

            hidden[0].classList.toggle("showBookingInformation");
        });
    });
})();