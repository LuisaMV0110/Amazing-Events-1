const $container_cards = document.getElementById('container_cards');
const cards = data.events;
function createCard (events){
    return `<div class="card card3">
    <img src="${events.image}" class="card-img-top img_cards" alt="Picture of ${events.name}">
    <section class="card-body text-center">
    <h5 class="card-title">${events.name}</h5>
    <p class="card-text">${events.description}</p>
    </section>
    <section class="card_textbtn d-flex justify-content-around align-items-center mb-2">
    <h6>Price: ${events.price} usd</h6>
    <a href="./details.html" class="btn btn-outline-danger">See More</a>
    </section>
    </div>` 
};

function addCards(listCards, element){
    let template = '';
    for(let element of listCards){
        template += createCard(element)
    }
    element.innerHTML = template;
};



function filterCards(list){
    let past = []
    for( let element of list.events){
        if( element.date < list.currentDate){
            past.push(element);
        }
    }
    addCards(past,$container_cards) 
}

filterCards(data);