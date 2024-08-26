class ApplicationHandler {
    constructor() {
        this.date = (new Date()).toLocaleString()
        
        this.form = {
            select: document.querySelector('[data-select]'),
            selectOption: this.GetURLParameter('select'),
            dateInput: document.querySelector('[data-form-date]'),
            positionInput: document.querySelector('[data-form-position]')
        }

        
        window.addEventListener("load", (event) => {
            this.form.dateInput.value = this.date
            
            if(this.form.selectOption != undefined) {
                this.form.positionInput.value = this.form.selectOption
                this.form.select.value = this.form.selectOption
            } else {
                this.form.positionInput.value = "general"
            }
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

}

const application = new ApplicationHandler()