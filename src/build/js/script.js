'use strict';

var translateButton = document.getElementById('translate-button');
var languages = [];
var languagesObj = void 0;

function translate() {
    console.log('Translating...');
}

function constructor() {
    setEventListeners();
    getLanguages();
}

function getLanguages() {
    var apiKey = 'trnsl.1.1.20171226T172043Z.e378d286d4be7d8e.3b8cb91c3c8a2e890d1dc77cd47f198e0218b9c9';

    fetch('https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=' + apiKey + '&ui=en').then(function (res) {
        res.json().then(function (data) {
            languagesObj = data.langs;
            for (var key in data.langs) {
                if (data.langs.hasOwnProperty(key)) {
                    languages.push(key);
                }
            }
        });
    }).catch(function (err) {
        console.log('Error: ' + err);
    });
}

function setEventListeners() {
    translateButton.addEventListener('click', translate);
}

constructor();