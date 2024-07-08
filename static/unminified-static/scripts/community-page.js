class GGMEventHandler {
    constructor() {
        this.events = {
            buttons: document.querySelectorAll('[data-event-expand-btn]')
        }

        this.events.buttons.forEach(button => {
            button.addEventListener('click', (event) => {
                this.toggleInfo(event)
            })
        })
    }

    toggleInfo(event) {
        event.target.previousElementSibling.classList.toggle('expanded')
        if(event.target.innerHTML === 'more') {
            event.target.innerHTML = 'less'
        } else if(event.target.innerHTML === 'less') {
            event.target.innerHTML = 'more'
        }
    }
}

window.addEventListener("load", () => {
    const ggmEventHandler = new GGMEventHandler()
})