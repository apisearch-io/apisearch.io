import integrationsUI from "./demos/integrationDemo";
import homeUI from "./demos/homeDemo";
import mainDemo from "./demos/mainDemo";
import filtersDemo from "./demos/filtersDemo";

/**
 * Demos
 */
const initDemos = () => {
    /**
     * Home
     */
    if (document.querySelector('.as-homeDemo')) {
        window.setTimeout(() => homeUI.init());
    }
    if (document.querySelector('.as-integrationDemo')) {
        window.setTimeout(() => integrationsUI.init(), 1000);
    }

    /**
     * Product
     */
    if (document.querySelector('.as-mainDemo')) {
        window.setTimeout(() => mainDemo.init());
    }
    if (document.querySelector('.as-filtersDemo')) {
        window.setTimeout(() => filtersDemo.init(), 1000);
    }
};

export default initDemos;
