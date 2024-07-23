window.addEventListener('load', (event) => {
    window.addEventListener("message", function (e) {
        const metaEls = document.querySelectorAll('meta[name=viewport]')
        metaEls.forEach(metaEl => {
            if(!metaEl.getAttribute('content').includes('scale=10.0')) {
                metaEl.remove()
            }
        })
    })
})