import apisearchUI from "apisearch-ui";

let homeUI = apisearchUI({
    appId: '54725861',
    indexId: '66777162',
    token: 'daf93c2b-40bc-49f2-870e-f8f62ea524ad',
    options: {
        protocol: 'https',
        endpoint: 'apisearch.global.ssl.fastly.net',
        overrideQueries: false
    }
});

homeUI.addWidgets(
    homeUI.widgets.simpleSearch({
        target: '.as-homeDemo__searchBox',
        template: {
            clearSearch: '<i class="fa fa-times-circle" aria-hidden="true"></i>'
        }
    }),
    homeUI.widgets.multipleFilter({
        target: '.as-homeDemo__genreFilter',
        name: 'genre',
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
        template: {
            itemsList: `<ul>
                    {{#items}} 
                    <li>
                        <img src="{{metadata.img}}" height="40px">
                        <span class="ml-3">{{metadata.title}}</span>
                        <span style="color: #777777; font-size: .8rem">({{indexed_metadata.year}})</span>
                        {{#indexed_metadata.rating}}
                            <span class="as-result__albumRating pull-right">
                                <i class="fa fa-star mr-1"></i>{{indexed_metadata.rating}}
                            </span>
                        {{/indexed_metadata.rating}}
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