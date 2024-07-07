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

class FAQHandler {
    constructor() {
        this.faq = {
            buttons: document.querySelectorAll('[data-faqs-btn]'),
            containers: document.querySelectorAll('[data-faqs-container]')
        }

        this.faq.buttons.forEach(button => {
            button.addEventListener('click', () => {
                const IDX = parseInt(button.getAttribute('data-faqs-btn'))
                this.toggleFAQ(IDX)
                if(!button.classList.contains('expanded')) {
                    this.closeOtherFAQs(IDX)
                }
            })
        })
    }

    toggleFAQ(IDX) {
        this.faq.containers[IDX].classList.toggle('expanded')
    }

    closeOtherFAQs(IDX) {
        this.faq.containers.forEach((container, idx) => {
            if(idx != IDX && container.classList.contains('expanded')) {
                container.classList.remove('expanded')
            }
        })
    }
}

const mapHandler = new MapHandler()
const faqHandler = new FAQHandler()
console.log(faqHandler)
console.log(mapHandler)

