import apisearchUI from "apisearch-ui";

const resultTemplate = ` 
    <div class="row">
        {{#items}}
        <div class="col-6 col-sm-4 mb-3">
            <div class="as-result__album" style="background-image: url('{{metadata.img}}')">
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

const regularFilterItemTemplate = `
    <li class="filter-item {{#isActive}}active{{/isActive}}">
        <span class="item-content">
            <i class="{{#isActive}}fa fa-check-square{{/isActive}}{{^isActive}}fa fa-square-o{{/isActive}}"></i>
            <span class="item-text">{{values.name}}</span>
        </span>
        <span class="count">{{n}}</span>
    </li>
`;

const ratingFilterItemTemplate = `
    <li class="filter-item {{#isActive}}active{{/isActive}}">
        <span class="item-content">{{{values.name}}}</span>
        <span class="count">{{n}}</span>
    </li>
`;

const authorsFilterItemTemplate = `
    <div class="filter-item {{#isActive}}active{{/isActive}}">
        <span class="item-content">
            {{#values.img}}<img class="item-image" src="{{values.img}}"/>{{/values.img}}
            {{^values.img}}<img class="item-image" src="http://apisearch.io/public/images/no-cover.jpg">{{/values.img}}
            <span class="item-text">{{values.name}}</span>
        </span>
    </div>
`;

/**
 * Apisearch UI
 */
export const mainDemo = apisearchUI({
    appId: '54725861',
    index: '66777162',
    token: 'daf93c2b-40bc-49f2-870e-f8f62ea524ad'
});

mainDemo.store.on('render', function() {
    document.querySelector('.loading').classList.add('hide');
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
            { id: 'album', type: 'purpose-mw0002885819' },
            { id: 'album', type: 'crazy-love-mw0000828548' },
            { id: 'album', type: 'classic-queen-mw0000085540' },
            { id: 'album', type: '21-mw0002080092' },
            { id: 'album', type: '4-mw0002136254' },
            { id: 'album', type: 'michael-mw0002079107' }
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