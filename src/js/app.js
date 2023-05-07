import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();

const api = '644f531b9f034dfdbbb123606230705'

function removeCard(){
    const prevCard = document.querySelector('.card')
    if (prevCard) prevCard.remove();
}

function showError(header){
    let html = `<div class="card">нет такого города</div>`;
    header.insertAdjacentHTML('afterend', html)
}

function showCard(data, header){
    const par = {
        name : data.location.name,
        country : data.location.country,
        temp : data.current.temp_c,
        icon : data.current.condition.icon,
        condition : data.current.condition.text,
    }

    let html = `<div class="card">
    <h2 class="card-city"> ${par.name} <span>${par.country}</span></h2>
    <div class="card-weather">
        <div class="card-value">${par.temp}<sup>°c</sup></div>
        <img class="card-img" src="${par.icon}" alt="Weather">
    </div>
    <div class="card-description">${par.condition}</div>
</div>`;
    header.insertAdjacentHTML('afterend', html);
}

const form = document.querySelector('.form')
const input = document.querySelector('.input')
const header = document.querySelector('.header')
form.onsubmit = function(e) {
    e.preventDefault()
    let city = input.value.trim();
    const url = `http://api.weatherapi.com/v1/current.json?key=${api}&q=${city}`
    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data);
            if (data.error) {
                removeCard()
                showError(header)
            } else {
                removeCard()
                showCard(data, header)
            }
        })
};

