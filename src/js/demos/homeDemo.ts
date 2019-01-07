import apisearchUI from "apisearch-ui";

let homeUI = apisearchUI.create({
    app_id: '9c078fa1a748',
    index_id: 'e742fbfbac24',
    token: 'daf93c2b-40bc-49f2-870e-f8f62ea524ad',
    options: {
        endpoint: 'https://apisearch.global.ssl.fastly.net',
        override_queries: true
    }
});

homeUI.addWidgets(
    homeUI.widgets.searchInput({
        target: '.as-homeDemo__searchBox',
        autofocus: true,
        template: {
            clearSearch: '<i class="fa fa-times-circle" aria-hidden="true"></i>'
        }
    }),
    homeUI.widgets.multipleFilter({
        target: '.as-homeDemo__genreFilter',
        filterName: 'genre',
        filterField: 'genre_id',
        aggregationField: 'genre_data',
        applicationType: 8,
        fetchLimit: 2,
        viewLimit: 2,
        sortBy: ['_count', 'desc'],
        template: {
            item: `
                    <input type="checkbox" id="filter_{{values.id}}" {{#isActive}}checked="checked"{{/isActive}}>
                    <label for="filter_{{values.id}}">{{{values.name}}} ({{n}})</label>
                `,
        },
        classNames: {
            container: 'panel',
            top: 'panel-heading',
            item: 'panel-block',
            showMoreContainer: 'panel-block'
        }
    }),
    homeUI.widgets.result({
        target: '.as-homeDemo__result',
        itemsPerPage: 4,
        promote: [
            { type: 'album', id: 'purpose-mw0002885819' },
            { type: 'album', id: 'crazy-love-mw0000828548' },
            { type: 'album', id: 'classic-queen-mw0000085540' },
            { type: 'album', id: '21-mw0002080092' },
        ],
        filter: function(query) {
            query.setAutoFuzziness();
        },
        template: {
            itemsList: `<ul>
                    {{#items}}
                    <li>
                        <img src="{{metadata.img}}" height="40px" width="40px">
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

export default homeUI;
