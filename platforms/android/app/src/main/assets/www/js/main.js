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

        homePage.live("pagebeforeshow", ()=>{
            console.log("before home page");
        });

		homePage.live("pagebeforehide",()=>{});

        loginPage.live("pagebeforeshow", ()=>{});
                 
        loginPage.live("pageshow", ()=>{});
            
     	loginPage.live("pagebeforehide", ()=>{});

     	toursPage.live("pageshow", ()=>{
            let tours = Array.from(document.getElementsByClassName("tour"));
            tours.forEach((tour)=>{
                if(window.innerHeight > tour.getBoundingClientRect().top + tour.offsetHeight)
                    tour.classList.add("transform-visible");
            });
        });

             
});  // end document on pageinit
///////////////////////////////////////// END jquery On Document Ready
