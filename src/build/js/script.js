'use strict';

var apiKey = 'trnsl.1.1.20171226T172043Z.e378d286d4be7d8e.3b8cb91c3c8a2e890d1dc77cd47f198e0218b9c9';
var textArea1 = document.getElementById('textArea1');
var textArea2 = document.getElementById('textArea2');
var languageSelection1 = document.getElementById('language-selection1');
var languageSelection2 = document.getElementById('language-selection2');
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
            languages = data.langs;
            populateLanguageSelection(data.langs);
        });
    }).catch(function (err) {
        console.log('Error: ' + err);
    });
}

function populateLanguageSelection() {
    for (var key in languages) {
        if (languages.hasOwnProperty(key)) {
            var option = document.createElement('option');
            option.setAttribute('value', languages[key]);
            option.appendChild(document.createTextNode(languages[key]));

            languageSelection1.appendChild(option);
            languageSelection2.appendChild(option.cloneNode(true));
        }
    }
}

function translate() {
    if (languageSelection1.selectedIndex > 0 && languageSelection2.selectedIndex > 0 && textArea1.value) {
        var textToTranslate = textArea1.value;
        var selectedLanguage1 = languages.getKeyByValue(languageSelection1.options[languageSelection1.selectedIndex].value);
        var selectedLanguage2 = languages.getKeyByValue(languageSelection2.options[languageSelection2.selectedIndex].value);
        var translateFromTo = selectedLanguage1 + '-' + selectedLanguage2;

        fetch('https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + apiKey + '&text=' + textToTranslate + '&lang=' + translateFromTo + '&format=plain').then(function (res) {
            res.json().then(function (data) {
                if (data.code === 200) {
                    textArea2.value = data.text[0];
                }
            });
        }).catch(function (err) {
            console.log('Error: ' + err);
        });
    } else {
        // TODO: Display error message
    }
}

Object.prototype.getKeyByValue = function (value) {
    for (var prop in this) {
        if (this.hasOwnProperty(prop)) {
            if (this[prop] === value) return prop;
        }
    }
};

main();