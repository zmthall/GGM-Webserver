class PageHandler {
    constructor() {
        const _this = this
        console.log(_this)
        this.buttons = {
            mobile_nav: {
                button: document.querySelector('[data-nav-btn]'),
                sublinkButtons: document.querySelectorAll('[data-navigation-btn]'),
                isX: false
            },
            main_nav: {
                linkWrappers: document.querySelectorAll('[data-link-wrapper]'),
                sublinkWrappers: document.querySelectorAll('[data-sublink-wrapper]'),
                timeoutVar: new Array(document.querySelectorAll('[data-link-wrapper]').length)
            },
            footer: {
                moreInfo: document.querySelectorAll('[data-info-btn]')
            }
        }

        this.footer = {
            width: undefined,
            elements: {
                width: undefined,
                infoFooter: document.querySelector('[data-info-footer]'),
            }
        }

        this.screen = {
            width: window.innerWidth
        }

        this.r = document.querySelector(':root')

        this.createEventHandlers()
        this.setFooterContentWidth()
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
                document.body.classList.toggle("no-scroll")
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

        this.buttons.main_nav.linkWrappers.forEach(element => {
            element.addEventListener("mouseenter", (event) => {
                const IDX = event.target.getAttribute('data-idx')
                const sublink = event.target.querySelector('[data-sublink-wrapper]');

                if(this.buttons.main_nav.timeoutVar[IDX]) {
                    clearTimeout(this.buttons.main_nav.timeoutVar[IDX])
                    this.buttons.main_nav.timeoutVar[IDX] = undefined
                }


                sublink.classList.remove('hidden')
                setTimeout(() => {
                    sublink.classList.add('active')
                }, 1);
            })

            element.addEventListener("mouseleave", (event) => {
                const IDX = event.target.getAttribute('data-idx')
                const sublink = event.target.querySelector('[data-sublink-wrapper]');
                sublink.classList.remove('active')
                this.buttons.main_nav.timeoutVar[IDX] = setTimeout(() => {
                    sublink.classList.add('hidden')
                }, 750);
            })
        })

        this.buttons.mobile_nav.sublinkButtons.forEach(button => {
            button.addEventListener("click", (event) => {
                const buttonIcons = button.querySelectorAll("span")
                buttonIcons.forEach(icon => {
                    icon.classList.toggle("hidden")
                })

                if(button.nextElementSibling.classList.contains("hidden")) {
                    button.nextElementSibling.classList.remove("hidden")
                    setTimeout(() => {
                        button.nextElementSibling.classList.add("active")
                    }, 1);
                } else {
                    button.nextElementSibling.classList.remove("active")
                    setTimeout(() => {
                        button.nextElementSibling.classList.add("hidden")
                    }, 300);
                }
            })
        })
    }

    getVariableValue(variableName) {
        var rs = getComputedStyle(this.r)
        if(typeof variableName === "string") return rs.getPropertyValue(variableName)
        else return -1
    }

    setVariableValue(variableName, value) {
        if(typeof variableName === 'string' && typeof value === 'string') 
            this.r.style.setProperty(variableName, value)
        else return -1
    }

    setFooterContentWidth() {
        window.addEventListener("resize", () => {
            this.footer.width = this.footer.elements.infoFooter.offsetWidth
            this.screen.width = window.innerWidth
            if(this.screen.width >= 1000 && this.screen.width < 1800) {
                this.footer.elements.width = this.footer.width/5 - 8
            } else {
                this.footer.elements.width = 310
            }
            this.setVariableValue('--info-footer-content-width', `${this.footer.elements.width}px`)
        })

    }
}

window.addEventListener("load", () => {
    const pageHandler = new PageHandler()
    pageHandler.footer.width = pageHandler.footer.elements.infoFooter.offsetWidth
    if(pageHandler.screen.width >= 1000 && this.screen.width < 1800) {
        pageHandler.footer.elements.width = pageHandler.footer.width/5 - 8
    } else {
        pageHandler.footer.elements.width = 310
    }
    pageHandler.setVariableValue('--info-footer-content-width', `${pageHandler.footer.elements.width}px`)
})