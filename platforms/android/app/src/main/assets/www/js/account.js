(function(){
    let inputs = [document.getElementById("accountFirst"), document.getElementById("accountInitial"), document.getElementById("accountLast"),
                  document.getElementById("accountStreetNo"), document.getElementById("accountStreetName"),
                    document.getElementById("accountSuburb"), document.getElementById("accountPostCode")];
    let spans = [document.getElementById("spanFirst"), document.getElementById("spanMiddleInitial"), document.getElementById("spanLast"),
                 document.getElementById("spanStreetNo"), document.getElementById("spanStreetName"), document.getElementById("spanSuburb"),
                 document.getElementById("spanPostcode")];

    for(let x = 0; x<inputs.length; ++x){
        inputs[x].addEventListener("input", ()=>{
            spans[x].innerText = inputs[x].value;
        });
    }

    let saveBtn = document.getElementById('accountSaveBtn');
    saveBtn.addEventListener('click', ()=>{
        saveDetails();
    });
})();

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

function saveDetails(password = localStorage.getItem('AuthKey')){
    let json = {
        customer_id : localStorage.getItem('CustomerId'),
        first_name : document.getElementById("accountFirst").value,
        middle_initial: document.getElementById('accountInitial').value,
        last_name: document.getElementById('accountLast').value,
        street_no: document.getElementById('accountStreetNo').value,
        street_name: document.getElementById('accountStreetName').value,
        suburb : document.getElementById('accountSuburb').value,
        postcode : document.getElementById('accountPostCode').value,
        email : document.getElementById('accountEmail').value,
        password : password,
        phone : document.getElementById('accountPhone').value
    };

    $.ajax({
        type: 'PUT',
        url: rootUrl + '/update_account',
        data: json
    })
    .done((data)=>{
        if(data) {
            getDetails();
            alert("Account Updated");
        }
    })
    .fail((e)=>{
        alert(e.statusText);
    });
}

//TODO Save Password

//IM SO SORRY
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

    let setValuesToData = (data) => {
        return function(){
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

            firstSpan.innerText = data.First_Name;
            initialSpan.innerText = data.Middle_Initial;
            lastSpan.innerText = data.Last_Name;
            streetNoSpan.innerText = data.Street_No;
            streetNameSpan.innerText = data.Street_Name;
            suburbSpan.innerText = data.Suburb;
            postCodeSpan.innerText = data.Postcode;
        }
    };

    setValuesToData(data)();
    let accountResetBtn =  document.getElementById("accountResetBtn");
    accountResetBtn.onclick = setValuesToData(data);
}