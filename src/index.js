import './css/styles.css';

const DEBOUNCE_DELAY = 300;

import { debounce } from 'lodash';

import { fetchCountries } from './js/fetchCountries'

import Notiflix from 'notiflix';

const baseUrl = 'https://restcountries.com/v3.1/name/';
const inputForm = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputForm.addEventListener('input', debounce(getData), DEBOUNCE_DELAY);

function getData(e) {
    const inputData = inputForm.value.trim();
    console.log(inputData)
    // const inputData = e.currentTarget.value;
    if (!inputData) {
        return;
    };
    fetchCountries(inputData)
        .then((data) => {
            console.log(data)
            if (data.length > 10) {
                Notiflix.Notify.info('too many')
            };
            if (data.length === 1) {
                printOne(data)
            };
            printMany(data);
        })
        .catch((error) => Notiflix.Notify.info(error))
};




function printMany(data) {
    const markUp = data.map((item) => {
        return `<li class="country-list-item">
                <img src='${item.flag}' alt='${item.name} flag' width='100' />
                <p><b>${item.name}</b></p>
            </li>`;
    }).join("");
    // console.log(markUp)
    countryList.innerHTML = markUp;

}





function printOne(data) {
    const markUp = data.map((item) => {
        `<li class="country-list-item">
            <img src='${item.flag}' alt='${item.name} flag' width='100' />
            <p><b>${item.name}</b></p>
        </li>`;
    }).join("");

    countryInfo.innerHTML = markUp;

}

