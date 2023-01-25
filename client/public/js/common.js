$(document).ready(function () {
    $(".menu-toggle").on("click", function () {
        var topVal = 45;
        if ($(this).hasClass("active")) {
            topVal = -980;
            $(this).removeClass("active");
        } else {
            $(this).addClass("active");
        }
        $("nav").stop().animate(
            {
                top: topVal,
            },
            600
        );
        $("nav ul li a").click(function () {
            $(".menu-toggle").removeClass("active");
            $("nav").stop().animate(
                {
                    top: -980,
                },
                600
            );
        });
    });
    //Toast
    $('.toast').toast('show');



    //pagination pet page
    var items = $(".home-main-all .pet-user-all");
    var numItems = items.length;
    var perPage = 8;
    items.slice(perPage).hide();

    $('#pagination-container').pagination({
        items: numItems,
        itemsOnPage: perPage,
        prevText: "&laquo;",
        nextText: "&raquo;",
        onPageClick: function (pageNumber) {
            var showFrom = perPage * (pageNumber - 1);
            var showTo = showFrom + perPage;
            items.hide().slice(showFrom, showTo).show();
        }
    });
});

//dropdown
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        } else {
            dropdownContent.style.display = "block";
        }
    });
}

const images = [
    "random1.jpg",
    "random2.jpg",
    "random3.jpg",
    "random4.jpg",
    "random5.jpg",
    "random6.jpg",
    "random7.jpg",
    "random8.jpg",
    "random9.jpg",
    "random10.jpg",
    "random11.jpg",
];
const randomImageElements = document.querySelectorAll(".random-image");
randomImageElements.forEach(function (image) {
    const randomIndex = Math.floor(Math.random() * images.length);
    image.src = "/image/" + images[randomIndex];
});

const catImg = [
    "c1.jpg",
    "c2.jpg",
    "c3.jpg",
    "c4.jpg",
    "c5.jpg",
    "c6.jpg",
    "c7.jpg",
    "c8.jpg",
    "c9.jpg",
    "c10.jpg",
    "c11.jpg",
];
const catImageElements = document.querySelectorAll(".cat-image");
catImageElements.forEach(function (image) {
    const catIndex = Math.floor(Math.random() * catImg.length);
    image.src = "/image/" + catImg[catIndex];
});


//pet form
const fileInput = document.getElementById("images");
const image = document.getElementById("image");
fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
        image.src = event.target.result;
    };

    reader.readAsDataURL(file);
});

