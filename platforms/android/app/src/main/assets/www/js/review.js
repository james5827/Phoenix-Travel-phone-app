(function() {
    let reviewPage = document.getElementById("page7");
    let reviews = Array.from(document.getElementsByClassName("review"));
    let reviewStars = Array.from(reviewPage.getElementsByClassName("star"));

    reviewPage.addEventListener("scroll", ()=>{
        reviews.forEach((review)=>{
            if(window.innerHeight > review.getBoundingClientRect().bottom
                && 0 < review.getBoundingClientRect().top || review.contains(document.activeElement) || review === document.activeElement)
                review.classList.add("reviewTransform");
            else
                review.classList.remove("reviewTransform");
        });
    });

    reviews.forEach((review)=>{
        review.addEventListener("click", reviewClick(review));
    });

    reviewStars.forEach((star)=>{
        star.addEventListener("click", ()=>{
           star.classList.add("reviewStar");

           let backStar = star.parentElement.previousElementSibling;
           let forwardStar = star.parentElement.nextElementSibling;

           while(forwardStar !== null && $(forwardStar.firstElementChild).hasClass("reviewStar")){

               forwardStar.firstElementChild.classList.remove("reviewStar");
               forwardStar = forwardStar.nextElementSibling;
           }

           while(backStar !== null && !$(backStar.firstElementChild).hasClass("reviewStar")){
               backStar.firstElementChild.classList.add("reviewStar");
               backStar = backStar.previousElementSibling;
           }
        });
    });

    let reviewFormBtn = document.getElementById("formRevealBtn");

    reviewFormBtn.addEventListener("click", (form)=>{
        let reviewForm = document.getElementById("reviewForm");
        reviewForm.classList.toggle("reviewShow");
    });
})();

function reviewClick(review){
    let hiddenReview = review.getElementsByClassName("reviewHidden")[0];
    return function(){
        (hiddenReview.style.height === "0px" || hiddenReview.style.height ==="")? hiddenReview.style.height = hiddenReview.scrollHeight + "px" :  hiddenReview.style.height = "0";
        review.classList.add("reviewTransform");
    };

}