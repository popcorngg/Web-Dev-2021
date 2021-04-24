const navigation = document.getElementById('navigation');

window.addEventListener('scroll', function() {

    let top = window.pageYOffset || document.documentElement.scrollTop;

    navigation.classList.toggle("slicky", top > 50);
    // navigation.classList.toggle("slicky", window.scrollY > 50);

});

// =========================================
let mainNavLinks = document.querySelectorAll("nav ul li a");

const topOffset = document.querySelector('#navigation').offsetHeight;

mainNavLinks.forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();

        if (link.hasAttribute('data-scroll')) {
            let blockID = link.getAttribute('data-scroll').substring(1);
            const top = document.getElementById(blockID).offsetTop - topOffset;
            window.scrollTo({
                top,
                left: 0,
                behavior: "smooth",
            });
        }
    });
});