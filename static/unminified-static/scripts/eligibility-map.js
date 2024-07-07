class MapHandler {
    constructor() {
        this.map = {
            section: document.querySelector('[data-eligible-places-container]'),
            modalOpen: document.querySelector('[data-map-container]'),
            wrapper: document.querySelector('[data-map-container]').cloneNode(true),
            container: document.createElement('div'),
            button: document.createElement('button'),
        }

        this.map.modalOpen.addEventListener('click', () => this.modalInjection())
    }

    containerSetup() {
        this.map.container.classList.add("eligibility-map", "pop-up-modal")
        this.map.container.setAttribute('data-map-modal-container', '')
        this.map.button.classList.add('close-button')
        this.map.button.setAttribute('data-close-button', '')
        this.map.button.innerHTML = 'X'

        this.map.wrapper.setAttribute("class", "eligibility-map-wrapper pop-up-modal")
        
        this.map.container.append(this.map.button)
        this.map.container.append(this.map.wrapper)

        this.map.button.addEventListener('click', () => this.modalDelete())

        return this.map.container
    }

    modalInjection() {
        var screenWidth = screen.width
        
        if(screenWidth > 768) {
            this.map.section.append(this.containerSetup())
            document.body.classList.add('no-scroll')
            this.map.container = document.querySelector('[data-map-modal-container]')
        }
    }

    modalDelete() {
        this.map.container.remove()
        document.body.classList.remove('no-scroll')
        this.map.container = document.createElement('div')
    }
}

const mapHandler = new MapHandler()
console.log(mapHandler)