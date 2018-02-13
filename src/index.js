import 'styles/index.sass';

import {
    burgerAction,
    addNavbarClassOnScroll,
    codeHighlights
} from "./js/dom";
import initDemos from "js/demos";
import faqsUI from "./js/faqs";

(function() {
    burgerAction();
    addNavbarClassOnScroll();
    codeHighlights();

    initDemos();

    if (document.querySelector('#apisearchFaqsSearchInput')) {
        window.setTimeout(() => faqsUI.init());
    }
})();