import integrationsUI from "./demos/integrationsDemo";
import homeUI from "./demos/homeDemo";

/**
 * Demos
 */
const initDemos = () => {
    if (document.querySelector('.as-homeDemo__searchBox')) {
        window.setTimeout(() => homeUI.init(), 300);
    }
    if (document.querySelector('.as-integrationDemo__searchBox')) {
        window.setTimeout(() => integrationsUI.init(), 500);
    }
};

export default initDemos;
