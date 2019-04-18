import {
    burgerAction,
    addNavbarClassOnScroll,
    codeHighlights
} from "./js/dom";
import initDemos from "./js/demos";

(function() {
    burgerAction();
    addNavbarClassOnScroll();
    codeHighlights();

    /**
     * Site demos
     */
    initDemos();
})();