const $ = selector => document.querySelector(selector);
//.....................................................
const $highestPercent = $('#highestPercent');
const $lowestPercent = $('#lowestPercent');
const $largerCapacity = $('#largerCapacity');
const $table2 = $('#table_2');
const $table3 = $('#table_3');

    fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(dataEvents => {
        const eventsFilter = dataEvents.events.filter(
            event0 => event0.date < dataEvents.currentDate
        );
        const eventsFilterUpcoming = dataEvents.events.filter(
            event0 => event0.date > dataEvents.currentDate
        ); 
        const result = eventsFilter.sort((event1, event2) => {
            return(
                (event1.assistance / event1.capacity) * 100 -
                (event2.assistance / event2.capacity) * 100
            );
        });
        const resultLargerCapacity = dataEvents.events
        .sort((event1, event2) => event1.capacity - event2.capacity).slice(-2);
        const eventHighestAttendance = dataEvents.events = result.slice(-1);
        const eventLowestAttendance = dataEvents.events = result.slice(0, 1);
        function assistance(obj, element) {
            let percent = Number((obj.assistance/obj.capacity)*100).toFixed(1)
                    element.innerHTML = obj.name + ` ${percent}%`}
        function assistance2(obj, element){
            let capacity = obj.capacity
            element.innerHTML = obj.name + ` ${capacity}`;
        }
        assistance(eventHighestAttendance[0], $highestPercent);
        assistance(eventLowestAttendance[0], $lowestPercent);
        assistance2(resultLargerCapacity[0], $largerCapacity);
        //...................................UPCOMING EVENTS........................................
        const categories = {};
        eventsFilterUpcoming.forEach(propertyEvents => {
            if(!categories[propertyEvents.category]){
                categories[propertyEvents.category] = {
                    price: 0,
                    estimate: 0,
                    capacity: 0
                };
            }
            categories[propertyEvents.category].price += propertyEvents.price * propertyEvents.estimate;
            categories[propertyEvents.category].capacity += propertyEvents.capacity;
            categories[propertyEvents.category].estimate += propertyEvents.estimate;
        });
        let table = '';
        for(const category in categories){
            const price = categories[category].price;
            const estimated = categories[category].estimate;
            const capacity = categories[category].capacity;
            let valuePercent = Number((estimated * 100) / capacity).toFixed(1);
            let template = () => {
                return `                    
                <tr>
                <td>${category}</td>
                <td>${price}</td>
                <td>${valuePercent}%</td>
                </tr>`
            };
            table += template();
        }
        $table2.innerHTML = table;
        //.......................................PAST EVENT............................................
        const categories2 = {};
        eventsFilter.forEach(propertyEvents => {
            if(!categories2[propertyEvents.category]){
                categories2[propertyEvents.category] = {
                    price: 0,
                    assistance: 0,
                    capacity: 0
                };
            }
            categories2[propertyEvents.category].price += propertyEvents.price * propertyEvents.assistance;
            categories2[propertyEvents.category].capacity += propertyEvents.capacity;
            categories2[propertyEvents.category].assistance += propertyEvents.assistance;
        });
        let table2 = '';
        for(const category in categories2){
            const price2 = categories2[category].price;
            const attendance = categories2[category].assistance;
            const capacity2 = categories2[category].capacity;
            let valuePercent2 = Number((attendance * 100) / capacity2).toFixed(1);
            let template2 = () => {
                return `                    
                <tr>
                <td>${category}</td>
                <td>${price2}</td>
                <td>${valuePercent2}%</td>
            </tr>`
            };
            table2 += template2();
        }
        $table3.innerHTML = table2;
    })
    .catch(error => console.log(error));

