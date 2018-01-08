import integrationsUI from "./demos/integrationDemo";
import homeUI from "./demos/homeDemo";
import mainDemo from "./demos/mainDemo";

/**
 * Demos
 */
const initDemos = () => {
    /**
     * Home
     */
    if (document.querySelector('.as-homeDemo')) {
        window.setTimeout(() => homeUI.init(), 300);
    }
    if (document.querySelector('.as-integrationDemo')) {
        window.setTimeout(() => integrationsUI.init(), 500);
    }

    /**
     * Product
     */
    if (document.querySelector('.as-mainDemo')) {
        window.setTimeout(() => mainDemo.init());
    }
};

export default initDemos;
