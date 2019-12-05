class Validator {
    constructor(form) {
        this.regexpression = {
            name: /^[a-zа-яё]+ [a-zа-яё]+ [a-zа-яё]+$/i,
            city: /^[a-zа-яё]+$|^[a-zа-яё]+$\s^[a-zа-яё]+$|^[a-zа-яё]+$\.\^[a-zа-яё]+$/i,
            adress: /^[a-zа-яё]+$/i,
            index: /^[0-9]+/,
            cartName: /^[a-z]+ [a-z]+$/i,
            cartNumber: /^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/,
        };

        this.errors = {
            name: 'Имя содержт только буквы',
            city: 'Город содержит только буквы',
            adress: 'Адрес содержит только название улицы без номера дома',
            index: 'Индекс содержит только цифры',
            cartName: 'Только латиница',
            cartNumber: 'номер карты в формате xxxx xxxx xxxx xxxx'
        };

        this.errorClass = 'errorMessage';
        this.form = form;
        this.valid = false;
        this.validateForm();
    }


    validateForm() {
        let userForm = [...document.querySelector(this.form).getElementsByTagName('input')];
        for (let field of userForm) {
            this.validate(field)
        }
    }

    validate(field) {
        if (this.regexpression[field.name]) {
            if (!this.regexpression[field.name].test(field.value)) {
                field.classList.add('invalid');
                this.creatMessage(field);
                this.watchField(field);
            }
        }
    }

    creatMessage(field) {
        let error = `<div class="${this.errorClass}">${this.errors[field.name]}</div>`;
        field.parentNode.insertAdjacentHTML('beforeend', error);
    }

    watchField(field) {
        field.addEventListener('input', () => {
            if (this.regexpression[field.name].test(field.value)) {
                field.classList.add('valid');
                field.classList.remove('invalid');
            }
        })
    }

}

document.querySelector('.myForm').addEventListener('submit', event => {
    let valid = new Validator('.myForm');
    if (!valid.valid) {
        event.preventDefault()
    }
});
