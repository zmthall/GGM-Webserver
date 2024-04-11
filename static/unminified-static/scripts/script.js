class ButtonHandler {
    constructor() {
        this.buttons = {
            mobile_nav: {
                button: document.querySelector('[data-nav-btn]'),
                isX: false
            },
            footer: {
                moreInfo: document.querySelectorAll('[data-info-btn]')
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

        this.buttons.footer.moreInfo.forEach(button => {
            button.addEventListener("click", (event) => {
                let icons = Array.from(button.children)
                icons.forEach(icon => {
                    icon.classList.toggle("hidden")
                })

                let prevEl = event.target.previousElementSibling
                prevEl.classList.toggle("collapsed")
            })
        })
    }   
}

const headerBtnHandler = new ButtonHandler()
