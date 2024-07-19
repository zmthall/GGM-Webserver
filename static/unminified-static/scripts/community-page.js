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

        this.slider = {
            buttons: {
                shift: document.querySelectorAll('[data-carousel-btn]'),
                more: document.querySelector('[data-carousel-more-image-btn'),
                indicators: document.querySelectorAll('[data-slide-indicator]')
            },
            slides: document.querySelectorAll('[data-carousel-image-slides]')
        }

        this.slider.buttons.shift.forEach(btn => {
            btn.addEventListener('click', (event) => {
                if(btn.getAttribute('data-carousel-btn') === 'left') {
                    this.prevImage(event)
                } else if(btn.getAttribute('data-carousel-btn') === 'right') {
                    this.nextImage(event)
                }
            })
        })

        this.slider.buttons.indicators.forEach(indicator => {
            indicator.addEventListener('click', (event) => {
                let currentSlide = document.querySelector(`[data-current-slide='yes']`)
                let selectedIdx = indicator.getAttribute('data-slide-indicator')
                let currentSlideIDX = currentSlide.getAttribute('data-carousel-image-slides')

                if(selectedIdx != currentSlideIDX)
                    this.setSlide(currentSlideIDX, selectedIdx)
            })
        })
    }
    
    get currentSlide() {
        let currentSlide = document.querySelector(`[data-current-slide='yes']`)
        let currentSlideIDX = currentSlide.getAttribute('data-carousel-image-slides')
        return { currentSlide, currentSlideIDX }
    }

    toggleInfo(event) {
        event.target.previousElementSibling.classList.toggle('expanded')
        if(event.target.innerHTML === 'more') {
            event.target.innerHTML = 'less'
        } else if(event.target.innerHTML === 'less') {
            event.target.innerHTML = 'more'
        }
    }

    nextImage(event) {
        let slide = this.currentSlide
        this.hideSlide(slide.currentSlide)
        this.showSlide(parseInt(slide.currentSlideIDX) + 1)
    }

    prevImage(event) {
        let slide = this.currentSlide
        this.hideSlide(slide.currentSlide)
        this.showSlide(parseInt(slide.currentSlideIDX) - 1)
    }

    hideSlide(slide) {
        slide.classList.remove('shown')
        slide.classList.add('hidden')
        slide.setAttribute('data-current-slide', 'no')
    }

    showSlide(idx) {
        let currentSlide
        if(idx < this.slider.slides.length && idx > 0) {
            currentSlide = this.slider.slides[idx]
        } else if(idx < 0) {
            currentSlide = this.slider.slides[this.slider.slides.length - 1]
        } else {
            currentSlide = this.slider.slides[0]
        }

        this.setIndicator(parseInt(currentSlide.getAttribute('data-carousel-image-slides')))
        currentSlide.classList.add('shown')
        currentSlide.classList.remove('hidden')
        currentSlide.setAttribute('data-current-slide', 'yes')
    }

    setSlide(idx, newIdx) {
        this.hideSlide(this.slider.slides[idx])
        this.showSlide(newIdx)
    }

    setIndicator(idx) {
        this.resetIdicators()
        this.slider.buttons.indicators[idx].classList.add('selected')
    }

    resetIdicators() {
        this.slider.buttons.indicators.forEach(indicator => {
            if(indicator.classList.contains('selected'))
                indicator.classList.remove('selected')
        })
    }
}

window.addEventListener("load", () => {
    const ggmEventHandler = new GGMEventHandler()
})