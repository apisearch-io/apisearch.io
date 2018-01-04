import 'styles/index.sass';

import hljs from "highlight.js";
import apisearchUI from "apisearch-ui";

hljs.configure({useBR: true});


const addNavbarClassOnScroll = () => {
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
};

const integrationsApisearchDemo = () => {
    let ui = apisearchUI({
        appId: '54725861',
        index: '66777162',
        token: 'daf93c2b-40bc-49f2-870e-f8f62ea524ad'
    });

    ui.addWidgets(
        ui.widgets.simpleSearch({
            target: '.as-integrationDemo__searchBox',
            template: {
                clearSearch: '<i class="fa fa-times-circle" aria-hidden="true"></i>'
            }
        }),
        ui.widgets.result({
            target: '.as-integrationDemo__results',
            itemsPerPage: 3,
            promote: [
                { id: 'album', type: 'purpose-mw0002885819' },
                { id: 'album', type: 'crazy-love-mw0000828548' },
                { id: 'album', type: 'classic-queen-mw0000085540' },
            ],
            template: {
                itemsList: `<ul>
                    {{#items}} 
                    <li>
                        <img src="{{metadata.img}}" height="40px">
                        {{metadata.title}}
                    </li> 
                    {{/items}}
                    {{^items}} 
                    <li>
                        <i class="fa fa-meh-o" aria-hidden="true"></i>
                        No results
                    </li> 
                    {{/items}}
                </ul>`,
            }
        })
    );

    // Initialize it!
    ui.init();
};

(function() {
    document
        .querySelectorAll('code')
        .forEach(block => hljs.highlightBlock(block))
    ;
    integrationsApisearchDemo();
    addNavbarClassOnScroll();
})();