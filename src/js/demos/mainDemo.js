import apisearchUI from "apisearch-ui";

const resultTemplate = ` 
    <div class="row">
        {{#items}}
        <div class="col-6 col-sm-4 mb-3">
            <div class="as-result__album" style="background-image: url('{{#metadata.img}}{{metadata.img}}{{/metadata.img}}{{^metadata.img}}https://raw.githubusercontent.com/apisearch-io/apisearch.io/master/assets/media/no-cover.jpg{{/metadata.img}}')">
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
        <span class="as-result__notFoundEmoji">😲</span>
        <span class="as-result__notFoundText">No results found</span>
    </div>
    {{/items}}
`;

const regularFilterItemTemplate = `
    <li class="{{#isActive}}as-multipleFilter__item--active{{/isActive}}">
        <span class="as-multipleFilter__itemContent">
            <i class="{{#isActive}}fa fa-check-square{{/isActive}}{{^isActive}}fa fa-square-o{{/isActive}}"></i>
            <span class="as-multipleFilter__itemText">{{values.name}}</span>
        </span>
        <span class="as-multipleFilter__itemCount">{{n}}</span>
    </li>
`;

const ratingFilterItemTemplate = `
    <li class="{{#isActive}}as-multipleFilter__item--active{{/isActive}}">
        <span class="as-multipleFilter__itemStars">{{{values.name}}}</span>
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
export const mainDemo = apisearchUI({
    appId: '54725861',
    indexId: '66777162',
    token: 'daf93c2b-40bc-49f2-870e-f8f62ea524ad',
    options: {
        protocol: 'https',
        endpoint: 'apisearch.global.ssl.fastly.net',
        overrideQueries: false
    }
});

mainDemo.store.on('render', function() {
    document.querySelector('.as-mainDemo__loader').classList.add('hide');
});

const {
    simpleSearch,
    result,
    information,
    multipleFilter,
    clearFilters,
    pagination
} = mainDemo.widgets;

mainDemo.addWidgets(
    simpleSearch({
        target: '.as-mainDemo__searchInput',
        placeholder: 'Search any album...',
        template: {
            clearSearch: '<i class="fa fa-times-circle" aria-hidden="true"></i>'
        }
    }),
    multipleFilter({
        target: '.as-mainDemo__searchGenreFilter',
        name: 'genre',
        filterField: 'genre_id',
        aggregationField: 'genre_data',
        applicationType: 8,
        viewLimit: 3,
        sortBy: ['_count', 'desc'],
        template: {
            top: '<h2 class="title"><i class="fa fa-angle-down"></i>&nbsp;Genre</h2>',
            item: regularFilterItemTemplate
        }
    }),
    multipleFilter({
        target: '.as-mainDemo__searchYearFilter',
        name: 'year',
        filterField: 'year',
        applicationType: 8,
        viewLimit: 3,
        sortBy: ['_term', 'desc'],
        template: {
            top: '<h2 class="title"><i class="fa fa-angle-down"></i>&nbsp;Year</h2>',
            item: regularFilterItemTemplate
        },
        classNames: {
            container: 'as-multipleFilter--inverted'
        }
    }),
    multipleFilter({
        target: '.as-mainDemo__searchRatingFilter',
        name: 'rating',
        filterField: 'rating',
        applicationType: 8,
        fetchLimit: 5,
        sortBy: ['_term', 'desc'],
        showMoreActive: false,
        template: {
            top: '<h2 class="title"><i class="fa fa-angle-down"></i>&nbsp;Rating</h2>',
            item: ratingFilterItemTemplate
        },
        formatData: function(itemData) {
            let ratingNumber = parseInt(itemData.values.id);
            itemData.values.name = "";

            for(let index = 0; index < 5; index++) {
                if (index < ratingNumber) {
                    itemData.values.name += '<i class="fa fa-star"></i>';
                } else {
                    itemData.values.name += '<i class="fa fa-star grey"></i>';
                }
            }

            return itemData;
        }
    }),
    multipleFilter({
        target: '.as-mainDemo__searchAuthorFilter',
        name: 'author',
        filterField: 'author_id',
        aggregationField: 'author_data',
        applicationType: 4,
        fetchLimit: 10,
        sortBy: ['_count', 'desc'],
        showMoreActive: false,
        template: {
            item: authorsFilterItemTemplate
        }
    }),
    clearFilters({
        target: '.as-mainDemo__clearFilters',
        template: {
            container: '<i class="fa fa-times"></i> Clear filters'
        }
    }),
    information({
        target: '.as-mainDemo__searchInformation',
        template: {
            container: 'Found <span>{{total_hits}}</span> results'
        }
    }),
    result({
        target: '.as-mainDemo__searchResults',
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
    }),
    pagination({
        target: '.as-mainDemo__searchPagination',
        padding: 2,
        goFirstLast: true,
        template: {
            next: '>',
            previous: '<',
            last: '>>',
            first: '<<'
        }
    })
);

export default mainDemo;