import './css/styles.css';

const DEBOUNCE_DELAY = 300;

import { debounce } from 'lodash';

import { fetchCountries } from './js/fetchCountries'

import Notiflix from 'notiflix';

const baseUrl = 'https://restcountries.com/v3.1/name/';
const inputForm = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryCard = document.querySelector('.country-info');

inputForm.addEventListener('input', debounce(getData), DEBOUNCE_DELAY);

function getData(e) {
    const inputData = inputForm.value.trim();
    countryCard.innerHTML = '';
    countryList.innerHTML = '';

    if (!inputData) {
        return;
    };
    fetchCountries(inputData)
        .then((data) => {
            console.log(data)
            if (data.status === 404) {
                Notiflix.Notify.info("Oops, there is no country with that name.")
            };
            if (data.length > 10) {
                return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
            };
            if (data.length === 1) {
                return printOne(data)
            };
            return printMany(data);
        })
        .catch((error) => console.error(error))
};

function printMany(data) {
    countryCard.innerHTML = '';

    const markUp = data.map((item) => {
        return `<li class="country-list-item">
                    <img src='${item.flag}' alt='${item.name} flag' width='100' />
                    <p><b>${item.name}</b></p>
                </li>`;
    }).join("");
    countryList.innerHTML = markUp;
}

function printOne(data) {
    countryList.innerHTML = '';

    const markUp = data.map((item) => {
        return `<div class="country-info-card">
                    <img src='${item.flag}' alt='${item.name} flag' width='200' />
                    <h2>${item.name}</h2>
                    <p><b>Capital</b>: ${item.capital}</p>
                    <p><b>Population</b>: ${item.population}</p>
                    <p><b>Languages</b>: ${item.languages.map(key => ` ${key.name}`)}</p>
                </div>`;
    }).join("");
    countryCard.innerHTML = markUp;
}

