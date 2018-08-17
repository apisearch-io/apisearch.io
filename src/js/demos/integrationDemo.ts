import apisearchUI from "apisearch-ui";

let integrationsUI = apisearchUI.create({
    app_id: '54725861',
    index_id: '66777162',
    token: 'daf93c2b-40bc-49f2-870e-f8f62ea524ad',
    options: {
        endpoint: 'https://apisearch.global.ssl.fastly.net',
        override_queries: true
    }
});

integrationsUI.addWidgets(
    integrationsUI.widgets.searchInput({
        target: '.as-integrationDemo__searchBox',
        template: {
            clearSearch: '<i class="fa fa-times-circle" aria-hidden="true"></i>'
        }
    }),
    integrationsUI.widgets.result({
        target: '.as-integrationDemo__results',
        itemsPerPage: 4,
        promote: [
            { type: 'album', id: 'purpose-mw0002885819' },
            { type: 'album', id: 'crazy-love-mw0000828548' },
            { type: 'album', id: 'classic-queen-mw0000085540' },
            { type: 'album', id: '21-mw0002080092' },
        ],
        template: {
            itemsList: `<ul>
                {{#items}} 
                <li>
                    <img src="{{metadata.img}}" height="40px">
                    <span class="ml-3">{{metadata.title}}</span>
                    <span style="color: #777777; font-size: .8rem">({{indexedMetadata.year}})</span>
                    {{#indexedMetadata.rating}}
                        <span class="as-result__albumRating pull-right">
                            <i class="fa fa-star mr-1"></i>{{indexedMetadata.rating}}
                        </span>
                    {{/indexedMetadata.rating}}
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