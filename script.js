function doctorDescription(event) {
    const targ = event.currentTarget.parentNode.querySelector('.details');
    targ.classList.remove('invisible');
    event.currentTarget.textContent = "Meno dettagli";
    event.currentTarget.removeEventListener('click', doctorDescription);
    event.currentTarget.addEventListener('click', hideDoctorDescription);
}

function hideDoctorDescription(event) {
    const targ = event.currentTarget.parentNode.querySelector('.details');
    targ.classList.add('invisible');
    event.currentTarget.textContent = "Più dettagli";
    event.currentTarget.removeEventListener('click', hideDoctorDescription);
    event.currentTarget.addEventListener('click', doctorDescription);
}


function showContent(event) {
    let sezione = event.currentTarget.parentNode.querySelector('.content');
    sezione.classList.remove("invisible");
    event.currentTarget.parentNode.querySelector('h1').classList.remove("invisible");
    event.currentTarget.removeEventListener('click', showContent);
    event.currentTarget.textContent = "Mosta meno";
    event.currentTarget.addEventListener('click', hideContent);
    event.currentTarget.parentNode.querySelector('.button2').classList.remove("invisible");

    for (const rep of REPARTI_MAP) {
        if (rep.reparto === sezione.id) {
            const tag = document.createElement('div');
            tag.classList.add('dottore');
            tag.textContent = rep.Nome;
            const imagedott = document.createElement('img');
            imagedott.classList.add('.dottore');
            imagedott.src = rep.image;
            sezione.appendChild(tag);
            tag.appendChild(imagedott);
            const Dettagli = document.createElement('div');
            Dettagli.classList.add('invisible');
            Dettagli.classList.add('details');
            Dettagli.textContent = rep.Specializzazione;
            tag.appendChild(Dettagli);
            const buttonDettagli = document.createElement('div');
            buttonDettagli.classList.add('button');
            buttonDettagli.textContent = 'Più dettagli';
            tag.appendChild(buttonDettagli);
            buttonDettagli.addEventListener('click', doctorDescription);
        }
    }
}

function hideContent(event) {
    const sezione = event.currentTarget.parentNode.querySelector('.content');
    sezione.classList.add("invisible");
    event.currentTarget.parentNode.querySelector('h1').classList.add("invisible");
    event.currentTarget.parentNode.querySelector('.button2').classList.add("invisible");
    event.currentTarget.textContent = "Scopri di più";
    event.currentTarget.addEventListener('click', showContent);
    sezione.innerHTML = '';
}


function showService(event) {
    let sezione = event.currentTarget.parentNode.querySelector('.servizi');
    sezione.classList.remove("invisible");
    event.currentTarget.parentNode.querySelector('.servizi h1').classList.remove("invisible");
    event.currentTarget.removeEventListener('click', showService);
    event.currentTarget.textContent = "Non mostare";
    event.currentTarget.addEventListener('click', hideService);
    const button = event.currentTarget.parentNode.querySelector('.descrizione .button');
    button.addEventListener('click', hideService);

    for (const serv of SERVIZI_MAP) {
        if (serv.reparto === (sezione.parentNode.querySelector('.content').id)) {
            createDivService(sezione, serv);
        }
    }
}

function createDivService(sezione, serv) {
    const tag = document.createElement('div');
    tag.classList.add('servizio');
    const title = document.createElement('h1');
    title.textContent = serv.Nome;
    tag.appendChild(title);
    const imageEsame = document.createElement('img');
    imageEsame.src = serv.image;
    tag.appendChild(imageEsame);
    sezione.appendChild(tag);
    const Dettagli = document.createElement('div');
    Dettagli.textContent = serv.Descrizione;
    tag.appendChild(Dettagli);
    const buttonPreferiti = document.createElement('div');
    buttonPreferiti.classList.add('button');
    buttonPreferiti.textContent = 'Aggiungi ai Preferiti';
    tag.appendChild(buttonPreferiti);
    buttonPreferiti.addEventListener('click', addFavorites);
    return buttonPreferiti;
}

function hideService(event) {
    const sezione = event.currentTarget.parentNode.querySelector('.servizi');
    sezione.classList.add("invisible");
    event.currentTarget.parentNode.querySelector('.servizi h1').classList.add("invisible");
    event.currentTarget.textContent = "Scopri di più";
    event.currentTarget.addEventListener('click', showService);
    sezione.innerHTML = '';
    const titolo = document.createElement('h1');
    titolo.classList.add('invisible');
    titolo.textContent = 'I Servizi Di Questo Reparto';
    sezione.appendChild(titolo);
    const button = event.currentTarget.parentNode.querySelector('.descrizione .button');
    button.removeEventListener('click', hideService);
}

function addFavorites(event) {
    const favorites = document.querySelectorAll('.preferiti .servizio');
    console.log(favorites.length);
    if (favorites.length === 0) {
        document.querySelector('.preferiti').classList.remove('invisible');
    }
    for (const serv of SERVIZI_MAP) {
        if (serv.Nome === (event.currentTarget.parentNode.querySelector('h1').textContent)) {
            const bottone = createDivService(document.querySelector('.preferiti'), serv);
            bottone.removeEventListener('click', addFavorites);
            bottone.addEventListener('click', removeFavorites);
            bottone.textContent = 'Rimuovi dai preferiti';
        }
    }
    event.currentTarget.classList.add('invisible');
}

