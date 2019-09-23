//maskPhone('#phone');

const myForm = document.getElementById('myForm');

myForm.addEventListener('submit', valid);

const elementsForm = [];


for(const elem of myForm.elements){
    if(elem.tagName.toLowerCase() !== 'button' && elem.type !== 'button'){
        elementsForm.push(elem);
    }
}

console.log('elementsForm: ', elementsForm);

function valid(event) {
    const patternPhone = /^\d+$/;
    elementsForm.forEach(elem => {
        if(!elem.value){
            elem.style.border = "solid red";
            event.preventDefault();
        } else {
            elem.style.border = "";
        }

        if(elem.id === 'phone' && !patternPhone.test(elem.value)) {
            elem.style.border = "solid red";
            event.preventDefault();
        }
    });
}