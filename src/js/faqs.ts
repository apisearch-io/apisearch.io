import apisearchUI from "apisearch-ui";

let faqsUI = apisearchUI.create({
    app_id: '4186e76c',
    index_id: '0d2ca7b4',
    token: 'e3aee575-2b0a-4a95-b0ce-88fa316c4eff',
    options: {
        endpoint: 'https://apisearch.global.ssl.fastly.net'
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