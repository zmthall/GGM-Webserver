class ApplicationHandler {
    constructor() {
        const _this = this

        this.date = (new Date()).toLocaleString()
        
        this.form = {
            select: document.querySelector('[data-select]'),
            selectOption: this.GetURLParameter('select'),
            dateInput: document.querySelector('[data-form-date]'),
            positionInput: document.querySelector('[data-form-position]'),
            dynamicForm: {
                driverSection: document.querySelector('[data-driving-section]'),
                dynamicRadios: document.querySelectorAll('[data-dynamic-radio]')
            }
        }

        
        window.addEventListener("load", (event) => {
            this.form.dateInput.value = this.date
            if(this.form.select.selectedOptions[0].getAttribute('data-job-type') === 'driver')
                this.form.dynamicForm.driverSection.classList.remove('hidden');
            
            if(this.form.selectOption != undefined) {
                this.form.positionInput.value = this.form.selectOption
                this.form.select.value = this.form.selectOption
            } else {
                this.form.positionInput.value = "general"
            }

            this.form.select.addEventListener('change', () => {
                if(_this.form.select.selectedOptions[0].getAttribute('data-job-type') === 'driver') {
                    if(this.form.dynamicForm.driverSection.classList.contains('hidden')) {
                        this.form.dynamicForm.driverSection.classList.remove('hidden')
                    }
                } else {
                    if(!this.form.dynamicForm.driverSection.classList.contains('hidden')) {
                        this.form.dynamicForm.driverSection.classList.add('hidden')
                    }
                }
            })

            this.form.dynamicForm.dynamicRadios.forEach(radio => {
                radio.addEventListener('change', (event) => {
                    const dataName = event.target.getAttribute('data-dynamic-radio')
                    const radioID = event.target.id;
                    const extraInput = event.target.closest(`[data-parent-container='${dataName}']`).querySelector('.extra-input');
                    console.log(extraInput)

                    if(/yes|part-time/.test(radioID)) {
                        if(extraInput.classList.contains('hidden')) 
                            extraInput.classList.remove('hidden')
                    } else {
                        if(!extraInput.classList.contains('hidden'))
                            extraInput.classList.add('hidden')
                    }
                })
            })
        })
    }

    GetURLParameter(name) {
        let value
        let pageParameters = window.location.search.slice(1).split("&")
        pageParameters.forEach(pageParameter => {
            let parameter = pageParameter.split("=")
            if(name === parameter[0]) {
                value = parameter[1] ? parameter[1] : parameter[0]
                return false
            }
        })
        return value
    }

    positionSelectorChange() {
        // if(_this.form.select.selectedOptions[0].getAttribute('data-job-type') === 'driver') {
        //     if(_this.form.dynamicForm.driverSection.classList.contains('hidden'))
        //         _this.form.dynamicForm.driverSection.classList.remove('hidden')
        //     else
        //         _this.form.dynamicForm.driverSection.classList.add('hidden')
        // }
    }
}

const application = new ApplicationHandler()