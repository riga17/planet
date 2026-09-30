document.addEventListener("DOMContentLoaded", function () { /*Pret derisa faqja HTML të ngarkohet plotësisht.*/

    const smallTitle = document.querySelector(".small-title"); /*E gjen në HTML tekstin ABOUT US*/
    const heading = document.querySelector(".about-text h1"); /*E gjen titullin kryesor Explore the Planet*/
    const paragraphs = document.querySelectorAll(".about-text p"); /*I gjen të gjithë paragrafët në pjesën About Us*/
    const button = document.querySelector("#exploreBtn"); /*E gjen butonin Explore Planets.*/



    /* ABOUT US */

    setTimeout(function () {

        smallTitle.classList.add("show-small");

    }, 300);


/*setTimeout i tregon JavaScript-it që të presë një kohë të caktuar para se të bëjë veprimin.
Pastaj smallTitle.classList.add("show-small") i shton elementit ABOUT US klasën show-small për ta shfaqur “ABOUT US” me animacion.*/









    /* TITLE */

    setTimeout(function () {

        heading.classList.add("show-title");

    }, 700);

/*tregon çfarë veprimi duhet të bëhet.*/








    /* PARAGRAPHS */

    paragraphs.forEach(function (paragraph, index) { /*Kalojmë nëpër çdo paragraf dhe i japim 
        secilit një kohë të ndryshme për t’u shfaqur.*/

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