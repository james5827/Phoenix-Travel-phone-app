(function(){
    let firstInput = document.getElementById("accountFirst");
    let initialInput = document.getElementById("accountInitial");
    let lastInput = document.getElementById("accountLast");

    let firstSpan = document.getElementById("spanFirst");
    let initialSpan = document.getElementById("spanMiddleInitial");
    let lastSpan = document.getElementById("spanLast");

    let streetNoInput = document.getElementById("accountStreetNo");
    let streetNameInput = document.getElementById("accountStreetName");
    let suburbInput = document.getElementById("accountSuburb");
    let postCodeInput = document.getElementById("accountPostCode");

    let streetNoSpan = document.getElementById("spanStreetNo");
    let streetNameSpan = document.getElementById("spanStreetName");
    let suburbSpan = document.getElementById("spanSuburb");
    let postCodeSpan = document.getElementById("spanPostcode");

    let inputs = [firstInput, initialInput, lastInput, streetNoInput, streetNameInput, suburbInput, postCodeInput];
    let spans = [firstSpan, initialSpan, lastSpan, streetNoSpan, streetNameSpan, suburbSpan, postCodeSpan];

    for(let x = 0; x<inputs.length; ++x){
        inputs[x].addEventListener("keyup", ()=>{
            spans[x].innerText = inputs[x].value;
        });
    }
})();







