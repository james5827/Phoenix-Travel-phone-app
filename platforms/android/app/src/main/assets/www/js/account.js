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

    let ResetPasswordBtn = document.getElementById("ResetPasswordBtn");
    ResetPasswordBtn.addEventListener('click', ResetPassword);
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

    customerIdInput.value = data.customer_id;
    firstInput.value = data.first_name;
    initialInput.value = data.middle_initial;
    lastInput.value = data.last_name;
    emailInput.value = data.email;
    phoneInput.value = data.phone;
    streetNoInput.value = data.street_no;
    streetNameInput.value = data.street_name;
    suburbInput.value = data.suburb;
    postCodeInput.value = data.postcode;

    let setValuesToData = (data) => {
        return function(){
            customerIdInput.value = data.customer_id;
            firstInput.value = data.first_name;
            initialInput.value = data.middle_initial;
            lastInput.value = data.last_name;
            emailInput.value = data.email;
            phoneInput.value = data.phone;
            streetNoInput.value = data.street_no;
            streetNameInput.value = data.street_name;
            suburbInput.value = data.suburb;
            postCodeInput.value = data.postcode;

            firstSpan.innerText = data.first_name;
            initialSpan.innerText = data.middle_initial;
            lastSpan.innerText = data.last_name;
            streetNoSpan.innerText = data.street_no;
            streetNameSpan.innerText = data.street_name;
            suburbSpan.innerText = data.suburb;
            postCodeSpan.innerText = data.postcode;
        }
    };

    setValuesToData(data)();
    let accountResetBtn =  document.getElementById("accountResetBtn");
    accountResetBtn.onclick = setValuesToData(data);
}


function ResetPassword()
{
    let new_password = document.getElementById("new_password");
    let confirm_new_password = document.getElementById("confirm_new_password");

    let npVal = new_password.value;
    let cnpVal = confirm_new_password.value;

    if(npVal === cnpVal){
        let json = {
            customer_id : localStorage.getItem("CustomerId"),
            password : npVal,
            email : localStorage.getItem("Email")
        };

        $.ajax({
            type: 'PUT',
            url: rootUrl + '/reset_password',
            data: json
        })
        .done((data)=>{
            logout();
        })
        .fail((e)=>{
            alert(e.statusText);
        });
    }
}