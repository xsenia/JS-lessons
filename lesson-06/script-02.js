'use strict';

let week = ['понедельник','вторник','среда','четверг','пятница','суббота','воскресенье'];
let container = document.getElementById('container');
let now = new Date();
now = now.getDay();

console.log('now: ', now);

for (let i=0; i<week.length; i++) {

    let elemId = i - 1;

    if (i<5) {
        container.innerHTML += '<p id="day' + elemId + '">' + week[i] + '</p>';
    } else {
        container.innerHTML += '<p id="day' + elemId + '"><i>' + week[i] + '</i></p>';
    }

    if (i == now) {
        let day = document.getElementById("day" + elemId);
        day.classList.add("bold");
        console.log(day);
    }

    
}

