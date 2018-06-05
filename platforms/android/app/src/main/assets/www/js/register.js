
//TODO improve validation drastically
(function(){
    let name = document.getElementById("name");
    let address = document.getElementById("address");
    let email = document.getElementById("registerEmail");
    let password = document.getElementById("registerPassword");
    let confirmPassword = document.getElementById("registerConfirmPassword");
    let phone = document.getElementById("phoneNumber");

    let registerBtn = document.getElementById("registerBtn");
    let registerClearBtn = document.getElementById("registerClearBtn");
    registerClearBtn.addEventListener('click', registerClear)

    registerBtn.addEventListener("click", function(){
        let splitName = separateName(name.value);

        //TODO IMPROVE
        let first =  splitName[0];
        let inital = splitName.length === 3 ? splitName[1] : null;
        let last = splitName.length === 3 ? splitName[2] : splitName[1];

        let splitAddress = separateAddress(address.value);

        $json = {
            first_name : splitName[0],
            middle_initial : splitName[1],
            last_name : splitName[2],
            street_no : splitAddress[0],
            street_name : splitAddress[1],
            suburb : splitAddress[2],
            postcode : splitAddress[3],
            email : email.value,
            password : password.value,
            phone : phone.value
        };

        $.ajax({
            type : 'POST',
            url : rootUrl + '/register',
            data : $json
        })
        .done(function(data){
            alert("Registration Successful");
            window.localStorage.setItem("AuthKey", data);
            $.mobile.changePage("#page3");
        })
        .fail(function(e){
            alert(e.statusText);
        });
    });
})();

function separateName(name){
    return name.split(/\s+/, 3);

}

function separateAddress(address){
    return address.split(/\s+/, 4);
}

function validateRegistration(){

}

function registerClear(){
    let name = document.getElementById("name");
    let address = document.getElementById("address");
    let email = document.getElementById("registerEmail");
    let password = document.getElementById("registerPassword");
    let confirmPassword = document.getElementById("registerConfirmPassword");
    let phone = document.getElementById("phoneNumber");

    name.value = '';
    address.value = '';
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
    phone.value = '';
}