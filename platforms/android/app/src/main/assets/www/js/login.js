(function(){
    let loginBtn = document.getElementById("loginBtn");
    let email = document.getElementById("loginEmail");
    let password = document.getElementById("loginPassword");
    let logoutBtn = document.getElementById("logout");

    loginBtn.addEventListener("click", () => {
        let json = {
            'email' : email.value,
            'password' : password.value
        };

        $.ajax({
                type: 'POST',
                url: rootUrl + '/login',
                data: json
            })
            .done(function(data){
                alert("Login Successful");
                email.value = "";
                password.value = "";

                console.log(data);

                window.localStorage.setItem("CustomerId", data[0]);
                window.localStorage.setItem("AuthKey", data[1]);
                window.localStorage.setItem("Email", data[2]);
                initAjaxSettings(data[1]);

                $.mobile.changePage("#page3");
            })
            .fail(function(e){
                alert(e.statusText);
                password.value = "";
            });
    });

    logoutBtn.addEventListener("click", logout);
})();

function logout() {
    window.localStorage.clear();
    $.mobile.changePage("#page1");
}