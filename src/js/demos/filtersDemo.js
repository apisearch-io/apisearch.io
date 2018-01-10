import apisearchUI from "apisearch-ui";

const resultTemplate = ` 
    <div class="row">
        {{#items}}
        <div class="col-6 col-sm-4 mb-3">
            <div class="as-result__album" style="background-image: url('{{#metadata.img}}{{metadata.img}}{{/metadata.img}}{{^metadata.img}}http://apisearch.io/public/images/no-cover.jpg{{/metadata.img}}')">
                <span class="as-result__albumTitle">{{metadata.title}}</span>
                <span class="as-result__albumYear">{{indexed_metadata.year}}</span>
                
                {{#indexed_metadata.rating}}
                <span class="as-result__albumRating">
                    <i class="fa fa-star"></i>{{indexed_metadata.rating}}
                </span>
                {{/indexed_metadata.rating}}
            </div>
        </div>
        {{/items}}
    </div>
    {{^items}}
    <div class="as-result__notFound">
        <span class="as-result__notFoundCopy">
            <span class="as-result__notFoundEmoji">😲</span>
            <span class="as-result__notFoundText">No results found</span>
        </span>
    </div>
    {{/items}}
`;

const genreFilterItemTemplate = `
    <li class="{{#isActive}}as-multipleFilter__item--active{{/isActive}}">
        <span class="as-multipleFilter__itemContent">
            <i class="{{#isActive}}fa fa-check-square{{/isActive}}{{^isActive}}fa fa-square-o{{/isActive}}"></i>
            <span class="as-multipleFilter__itemText">{{values.name}}</span>
        </span>
        <span class="as-multipleFilter__itemCount">{{n}}</span>
    </li>
`;

const authorsFilterItemTemplate = `
    <li class="{{#isActive}}as-multipleFilter__item--active{{/isActive}}">
        <span class="as-multipleFilter__itemContent">
            {{#values.img}}<img class="as-multipleFilter__itemImage" src="{{values.img}}"/>{{/values.img}}
            {{^values.img}}<img class="as-multipleFilter__itemImage" src="http://apisearch.io/public/images/no-cover.jpg">{{/values.img}}
            <span class="as-multipleFilter__itemText">{{values.name}}</span>
        </span>
    </li>
`;

/**
 * Apisearch UI
 */
let filtersDemo = apisearchUI({
    appId: '54725861',
    index: '66777162',
    token: 'daf93c2b-40bc-49f2-870e-f8f62ea524ad'
});

const {
    multipleFilter,
    result
} = filtersDemo.widgets;

filtersDemo.addWidgets(
    multipleFilter({
        target: '.as-filtersDemo__authorsFilter',
        name: 'author',
        filterField: 'author_id',
        aggregationField: 'author_data',
        applicationType: 4,
        fetchLimit: 10,
        sortBy: ['_count', 'desc'],
        showMoreActive: false,
        template: {
            top: '<h2 class="title"><i class="fa fa-angle-down"></i>&nbsp;AUTHOR</h2>',
            item: authorsFilterItemTemplate,
            showMore: '<span class="show-more">+ show more</span>',
            showLess: '<span class="show-more">+ show less</span>'
        },
        classNames: {
            container: 'filter author',
        }
    }),
    multipleFilter({
        target: '.as-filtersDemo__genreFilter',
        name: 'genre',
        filterField: 'genre_id',
        aggregationField: 'genre_data',
        applicationType: 8,
        fetchLimit: 14,
        viewLimit: 10,
        sortBy: ['_count', 'desc'],
        template: {
            top: '<h2 class="title"><i class="fa fa-angle-down"></i>&nbsp;GENRE</h2>',
            item: genreFilterItemTemplate
        },
        classNames: {
            container: 'filter regular',
            item: 'filter-item'
        }
    }),
    result({
        target: '.as-filtersDemo__result',
        itemsPerPage: 6,
        promote: [
            { type: 'album', id: 'purpose-mw0002885819' },
            { type: 'album', id: 'crazy-love-mw0000828548' },
            { type: 'album', id: 'classic-queen-mw0000085540' },
            { type: 'album', id: '21-mw0002080092' },
            { type: 'album', id: '4-mw0002136254' },
            { type: 'album', id: 'michael-mw0002079107' }
        ],
        template: {
            itemsList: resultTemplate
        }
    })
);

export default filtersDemo;