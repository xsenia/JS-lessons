'use strict';

let btn = document.getElementById('btn');
    
function DomElement(selector, height, width, bg, fontSize) {    
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
}

DomElement.prototype.createTag = function() {    
    let str = this.selector;
    console.log('str: ', str);
    switch(str[0]) {
        case '.':
            this.createDiv(str);
            break;        
        case '#': 
            this.createP(str);
            break;
        default:
            alert('Начни с точки или решетки');
    }
};

DomElement.prototype.createDiv = function() {
    let div = document.createElement('div');
    div.className = this.selector.slice(1);
    div.innerHTML = this.selector.slice(1) + ' <b>Был создан див.</b> Нестандартный подход тормозит потребительский нишевый проект. Восприятие марки, конечно, оправдывает побочный PR-эффект, полагаясь на инсайдерскую информацию.';
    document.body.append(div);
    div.style.height = this.height;
    div.style.width = this.width;
    div.style.backgroundColor = this.bg;
    div.style.fontSize = this.fontSize;
    div.style.cssText='height:' + this.height + 'px;background-color: ' + this.bg +';width:' + this.width + 'px;font-size:'+ this.fontSize +'px;';
};

DomElement.prototype.createP = function() {
    let paragraf = document.createElement('p');
    paragraf.innerHTML = this.selector.slice(1) + ' <b>Был создан параграф.</b>  Нестандартный подход тормозит потребительский нишевый проект. Восприятие марки, конечно, оправдывает побочный PR-эффект, полагаясь на инсайдерскую информацию.';
    document.body.append(paragraf);
    paragraf.style.cssText='height:' + this.height + 'px;background-color: ' + this.bg +';width:' + this.width + 'px;font-size:'+ this.fontSize +'px;';
};


btn.addEventListener('click', () => {

    let selector = document.getElementById('selector').value,
        height =  document.getElementById('height').value,
        width =  document.getElementById('width').value,
        bg =  document.getElementById('bg').value,
        fontSize =  document.getElementById('fontSize').value;

    let domElement = new DomElement(selector, height, width, bg, fontSize); 

    domElement.createTag(selector, height, width, bg, fontSize);
});

