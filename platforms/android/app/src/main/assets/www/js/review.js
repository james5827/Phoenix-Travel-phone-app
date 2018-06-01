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

        }).fail((e)=>{
            alert(e.statusText);
        });

        $.mobile.changePage("#page7");
    }
}

class Review extends Component{
    constructor(data){
        super(data);
    }

    //todo: rework front end
    render(){
        let starClass = 'ui-shadow ui-btn ui-corner-all ui-icon-star ui-btn-icon-notext ui-btn-inline';
        return `
            <div class="ui-body ui-body-a review" onclick="reviewClick(this)()">
                <p class="quotation">${this.properties.General_Feedback}</p>
                <p class="author">Trip Id: ${this.properties.Trip_Id} - Date: ${this.properties.Departure_Date}</p>
                <p class="author">TODO</p>
                <p class="tapReview">Tap to toggle information</p>
                <div class="reviewHidden">
                    <div class="ui-grid-d center">
                        <div class="ui-block-a"><a class="${starClass} ${this.properties.Rating >= "5" ? 'reviewStar' : ''}"></a></div>
                        <div class="ui-block-b"><a class="${starClass} ${this.properties.Rating >= "4" ? 'reviewStar' : ''}"></a></div>
                        <div class="ui-block-c"><a class="${starClass} ${this.properties.Rating >= "3" ? 'reviewStar' : ''}"></a></div>
                        <div class="ui-block-d"><a class="${starClass} ${this.properties.Rating >= "2" ? 'reviewStar' : ''}"></a></div>
                        <div class="ui-block-e"><a class="${starClass} ${this.properties.Rating >= "1" ? 'reviewStar' : ''}"></a></div>
                    </div>
                    <div class="ui-grid-a">
                    <div class="ui-block-a">
                        <h3 style="margin: 0;">Likes</h3>
                        <div class="likes">
                            <p>${this.properties.Likes}</p>
                        </div>
                    </div>
                    <div class="ui-block-b">
                        <h3 style="margin: 0;">Dislikes</h3>
                        <div class="dislikes">
                            <p>${this.properties.Dislikes}</p>
                        </div>
                    </div>   
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

    console.log(tripSel.options[tripSel.selectedIndex].value);

    let rating = 0;
    for(i = 0; i<5; ++i){
        if($(stars[i]).hasClass("reviewStar"))
            ++rating;
    }
    console.log(rating);

    let json = {
        trip_id : trip_id,
        customer_id : localStorage.getItem("CustomerId"),
        rating : rating,
        general_feedback : generalFeedback.value,
        likes : likes.value,
        dislikes: dislikes.value
    };

    console.log(json);

    $.ajax({
        type: 'POST',
        url : rootUrl + '/insert_review',
        data : json
    })
    .done((data)=>{
        console.log(data);
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
        console.log(data);
        super(data);
    }

    render(){
        return `
            <option id="${this.properties.Trip_Id}" value="${this.properties.Trip_Id}">ID: ${this.properties.Trip_Id} - Date: ${this.properties.Departure_Date}</option>
        `;
    }
}