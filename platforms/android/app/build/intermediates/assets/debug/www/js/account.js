function getDetails()
{
    $.ajax({
        type: 'GET',
        url: rootUrl + '/user/' + localStorage.getItem("CustomerId"),
    })
    .done((data)=>{
        fillFields(data);
    })
    .fail((e)=>{
        alert(e.statusText);
    });
}

//TODO REFACTOR EVERYTHING
function fillFields(data){
    let customerIdInput = document.getElementById("accountId");
    let firstInput = document.getElementById("accountFirst");
    let initialInput = document.getElementById("accountInitial");
    let lastInput = document.getElementById("accountLast");
    let emailInput = document.getElementById("accountEmail");
    let phoneInput = document.getElementById("accountPhone");
    let streetNoInput = document.getElementById("accountStreetNo");
    let streetNameInput = document.getElementById("accountStreetName");
    let suburbInput = document.getElementById("accountSuburb");
    let postCodeInput = document.getElementById("accountPostCode");
    let firstSpan = document.getElementById("spanFirst");
    let initialSpan = document.getElementById("spanMiddleInitial");
    let lastSpan = document.getElementById("spanLast");
    let streetNoSpan = document.getElementById("spanStreetNo");
    let streetNameSpan = document.getElementById("spanStreetName");
    let suburbSpan = document.getElementById("spanSuburb");
    let postCodeSpan = document.getElementById("spanPostcode");

    firstSpan.appendChild(document.createTextNode(data.First_Name));
    initialSpan.appendChild(document.createTextNode(data.Middle_Initial));
    lastSpan.appendChild(document.createTextNode(data.Last_Name));
    streetNoSpan.appendChild(document.createTextNode(data.Street_No));
    streetNameSpan.appendChild(document.createTextNode(data.Street_Name));
    suburbSpan.appendChild(document.createTextNode(data.Suburb));
    postCodeSpan.appendChild(document.createTextNode(data.Postcode));

    customerIdInput.value = data.Customer_Id;
    firstInput.value = data.First_Name;
    initialInput.value = data.Middle_Initial;
    lastInput.value = data.Last_Name;
    emailInput.value = data.Email;
    phoneInput.value = data.Phone;
    streetNoInput.value = data.Street_No;
    streetNameInput.value = data.Street_Name;
    suburbInput.value = data.Suburb;
    postCodeInput.value = data.Postcode;


    //addEvent Listeners
    let inputs = [firstInput, initialInput, lastInput, streetNoInput, streetNameInput, suburbInput, postCodeInput];
    let spans = [firstSpan, initialSpan, lastSpan, streetNoSpan, streetNameSpan, suburbSpan, postCodeSpan];

    for(let x = 0; x<inputs.length; ++x){
        inputs[x].addEventListener("keyup", ()=>{
            spans[x].innerText = inputs[x].value;
        });
    }
}






