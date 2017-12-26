let apiKey = 'trnsl.1.1.20171226T172043Z.e378d286d4be7d8e.3b8cb91c3c8a2e890d1dc77cd47f198e0218b9c9';
let translateButton = document.getElementById('translate-button');
let languages;

function constructor() {
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
                languages = data.langs;
                console.log(languages);
                // for (let key in data.langs) {
                //     if (data.langs.hasOwnProperty(key)) {
                //         languages.push(key);
                //     }
                // }
            })
        })
        .catch((err) => {
            console.log('Error: ' + err);
        });
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



constructor();