const $ = selector => document.querySelector(selector);
//Obtener las referencias de los elementos
const $container_checkbox = $('#checkbox_container');
const $container_cards = $('#container_cards');
const $container_search = $('#form_search')
//agregar eventos

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(Response => Response.json())
    .then(cards => {
        addCards(cards.events, $container_cards)
        $container_checkbox.addEventListener('change', e =>
        addCards(crossFilter(cards.events), $container_cards))
        $container_search.addEventListener("input", e =>
        addCards(crossFilter(cards.events), $container_cards))
        const listCategory = Array.from(new Set(cards.events.map(card => card.category)));
        const categories = listCategory.reduce((acc, category) => {
            return acc += `<div class="form-check me-3">
                <input class="form-check-input" type="checkbox" value="${category}" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">${category}</label></div>`
        }, '')
        $container_checkbox.innerHTML += categories
    })
    .catch(error => console.log(error));

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

function createCard (events){
    return `<div class="card card3">
    <img src="${events.image}" class="card-img-top img_cards" alt="Picture of ${events.name}">
    <section class="card-body text-center">
    <h5 class="card-title">${events.name}</h5>
    <p class="card-text">${events.description}</p>
    </section>
    <section class="card_text btn d-flex justify-content-around align-items-center mb-3"> 
    <h6>Price: ${events.price} usd</h6>
    <a href="./details.html?id=${events._id}" class="btn btn-outline-danger">See More</a>
    </section>
    </div>` 
}

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

function filterSearch(values){
    const search = $container_search.value.toLowerCase()
    if(search.length === 0){
        return values;
    }
    const searchFilter = values.filter(events =>{
        return events.name.toLowerCase().includes(search)})
    return searchFilter;
}

function crossFilter(cards){
    return filterChecks(filterSearch(cards));
}