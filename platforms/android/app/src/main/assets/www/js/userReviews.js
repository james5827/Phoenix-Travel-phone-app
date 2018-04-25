(function(){
    let userReviewPage = document.getElementById("page8");

    let userReviews = Array.from(userReviewPage.getElementsByClassName("review"));

    userReviewPage.addEventListener("scroll", ()=>{
        userReviews.forEach((review)=>{
            if(window.innerHeight > review.getBoundingClientRect().bottom
                && 0 < review.getBoundingClientRect().top || review.contains(document.activeElement) || review === document.activeElement)
                review.classList.add("reviewTransform");
            else
                review.classList.remove("reviewTransform");
        });
    });
})();

