import apisearchUI from "apisearch-ui";

const resultTemplate = `
    <div class="row">
        {{#items}}
        <div class="col-6 col-sm-4 mb-3">
            <div class="as-result__album" style="background-image: url('{{#metadata.image}}{{metadata.image}}{{/metadata.image}}{{^metadata.image}}https://raw.githubusercontent.com/apisearch-io/apisearch.io/master/assets/media/no-cover.jpg{{/metadata.image}}')">
                <span class="as-result__albumTitle">{{metadata.title}}</span>
                <span class="as-result__albumYear">{{indexedMetadata.year}}</span>

                {{#indexedMetadata.rating}}
                <span class="as-result__albumRating">
                    <i class="fa fa-star"></i>{{indexedMetadata.rating}}
                </span>
                {{/indexedMetadata.rating}}
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
            {{^values.img}}<img class="as-multipleFilter__itemImage" src="http://apisearch.io/assets/media/no-cover.jpg">{{/values.img}}
            <span class="as-multipleFilter__itemText">{{values.name}}</span>
        </span>
    </li>
`;

/**
 * Apisearch UI
 */
export const mainDemo = apisearchUI.create({
    app_id: 'as-29be77d7-2f64-4522',
    index_id: 'eu1-prod-d53da03a-d49c-483c',
    token: 'eu1-8438694d-5839-4179-9f73-a55630f3cd4d',
    options: {
        endpoint: 'https://eu1.apisearch.io',
        override_queries: true
    }
});

mainDemo.attach('render', function() {
    document.querySelector('.as-mainDemo__loader').classList.add('hide');
});

const {
    searchInput,
    result,
    information,
    multipleFilter,
    clearFilters,
    pagination
} = mainDemo.widgets;

mainDemo.addWidgets(
    searchInput({
        target: '.as-mainDemo__searchInput',
        placeholder: 'Search any album...',
        template: {
            clearSearch: '<i class="fa fa-times-circle" aria-hidden="true"></i>'
        }
    }),
    multipleFilter({
        target: '.as-mainDemo__searchGenreFilter',
        filterName: 'categories',
        filterField: 'categories',
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
        filterName: 'year',
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
        filterName: 'rating',
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
        filterName: 'author',
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
            { type: 'album', id: 'mw0002885819' },
            { type: 'album', id: 'mw0000828548' },
            { type: 'album', id: 'mw0000085540' },
            { type: 'album', id: 'mw0002080092' },
            { type: 'album', id: 'mw0002136254' },
            { type: 'album', id: 'mw0002079107' }
        ],
        filter: function(query) {
            query.setAutoFuzziness();
        },
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
