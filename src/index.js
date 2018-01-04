import 'styles/index.sass';

(function() {
    window
        .addEventListener('scroll', () => {
            let navbar = document.querySelector('#primaryNavbar');

            if (window.pageYOffset > 10) {
                navbar.classList.add('c-navbar--scroll');
            } else {
                navbar.classList.remove('c-navbar--scroll');
            }
        })
    ;
})();