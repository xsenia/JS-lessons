class Validator {
    constructor({selector,pattern,method}) {
        this.form = document.querySelector(selector);
        this.pattern = pattern;
        this.method = method;
        //т.к. form.elements это коллекция и к ней не может применяться фильтр, необходим массив, самый обычный способ - это скопировать элементы в новый массив с помощью спред-оператора
        this.elementsForm = [...this.form.elements].filter(item => {
            return item.tagName.toLowerCase() !== 'button' && item.type !== 'button';
        });
    }

    init() {
        this.aplyStyle();
        this.elementsForm.forEach(elem => elem.addEventListener('change', this.chekIt.bind(this)));
    }

    isValid(elem){
        return false;
    }

    chekIt(elem) {
        const target = event.target;
        console.log(this);
        if(this.isValid(target)){
            this.showSuccess(target);
        } else {
            this.showError(target);
        }
    }

    showError(elem) {
        elem.classList.remove('success');
        elem.classList.add('error');
        if(elem.nextElementSibling.classList.contains('validator-error')) {
            return;
        }
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Ошибка в этом поле';
        errorDiv.classList.add('validator-error');
        elem.insertAdjacentElement('afterend',errorDiv);
    }

    showSuccess(elem) {
        elem.classList.remove('error');
        elem.classList.add('success');
        if(elem.nextElementSibling.class.contains('validator-error')) {
            elem.nextElementSibling.remove();
        }
    }

    aplyStyle(elem) {
        const style = document.createElement('style');
        style.textContent = `
            input.success {
                border: 2px solid green;
            }
            input.error {
                border: 2px solid red;
            }
            .validator-error {
                font-size: 14px;
                color: red;
            }
        `;
        document.head.appendChild(style)
    }


}