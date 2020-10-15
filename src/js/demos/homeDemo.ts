import apisearchUI from "apisearch-ui";

let homeUI = apisearchUI.create({
    app_id: 'as-29be77d7-2f64-4522',
    index_id: 'eu1-prod-d53da03a-d49c-483c',
    token: 'eu1-8438694d-5839-4179-9f73-a55630f3cd4d',
    options: {
        endpoint: 'https://eu1.apisearch.io',
        override_queries: true
    }
});

homeUI.addWidgets(
    homeUI.widgets.searchInput({
        target: '.as-homeDemo__searchBox',
        autofocus: true,
        autocomplete: true,
        template: {
            clearSearch: '<i class="fa fa-times-circle" aria-hidden="true"></i>'
        }
    }),
    homeUI.widgets.multipleFilter({
        target: '.as-homeDemo__genreFilter',
        filterName: 'categories',
        filterField: 'categories',
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
            { type: 'album', id: 'mw0002885819' },
            { type: 'album', id: 'mw0000828548' },
            { type: 'album', id: 'mw0000085540' },
            { type: 'album', id: 'mw0002080092' }
        ],
        filter: function(query) {
            query.setAutoFuzziness();
        },
        template: {
            itemsList: `<ul>
                    {{#items}}
                    <li>
                        <img src="{{metadata.image}}" height="40px" width="40px">
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
