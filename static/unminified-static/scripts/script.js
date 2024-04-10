class headerButtonHandler {
    constructor() {
        this.buttons = {
            mobile_nav: {
                button: document.querySelector('[data-nav-btn]'),
                isX: false
            }
        }

        this.createEventHandlers()
    }

    createEventHandlers() {
        this.buttons.mobile_nav.button.addEventListener("click", () => {
            const btnLines = document.querySelector('[data-btn-lines]')
            const navDrawer = document.querySelector('[data-mobile-nav-drawer]')

            if(!navDrawer.classList.contains("active")) {
                navDrawer.classList.remove("hidden")
                navDrawer.classList.add("box-shadow")
            } else {
                setTimeout(() => {
                    navDrawer.classList.remove("box-shadow")
                    navDrawer.classList.add("hidden")
                }, 500);
            }

            setTimeout(() => {
                btnLines.classList.toggle("active")
                navDrawer.classList.toggle("active")
                docoument.body.classList.toggle("no-scroll")
            }, 1);
        })
    }   
}

const headerBtnHandler = new headerButtonHandler()