function removeFavorites(event) {
    event.currentTarget.textContent = 'Aggiungi ai preferiti';
    event.currentTarget.removeEventListener('click', removeFavorites);
    const servizi = document.querySelectorAll('.servizio');

    for (const servizio of servizi) {
        if (servizio.querySelector('h1').textContent === event.currentTarget.parentNode.querySelector('h1').textContent) {
            servizio.querySelector('.button').classList.remove('invisible');
        }
    }
    event.currentTarget.parentNode.parentNode.removeChild(event.currentTarget.parentNode);
    const favorites = document.querySelectorAll('.preferiti .servizio');
    console.log(favorites.length);
    if (favorites.length === 0) {
        document.querySelector('.preferiti').classList.add('invisible');
    }
}

function ricerca(event) {
    event.preventDefault();
    const sezione = document.getElementById('risultati');
    const input = document.getElementById('search');
    console.log(input.value);
    sezione.innerHTML = '';
    for (const serv of SERVIZI_MAP) {

        if ((serv.Nome.toLowerCase().indexOf(input.value.toLowerCase())) >= 0) {
            console.log(serv.Nome.toLowerCase());
            createDivService(sezione, serv);
        }
    }
    if (input.value === '') {
        sezione.innerHTML = '';
    }
}
const search = document.querySelector('#search');
search.addEventListener('keyup', ricerca);
const submit = document.querySelector('#submit');
submit.addEventListener('sumbit', ricerca);

let bottoni = document.querySelectorAll('.button');

for (const bottone of bottoni) {
    bottone.addEventListener('click', showContent);
}
let bottoni2 = document.querySelectorAll('.button2');

for (const bottone2 of bottoni2) {
    bottone2.addEventListener('click', showService);
}


/*parte del mhw3 rest api */

fetch('https://api.covid19api.com/summary').then(onResponse).then(onJson)

function onJson(json) {
    var italia;
    const paesi = json.Countries;
    for (let paese of paesi) {
        if (paese.Country == "Italy") {
            italia = paese;
            break;
        }
    }
    console.log(italia);
    const nuovi = document.querySelector('#new');
    const generali = document.querySelector('#generale');

    const dati_nuovi = document.createElement('div');
    dati_nuovi.classList.add('Yellow')
    dati_nuovi.textContent = 'Nuovi casi ' + italia['NewConfirmed'];
    nuovi.appendChild(dati_nuovi);

    const morti = document.createElement('div');
    morti.classList.add('Red')
    morti.textContent = 'Morti oggi ' + italia['NewDeaths'];
    nuovi.appendChild(morti);

    const guariti = document.createElement('div');
    guariti.classList.add('Green')
    guariti.textContent = 'Guariti oggi ' + italia['NewRecovered'];
    nuovi.appendChild(guariti);

    const totali = document.createElement('div');
    totali.classList.add('Yellow')
    totali.textContent = 'Casi inizio ' + italia['TotalConfirmed'];
    generali.appendChild(totali);

    const totaliMorti = document.createElement('div');
    totaliMorti.classList.add('Red')
    totaliMorti.textContent = 'Totale Morti ' + italia['TotalDeaths'];
    generali.appendChild(totaliMorti);

    const totaliGuariti = document.createElement('div');
    totaliGuariti.classList.add('Green')
    totaliGuariti.textContent = 'Totali guariti ' + italia['TotalRecovered'];
    generali.appendChild(totaliGuariti);
}

function onResponse(response) {
    console.log('risposta ricevuta');
    return response.json();

}

// rest api nutritionix

const APP_ID = 'b545a288';
const API_KEY = 'bb8be6710ca37d5963b89eb2e095aa89';

function ricerca2(event) {
    event.preventDefault();
    const query = document.querySelector('#dieta #cibo').value;
    const url = 'https://trackapi.nutritionix.com/v2/search/instant?query=' + query;
    fetch(url,
        {
            headers: {
                'Content-Type': 'application/json',
                'x-app-id': APP_ID,
                'x-app-key': API_KEY,
            },
        }
    ).then(onResponse2).then(onjson2);
}



function onResponse2(response) {
    console.log('risposta ricevuta');
    console.log(response);
    return response.json();

}


function onjson2(json) {
    console.log(json);
    const sezione = document.querySelector('#risposte');
    sezione.innerHTML = '';
    const risposte = json.branded;

    for (let i = 0; i < 3; i++) {
        const tag = document.createElement('div');
        tag.classList.add('servizio');
        const title = document.createElement('h1');
        title.textContent = risposte[i].brand_name_item_name;
        tag.appendChild(title);
        const image = document.createElement('img');
        image.src = risposte[i].photo['thumb'];;
        tag.appendChild(image);
        sezione.appendChild(tag);
        const Dettagli = document.createElement('div');
        Dettagli.textContent = 'Calorie : ' + risposte[i].nf_calories + ' kcal per '+ risposte[i].serving_qty + ' '+ risposte[i].serving_unit;
        Dettagli.classList.add('details')
        tag.appendChild(Dettagli);
    }
}

const submit2 = document.querySelector('#dieta form');
submit2.addEventListener('submit', ricerca2);
console.log(submit2);



