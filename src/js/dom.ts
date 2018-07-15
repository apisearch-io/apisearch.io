import * as hljs from "highlight.js";

/**
 * Add navbar class on scroll down
 */
export const addNavbarClassOnScroll = () => window
    .addEventListener('scroll', () => {
        let navbar = document.querySelector('#primaryNavbar');

        if (window.pageYOffset > 10) {
            navbar.classList.add('c-navbar--scroll');
        } else {
            navbar.classList.remove('c-navbar--scroll');
        }
    });

/**
 * Navbar toggle
 */
export const burgerAction = () => document
    .querySelector('#burgerSidebarMenu')
    .addEventListener('click', () => {
        let menu = document.querySelector('#headerNavbar');
        let main = document.querySelector('main');

        if (menu.className.indexOf('d-block') === -1) {
            menu.classList.add('d-block');
            menu.classList.remove('d-none');
            main.classList.add('navbar-is-open');
        } else {
            menu.classList.add('d-none');
            menu.classList.remove('d-block');
            main.classList.remove('navbar-is-open');
        }
    });

/**
 * Highlight DOM code
 */
export const codeHighlights = () => {
    hljs.configure({useBR: true});
    const code = document.querySelectorAll('code')
    for (var i = 0; i < code.length; i++) {
        hljs.highlightBlock(code[i])
    }
};