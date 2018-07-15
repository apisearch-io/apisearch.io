import {
    burgerAction,
    addNavbarClassOnScroll,
    codeHighlights
} from "./js/dom";
import initDemos from "./js/demos";
import faqsUI from "./js/faqs";

(function() {
    burgerAction();
    addNavbarClassOnScroll();
    codeHighlights();

    /**
     * Site demos
     */
    initDemos();

    /**
     * Faqs page
     */
    if (document.querySelector('#apisearchFaqsSearchInput')) {
        faqsUI.init();
    }
})();