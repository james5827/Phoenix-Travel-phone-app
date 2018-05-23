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

$.ajaxSetup({
    headers: { 'Auth': window.localStorage.getItem("AuthKey") },
    dataType: "json"
});

/////////////////////////////////////////jquery On Document Ready
$(function(){
        // Billk added code
        if(pageinited){return;} else{pageinited= true;}

        $(document).ready(function(){
            $('#myPanel').enhanceWithin().panel();
        });

        let homePage= $("#homepage");
        let loginPage = $("#page1");
        let toursPage = $("#page4");
        let reviewPage = $("#page7");

        homePage.live("pagebeforeshow", ()=>{});

		homePage.live("pagebeforehide",()=>{});

        loginPage.live("pagebeforeshow", ()=>{});
                 
        loginPage.live("pageshow", ()=>{});
            
     	loginPage.live("pagebeforehide", ()=>{});

        toursPage.live("pagebeforeshow", ()=>{
            getTours();
        });

     	toursPage.live("pageshow", ()=>{
            let tours = Array.from(document.getElementsByClassName("tour"));
            tours.forEach((tour)=>{
                if(window.innerHeight > tour.getBoundingClientRect().top + tour.offsetHeight)
                    tour.classList.add("transform-visible");
            });
        });

     	reviewPage.live("pageshow", ()=>{
            let reviews = Array.from(document.getElementsByClassName("review"));
            reviews.forEach((review)=>{
                if(window.innerHeight > review.getBoundingClientRect().bottom
                    && 0 < review.getBoundingClientRect().top || review.contains(document.activeElement) || review === document.activeElement)
                    review.classList.add("reviewTransform");
                else
                    review.classList.remove("reviewTransform");
            });
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
