class SliderCarousel {
    constructor() {
        this.root = document.querySelector(':root')
        this.viewArea = document.querySelector('[data-view-area]')
        this.pageResizeResponse()

        window.addEventListener('resize', (event) => {
            this.pageResizeResponse()
        })
    }

    get slideX() {
        return getComputedStyle(this.root).getPropertyValue('--slide-item-x')
    }

    set viewAreaHeight(newValue) {
        this.root.style.setProperty('--slide-view-area-height', newValue)
    } 

    set slideX(newValue) {
        this.root.style.setProperty('--slide-item-x', newValue)
    }

    get containerWidth() {
        return this.viewArea.getBoundingClientRect().width
    }

    pageResizeResponse() {
        let temp = document.querySelector('.carousel-slide-item[data-slide-index="2"]')

        this.pageWidth = document.body.offsetWidth
        if(this.pageWidth <= 1600 && this.pageWidth > 1000) {
            temp.style.transition = 'transform .5s ease-in-out'
            this.slideX = `${(this.containerWidth - (6 * 16))/3.2}px`
            this.viewAreaHeight = `${(((this.containerWidth - (6 * 16))/3.2) * 1.2) + 48}px`
        } else if(this.pageWidth <= 1000 && this.pageWidth > 600) {
            temp.style.transition = 'unset'
            this.slideX = `${(this.containerWidth - (4 * 16))/2}px`
            this.viewAreaHeight = `${((this.containerWidth - (4 * 16))/2) + 48}px`
        } else if(this.pageWidth <= 600) {
            this.slideX = `${this.containerWidth - (2 * 16)}px`
            this.viewAreaHeight = `${this.containerWidth - (2 * 16) + 48}px`
        } else if(this.pageWidth > 1600) {
            this.slideX = `${(1376.04 - (6 * 16))/3.2}px`
            this.viewAreaHeight = `${(((1376.04 - (6 * 16))/3.2) * 1.2) + 48}px`
        }
        console.log(this.slideX);
    }
}

window.addEventListener('load', (event) => {
    const slider = new SliderCarousel()
    console.log(slider);
})