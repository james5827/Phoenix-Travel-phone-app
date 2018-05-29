/*
 Creator:Bill Kascamanidis
 Creation Date: 17/12/2016
 Current Version: 10
 Current Revision: 2
 Last Modified: 04/2/2017 22:00
 Last Modified by: Bill Kascamanidis
*/
/////////////////////////////////////////Variable Declaration
var pageinited = false;
var rootUrl = "http://localhost/index.php";
/////////////////////////////////////////jquery On Document Ready
$(function(){
        // Billk added code
    if(pageinited){return;} else{pageinited= true;}

    let key = window.localStorage.getItem("AuthKey");
    initAjaxSettings(key);

    $(document).ready(function(){
        $('#myPanel').enhanceWithin().panel();
    });

    let toursPage = $("#page4");
    let accountPage = $("#page6");
    let homepage = $("#page3");

    homepage.live("pagebeforeshow", ()=>{
        getBookings();
        getInvites();
    });

    toursPage.live("pagebeforeshow", ()=>{
        getTours();
    });

    accountPage.live("pagebeforeshow", () => {
        getDetails();
    });

    let tourHeader = document.getElementById("page4");
    tourHeader.addEventListener("scroll", pageScrollEvent(tourHeader));
    let reviewHeader = document.getElementById("page7");
    reviewHeader.addEventListener("scroll", pageScrollEvent(reviewHeader));

    function pageScrollEvent(page){
        let previous = page.scrollTop;
        let header = page.firstElementChild.classList;
        return function(){
            page.scrollTop > previous ? header.add("header-up") : header.remove("header-up");
            previous = page.scrollTop;
        }
    }
});  // end document on pageinit
///////////////////////////////////////// END jquery On Document Ready

function initAjaxSettings(key){
    $.ajaxSetup({
        headers: {'Auth': key},
        dataType: "json"
    });
}

class Component
{
    constructor(data){
        for(let prop in data)
        {
            data[prop] = data[prop] != null ? escapeHtml(data[prop]) :  '';
        }

        this.properties = data;
    }
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}