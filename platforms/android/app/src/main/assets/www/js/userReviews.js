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

function loadUserReviews(){
    $.ajax({
        type : 'GET',
        url: rootUrl + '/customer_reviews/' + localStorage.getItem("CustomerId")
    })
    .done((data)=>{
        let userTourReviews = document.getElementById("userTourReviews");
        let currentHeader;
        let tourReviewDiv;

        data.forEach((review)=>{
            if(currentHeader !== review.tour_name) {
                currentHeader = review.tour_name;
                tourReviewDiv = document.createElement('div');
                let headerTitle = document.createElement('h2');
                headerTitle.innerText = review.tour_name;
                tourReviewDiv.appendChild(headerTitle);
            }
            tourReviewDiv.innerHTML += new Review(review, true).render();
            userTourReviews.appendChild(tourReviewDiv);
        });
        $("#page8").trigger('create');
        initUserReviewPageEvents();
    })
    .fail((e)=>{
        alert(e.statusText);
    });
}

function initUserReviewPageEvents() {
    let reviewPage = document.getElementById("page8");
    let reviews = Array.from(reviewPage.getElementsByClassName("review"));
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
        if(window.innerHeight > review.getBoundingClientRect().bottom
            && 0 < review.getBoundingClientRect().top || review.contains(document.activeElement) || review === document.activeElement)
            review.classList.add("reviewTransform");
        else
            review.classList.remove("reviewTransform");
    });
}

function deleteUserReview(e, trip_id, customer_id, component) {

    $.ajax({
        type: 'DELETE',
        url: rootUrl + '/delete_review/' + trip_id + "/" + customer_id
    })
    .done((data)=>{
        let containerDiv = component.parentElement.parentElement.parentElement.parentElement;
        containerDiv.removeChild(component.parentElement.parentElement.parentElement);

        let divChild = document.getElementsByTagName("div");

        if(divChild.length === 1) {
            let header = containerDiv.getElementsByTagName("h2");
            containerDiv.removeChild(header[0]);
        }
    })
    .fail((e)=>{
        alet(e.statusText);
    });

    e.stopPropagation();
}