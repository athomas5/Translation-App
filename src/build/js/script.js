'use strict';

var apiKey = 'trnsl.1.1.20171226T172043Z.e378d286d4be7d8e.3b8cb91c3c8a2e890d1dc77cd47f198e0218b9c9';
var translateButton = document.getElementById('translate-button');
var languages = {};

function main() {
    setEventListeners();
    getLanguages();
}

function setEventListeners() {
    translateButton.addEventListener('click', translate);
}

function getLanguages() {
    fetch('https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=' + apiKey + '&ui=en').then(function (res) {
        res.json().then(function (data) {
            populateLanguageSelection(data.langs);
        });
    }).catch(function (err) {
        console.log('Error: ' + err);
    });
}

function populateLanguageSelection(languages) {
    var languageSelection1 = document.getElementById('language-selection1');
    var languageSelection2 = document.getElementById('language-selection2');

    for (var key in languages) {
        if (languages.hasOwnProperty(key)) {
            var option1 = document.createElement('option');
            option1.setAttribute('value', languages[key]);
            option1.appendChild(document.createTextNode(languages[key]));
            languageSelection1.appendChild(option1);

            var option2 = document.createElement('option');
            option2.setAttribute('value', languages[key]);
            option2.appendChild(document.createTextNode(languages[key]));
            languageSelection2.appendChild(option2);
        }
    }
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

main();