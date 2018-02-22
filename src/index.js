import 'styles/index.sass';

import {
    burgerAction,
    addNavbarClassOnScroll,
    codeHighlights
} from "./js/dom";
import initDemos from "js/demos";
import faqsUI from "./js/faqs";
import MachineLearningDemo from "./js/machineLearningDemo";

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

    /**
     * Machine Learning Demo
     */
    if (document.querySelector('#machineLearningDemo')) {
        (new MachineLearningDemo()).initialize();
    }
})();