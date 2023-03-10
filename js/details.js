const container = document.getElementById('detail_card');

const params = new URLSearchParams(location.search);

const id = params.get('id');

let detail = data.events.find(element => element._id === id);

function createDetail(obj){
    return`<div class="card2">
    <div class="row g-0">
        <div class="col-md-12 col-lg-6 d-flex align-items-center p-3">
        <img src="${obj.image}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-12 col-lg-6 d-flex justify-content-center">
        <section class="card-body d-flex flex-column 
        align-items-center justify-content-center flew-wrap section_details">
        <h1 class="card-title2">${obj.name}</h1>
        <h3 class="card-text2">Date: ${obj.date}</h3>
        <h5 class="card-text2">Description: ${obj.description}</h5>
        <h5 class="card-text2">Category: ${obj.category}</h5>
        <h5 class="card-text2">Place: ${obj.place} </h5>
        <h5 class="card-text2">Capacity: ${obj.capacity}</h5>
        <h5 class="card-text2">${obj.assistance ? 'Assistence: ' + obj.assistance : 'Estimate: ' + obj.estimate}</h5>
        <h5 class="card-text2">Price: ${obj.price}</h5>
        </section>
        </div>
    </div>
</div>`
}

function renderDetail(obj,element){
    let template = ''
    template += createDetail(obj)
    element.innerHTML =template
}
renderDetail(detail, container);