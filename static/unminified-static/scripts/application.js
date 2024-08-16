class ApplicationHandler {
    constructor() {
        this.form = {
            select: document.querySelector('[data-select]'),
            selectOption: this.GetURLParameter('select')
        }

        
        window.addEventListener("load", (event) => {
            console.log(this.form.selectOption)
            if(this.form.selectOption != undefined)
                this.form.select.value = this.form.selectOption
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