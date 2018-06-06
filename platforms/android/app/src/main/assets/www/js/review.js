(function() {
    let reviewPage = document.getElementById("page7");
    let reviewStars = Array.from(reviewPage.getElementsByClassName("star"));

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

    reviewFormBtn.addEventListener("click", ()=>{
        let reviewForm = document.getElementById("reviewForm");
        reviewForm.classList.toggle("reviewShow");
    });

    let reviewSubmitBtn = document.getElementById('submitReview');
    reviewSubmitBtn.addEventListener("click", addReview);

})();

function reviewClick(review){
    let hiddenReview = review.getElementsByClassName("reviewHidden")[0];
    return function(){
        (hiddenReview.style.height === "0px" || hiddenReview.style.height ==="")? hiddenReview.style.height = hiddenReview.scrollHeight + "px" :  hiddenReview.style.height = "0";
        review.classList.add("reviewTransform");
    };
}

function loadReviewPage(tour_no, tour_name){
    return function () {
        let title = document.getElementById("tourReviewHeader");
        title.innerText = tour_name;

        getTripsForATour(tour_no);
        loadTourReviews(tour_no);

        $.mobile.changePage("#page7");
    }
}

function loadTourReviews(tour_no){
    $.ajax({
        type: 'GET',
        url: rootUrl + '/tour_reviews/' + tour_no
    }).done((data)=>{

        let allReviewDiv = document.getElementById("reviews");
        let htmlString = '';
        data.forEach((data)=>{
            let review = new Review(data);
            htmlString += review.render();
        });
        allReviewDiv.innerHTML = htmlString;

        /////////////////////////////////////////////////////////////look at this later
        let reviewPage = document.getElementById("page7");
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
        //////////////////////////////////////////////////////////////////

        localStorage.setItem("ReviewTourNo", tour_no);

    }).fail((e)=>{
        alert(e.statusText);
    });
}

class Review extends Component{
    constructor(data, userReview = false){
        super(data);
        this.properties.userReview = userReview;
    }

    //todo: rework front end
    render(){
        let starClass = 'ui-shadow ui-btn ui-corner-all ui-icon-star ui-btn-icon-notext ui-btn-inline';
        return `
            <div class="ui-body ui-body-a review" onclick="reviewClick(this)()">
                <p class="quotation">${this.properties.general_feedback}</p>
                <p class="author">Trip Id: ${this.properties.trip_id} - Date: ${this.properties.departure_date}</p>
                <p class="author">TODO</p>
                <p class="tapReview">Tap to toggle information</p>
                <div class="reviewHidden">
                    <div class="ui-grid-d center">
                        <div class="ui-block-a"><a class="${starClass} ${this.properties.rating >= "1" ? 'reviewStar' : ''}"></a></div>
                        <div class="ui-block-b"><a class="${starClass} ${this.properties.rating >= "2" ? 'reviewStar' : ''}"></a></div>
                        <div class="ui-block-c"><a class="${starClass} ${this.properties.rating >= "3" ? 'reviewStar' : ''}"></a></div>
                        <div class="ui-block-d"><a class="${starClass} ${this.properties.rating >= "4" ? 'reviewStar' : ''}"></a></div>
                        <div class="ui-block-e"><a class="${starClass} ${this.properties.rating >= "5" ? 'reviewStar' : ''}"></a></div>
                    </div>
                    <div class="ui-grid-a">
                    <div class="ui-block-a">
                        <h3 style="margin: 0;">Likes</h3>
                        <div class="likes">
                            <p>${this.properties.likes}</p>
                        </div>
                    </div>
                    <div class="ui-block-b">
                        <h3 style="margin: 0;">Dislikes</h3>
                        <div class="dislikes">
                            <p>${this.properties.dislikes}</p>
                        </div>
                    </div>
                   
                    ${this.properties.userReview ? `<button class="deleteButton" onclick="deleteUserReview(event, ${this.properties.trip_id}, ${this.properties.customer_id}, this)">Delete</button>` : ``}   
                </div>
                </div>
            </div>`;
    }
}

function addReview(){
    let generalFeedback = document.getElementById('generalFeedBack');
    let likes = document.getElementById('likes');
    let dislikes = document.getElementById('dislikes');
    let stars = document.getElementById('reviewForm').getElementsByClassName('star');
    let tripSel = document.getElementById('tripSel');

    let trip_id = tripSel.options[tripSel.selectedIndex].value;

    let rating = 0;
    for(i = 0; i<5; ++i){
        if($(stars[i]).hasClass("reviewStar"))
            ++rating;
    }

    let json = {
        trip_id : trip_id,
        customer_id : localStorage.getItem("CustomerId"),
        rating : rating,
        general_feedback : generalFeedback.value,
        likes : likes.value,
        dislikes: dislikes.value
    };

    $.ajax({
        type: 'POST',
        url : rootUrl + '/insert_review',
        data : json
    })
    .done((data)=>{
        loadTourReviews(localStorage.getItem("ReviewTourNo"));
        clearReviewForm();
    })
    .fail((e)=>{
        alert(e.statusText);
    });
}

function getTripsForATour(tour_no)
{
    $.ajax({
        type : 'GET',
        url : rootUrl + '/tour_trips/' + tour_no
    })
    .done((data)=>{
        let tripSel = document.getElementById('tripSel');
        let htmlString = '';
        data.forEach((tour)=>{
            htmlString += new ReviewTripOption(tour).render();
        });

        tripSel.innerHTML = htmlString;
        $(tripSel).selectmenu( "refresh");
    })
    .fail((e)=>{
        alert(e.statusText);
    });
}

class ReviewTripOption extends Component
{
    constructor(data) {
        super(data);
    }

    render(){
        return `
            <option id="${this.properties.trip_id}" value="${this.properties.trip_id}">ID: ${this.properties.trip_id} - Date: ${this.properties.departure_date}</option>
        `;
    }
}

function clearReviewForm(){
    let generalFeedback = document.getElementById("generalFeedBack");
    let likes = document.getElementById("likes");
    let dislikes = document.getElementById("dislikes");
    let stars = Array.from(document.getElementsByClassName("star"));

    generalFeedback.value = "";
    likes.value = "";
    dislikes.value = "";

    stars.forEach((star) => {
        star.classList.remove("reviewStar");
    });
}