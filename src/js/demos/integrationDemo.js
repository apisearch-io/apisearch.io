import apisearchUI from "apisearch-ui";

let integrationsUI = apisearchUI({
    appId: '54725861',
    index: '66777162',
    token: 'daf93c2b-40bc-49f2-870e-f8f62ea524ad',
    options: {
        protocol: 'https',
        endpoint: 'apisearch.global.ssl.fastly.net'
    }
});

integrationsUI.addWidgets(
    integrationsUI.widgets.simpleSearch({
        target: '.as-integrationDemo__searchBox',
        template: {
            clearSearch: '<i class="fa fa-times-circle" aria-hidden="true"></i>'
        }
    }),
    integrationsUI.widgets.result({
        target: '.as-integrationDemo__results',
        itemsPerPage: 4,
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

export default integrationsUI;