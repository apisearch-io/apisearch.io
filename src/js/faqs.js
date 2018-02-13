import apisearchUI from "apisearch-ui";

let faqsUI = apisearchUI({
    appId: 'e68d3c8b',
    indexId: 'd3755f6e',
    token: '5ca4008c-aac3-4059-8d50-5692befceb73',
    options: {
        endpoint: "http://localhost:8999"
    }
});

faqsUI.addWidgets(
    faqsUI.widgets.searchInput({
        target: '#apisearchFaqsSearchInput',
        autofocus: true
    }),
    faqsUI.widgets.multipleFilter({
        target: '.c-faqs__topicsFilter',
        name: 'topic',
        filterField: 'topic',
        template: {
            item: '{{values.name}}'
        }
    }),
    faqsUI.widgets.pagination({
        target: '.c-faqs__pagination'
    }),
    faqsUI.widgets.result({
        target: '.c-faqs__result',
        itemsPerPage: 8,
        highlightsEnabled: true,
        template: {
            itemsList: `
                <ul class="c-faqs__resultList row">
                {{#items}}
                    <li class="col-12 col-sm-6">
                        <div class="c-faqs__resultItem">
                            <h4 class="c-faqs__resultItemQuestion">
                                {{#highlights.question}}{{{highlights.question}}}{{/highlights.question}}
                                {{^highlights.question}}{{{metadata.question}}}{{/highlights.question}}
                            </h4>
                            <p class="c-faqs__resultItemAnswer">
                                {{#highlights.answer}}{{{highlights.answer}}}{{/highlights.answer}}
                                {{^highlights.answer}}{{{metadata.answer}}}{{/highlights.answer}}
                            </p>
                        </div>
                    </li>
                {{/items}}
                </ul>
            `
        }
    })
);

export default faqsUI;