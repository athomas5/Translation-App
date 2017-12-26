let apiKey = 'trnsl.1.1.20171226T172043Z.e378d286d4be7d8e.3b8cb91c3c8a2e890d1dc77cd47f198e0218b9c9';
let translateButton = document.getElementById('translate-button');
let languages = {};

function main() {
    setEventListeners();
    getLanguages();
}

function setEventListeners() {
    translateButton.addEventListener('click', translate);
}

function getLanguages() {
    fetch('https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=' + apiKey + '&ui=en')
        .then((res) => {
            res.json().then((data) => {
                populateLanguageSelection(data.langs);
            })
        })
        .catch((err) => {
            console.log('Error: ' + err);
        });
}

function populateLanguageSelection(languages) {
    let languageSelection1 = document.getElementById('language-selection1');
    let languageSelection2 = document.getElementById('language-selection2');
    
    for (let key in languages) {
        if (languages.hasOwnProperty(key)) {
            let option1 = document.createElement('option');
            option1.setAttribute('value', languages[key]);
            option1.appendChild(document.createTextNode(languages[key]));
            languageSelection1.appendChild(option1);

            let option2 = document.createElement('option');
            option2.setAttribute('value', languages[key]);
            option2.appendChild(document.createTextNode(languages[key]));
            languageSelection2.appendChild(option2);
        }
    }
}

function translate() {
    let textToTranslate = document.getElementById('text-to-translate').value;
    let translatedText = document.getElementById('translated-text');
    let translateFromTo = 'de-en';
    
    fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${apiKey}&text=${textToTranslate}&lang=${translateFromTo}&format=plain`)
        .then((res) => {
            res.json().then((data) => {
                translatedText.value = data.text[0];
            })
        })
        .catch((err) => {
            console.log('Error: ' + err);
        });
}

main();