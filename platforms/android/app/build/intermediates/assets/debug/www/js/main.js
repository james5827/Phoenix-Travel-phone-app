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

        let home= $("#homepage");
        let login = $("#page1");

        home.live("pagebeforeshow", function(){

        });
          
		home.live("pagebeforehide", function(){

        });

        login.live("pagebeforeshow", function(event){
        });
                 
        login.live("pageshow", function(){

        });
            
     	login.live("pagebeforehide", function(){

        });

             
});  // end document on pageinit
///////////////////////////////////////// END jquery On Document Ready
