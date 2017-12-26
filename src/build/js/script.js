'use strict';

var apiKey = 'trnsl.1.1.20171226T172043Z.e378d286d4be7d8e.3b8cb91c3c8a2e890d1dc77cd47f198e0218b9c9';
var translateButton = document.getElementById('translate-button');
var languages = void 0;

function constructor() {
    setEventListeners();
    getLanguages();
}

function setEventListeners() {
    translateButton.addEventListener('click', translate);
}

function getLanguages() {
    fetch('https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=' + apiKey + '&ui=en').then(function (res) {
        res.json().then(function (data) {
            languages = data.langs;
            console.log(languages);
            // for (let key in data.langs) {
            //     if (data.langs.hasOwnProperty(key)) {
            //         languages.push(key);
            //     }
            // }
        });
    }).catch(function (err) {
        console.log('Error: ' + err);
    });
}

function translate() {
    var textToTranslate = document.getElementById('text-to-translate').value;
    var translatedText = document.getElementById('translated-text');
    var translateFromTo = 'de-en';

    fetch('https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + apiKey + '&text=' + textToTranslate + '&lang=' + translateFromTo + '&format=plain').then(function (res) {
        res.json().then(function (data) {
            translatedText.value = data.text[0];
        });
    }).catch(function (err) {
        console.log('Error: ' + err);
    });
}

constructor();