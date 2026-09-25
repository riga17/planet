document.addEventListener("DOMContentLoaded", function () {

    const smallTitle = document.querySelector(".small-title");
    const heading = document.querySelector(".about-text h1");
    const paragraphs = document.querySelectorAll(".about-text p");
    const button = document.querySelector("#exploreBtn");


    /* ABOUT US */

    setTimeout(function () {

        smallTitle.classList.add("show-small");

    }, 300);


    /* TITLE */

    setTimeout(function () {

        heading.classList.add("show-title");

    }, 700);


    /* PARAGRAPHS */

    paragraphs.forEach(function (paragraph, index) {

        setTimeout(function () {

            paragraph.classList.add("show-paragraph");

        }, 1200 + index * 400);

    });


    /* BUTTON */

    setTimeout(function () {

        button.classList.add("show-button");

    }, 2100);


    /* BUTTON FUNCTION */

    button.addEventListener("click", function () {

        window.location.href = "planets.html";

    });

});