import apisearchUI from "apisearch-ui";

let homeUI = apisearchUI({
    appId: '54725861',
    index: '66777162',
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

export default homeUI;