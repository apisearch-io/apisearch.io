import {template} from 'lodash'
import apisearch from "apisearch";
import apisearchUI from 'apisearch-ui'

const credentials = {
    indexId: '66777162',
    appId: '54725861',
    token: 'daf93c2b-40bc-49f2-870e-f8f62ea524ad',
    options: {
        overrideQueries: false
    }
};

let albumsArray = [
    'purpose-mw0002885819', 'crazy-love-mw0000828548', 'classic-queen-mw0000085540',
    '21-mw0002080092', '4-mw0002136254', 'michael-mw0002079107',
    'out-in-la-mw0000112536', 'run-to-the-hills-mw0000532086', 'ride-the-lightning-mw0000190995',
    'doo-wops-hooligans-mw0002043948', 'sinatra-best-of-the-best-mw0002208487', 'junk-of-the-heart-mw0002185184',
    'get-lucky-mw0002542006', 'beetlebum-mw0000921064', 'nevermind-mw0000185616',
    'this-is-all-yours-mw0002689881', 'a-state-of-trance-classics-vol-7-mw0002441429', 'sgt-peppers-lonely-hearts-club-band-mw0000649874',
    'interstellar-original-motion-picture-soundtrack-mw0002770179', 'zombie-mw0000885922', 'she-wolf-mw0001762399'
];

export default class MachineLearningDemo {
    constructor() {
        this.trainCounter = 0;
        this.albumsArray = albumsArray;
        this.api = apisearch(credentials);
        this.ui = apisearchUI(credentials);
    }

    initialize() {
        this.printChoices(
            this.pickThreeRandomAlbums()
        );
        this.printSuggestions();
        this.printSearch();
    };

    pickThreeRandomAlbums() {
        let availableAlbums = [...this.albumsArray],
            randomAlbums = [];

        if (availableAlbums.length < 3) {
            console.log('no more choices')
        }

        for(let i = 0; i < 3; i++) {
            let randomAlbumIndex = Math.floor(
                Math.random() * availableAlbums.length
            );

            randomAlbums = [
                ...randomAlbums,
                availableAlbums[randomAlbumIndex]
            ];

            // delete used album
            availableAlbums.splice(randomAlbumIndex, 1);
        }

        // add updated albums array
        // without the used albums
        this.albumsArray = availableAlbums;

        // Check if Apisearch is ready to show suggestions
        this.canShowSuggestions();

        return randomAlbums;
    }

    printChoices(uuids) {
        let resultBlock = document.querySelector('#apisearchMachineLearningChoices');
        let query = this.api.query.createByUUIDs(
            ...uuids.map(uuid =>
                this.api.createObject.uuid(uuid, 'album')
            )
        );

        let compiled = template(
            `<% if (items.length !== 0) { %>
                <% items.forEach(function(item) { %>
                <div class="col-12 col-sm-4 mb-3 mb-sm-0">
                    <div class="c-machineLearning__album c-machineLearning__album--choice">
                        <h4 class="c-machineLearning__albumTitle"><%= item.metadata.title %></h4>
                        <img src="<%= item.metadata.img %>">
                    </div>
                </div>
                <% }) %>
            <% } %>`
        );

        this.api.search(query.toJSON(), result => {
            // render items
            resultBlock.innerHTML = compiled({items: result.items});

            // add like event
            document
                .querySelectorAll('.c-machineLearning__album--choice')
                .forEach(item =>
                    item.addEventListener('click', () => {
                        setTimeout(() => item.classList.add('c-machineLearning__album--liked'), 75);

                        // reprint new choices
                        setTimeout(() => this.printChoices(
                            this.pickThreeRandomAlbums()
                        ), 500);
                    })
                )
        });
    };

    printSuggestions() {
        let resultBlock = document.querySelector('#apisearchMachineLearningSuggestions');
        let query = this.api
            .query
            .createMatchAll()
            .setResultSize(4)
        ;

        let compiled = template(
            `<% if (items.length !== 0) { %>
                <div class="col-12 col-sm-8 ml-auto mr-auto">
                    <div class="row">
                        <% items.forEach(function(item) { %>
                        <div class="col-6 col-sm-3 mt-4">
                            <div class="c-machineLearning__album c-machineLearning__album--suggestion">
                                <h4 class="c-machineLearning__albumTitle"><%= item.metadata.title %></h4>
                                <img src="<%= item.metadata.img %>">
                            </div>
                        </div>
                        <% }) %>
                    </div>
                </div>
            <% } %>`
        );

        this.api.search(query.toJSON(), result =>
            resultBlock.innerHTML = compiled({items: result.items})
        );
    };

    printSearch() {
        let ui = this.ui;

        ui.addWidgets(
            ui.widgets.searchInput({
                target: '#apisearchMachineLearningSearchInput',
                placeholder: 'Search an album...'
            }),
            ui.widgets.result({
                target: '#apisearchMachineLearningSearchResults',
                itemsPerPage: 8,
                template: {
                    itemsList:
                        `<div class="col-12 col-sm-8 ml-auto mr-auto">
                            <div class="row">
                                {{#items}}
                                    <div class="col-6 col-sm-3 mt-4">
                                        <div class="c-machineLearning__album c-machineLearning__album--suggestion">
                                            <h4 class="c-machineLearning__albumTitle">{{metadata.title}}</h4>
                                            <img src="{{metadata.img}}">
                                        </div>
                                    </div>
                                {{/items}}
                                {{^items}}
                                    <div class="col-12 mt-4">No result</div>
                                {{/items}}
                            </div>
                        </div>`
                }
            })
        );

        ui.init();
    };

    canShowSuggestions() {
        if (this.trainCounter === 3) {
            document
                .querySelector('#apisearchShowSuggestions')
                    .classList
                    .remove('c-machineLearning__showSuggestions--hidden')
            ;
            this.showSuggestionsAction()
        }

        this.trainCounter = this.trainCounter + 1;
    }

    showSuggestionsAction() {
        document
            .querySelector('#apisearchShowSuggestionsButton')
            .addEventListener('click', function() {
                document
                    .querySelector('#apisearchShowSuggestions')
                    .classList
                    .add('c-machineLearning__showSuggestions--hidden');

                document
                    .querySelectorAll('.c-machineLearning__block')
                    .forEach(item => item.classList.remove('c-machineLearning__block--hidden'))
            })
    }
}
