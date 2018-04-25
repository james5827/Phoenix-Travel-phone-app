let currentDiv = document.getElementById("bookingsDiv");
(function(){
    let invitesTab = document.getElementById("invitesTab");
    let bookingsTab = document.getElementById("bookingsTab");
    let historyTab = document.getElementById("historyTab");

    let bookingsDiv = document.getElementById("bookingsDiv");
    let invitesDiv = document.getElementById("invitesDiv");
    let historyDiv = document.getElementById("historyDiv");

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

    historyTab.addEventListener("click", ()=>{
        if(currentDiv !== historyDiv) {
            historyDiv.classList.remove("invisibleTab");
            currentDiv.classList.add("invisibleTab");
            currentDiv = historyDiv;
        }
    });
})();