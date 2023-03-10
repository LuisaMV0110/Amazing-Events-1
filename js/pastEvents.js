const $ = selector => document.querySelector(selector);
//Obterner las referencias de los elementos
const $container_checkbox = $('#checkbox_container');
const $container_cards = $('#container_cards');
const $container_search = $('#form_search')
const cards = data.events; 

//agregar eventos
function filterCards(list){ 
    const current = data.currentDate
    let filters= list.filter(card=> card.date < current )
    return filters
};
const eventsPast = filterCards(cards);

function createCard (events){
    return `<div class="card card3">
    <img src="${events.image}" class="card-img-top img_cards" alt="Picture of ${events.name}">
    <section class="card-body text-center">
    <h5 class="card-title">${events.name}</h5>
    <p class="card-text">${events.description}</p>
    </section>
    <section class="card_textbtn d-flex justify-content-around align-items-center mb-2">
    <h6>Price: ${events.price} usd</h6>
    <a href="./details.html?id=${events._id}" class="btn btn-outline-danger">See More</a>
    </section>
    </div>` 
};

function message (){
    return `<h2>There are no events matching your search</h2>`
}
function addCards(listCards, element){
    let template = '';
    if(listCards.length === 0){
        element.innerHTML = message();
    }
    else{
        listCards.forEach(card => template += createCard(card))
        element.innerHTML = template
    }
};
addCards(eventsPast,$container_cards)

$container_checkbox.addEventListener('change', e => addCards(filterChecks(eventsPast), $container_cards));
$container_checkbox.addEventListener('change', e => addCards(crossFilter(), $container_cards));
function filterChecks(listCards){
    let chosen = [];
    const checkboxChecked = document.querySelectorAll('input[type="checkbox"]:checked')
    chosen = Array.from(checkboxChecked).map(card => card.value)
    if(chosen.length === 0){
        return listCards
    }
    else{
        return listCards.filter(card => chosen.includes(card.category))
    }
}
filterChecks(eventsPast);

$container_search.addEventListener('input', e => addCards(crossFilter(eventsPast),$container_cards));

function filterSearch(values){
    const search = $container_search.value.toLowerCase()
    if(search.length === 0){
        return values;
    }
    const searchFilter = values.filter(events =>{
        return events.name.toLowerCase().includes(search)})
    return searchFilter;
}
filterSearch(eventsPast);

function crossFilter(){
    return filterChecks(filterSearch(eventsPast, $container_search.value));
}