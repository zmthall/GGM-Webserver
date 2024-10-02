class OnSiteRecaptcha {
    constructor() {
        this.form = document.forms['contact-form'];
        this.formType = this.form.getAttribute('data-form-type')
        this.publicKey = '6LeZz0UqAAAAACaVm35S2EemtZ1XGc_T1GV4o0wf'
        this.verifyURL = this.getVerifyURL()

        this.createEventListener();
    }

    async createEventListener() {
        const _this = this
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            grecaptcha.ready(function() {
                grecaptcha.execute(_this.publicKey, {action: 'submit'}).then(async function(token) {
                    const data = _this.createData(token);
                    console.log(data)
                    const verify = await _this.verifySubmission(data)
                    if(verify === 200) {
                        const redirectURL = new URL('/contact-us/thank-you', window.location.origin);
                        window.location.replace(redirectURL);
                    }
                });
            });
        })
    }
    
    getVerifyURL() {
        if(this.formType === 'contact')
            return '/contact-us/send-email'
        else if(this.formType === 'application')
            return '/about-us/employment/apply'
    }

    createData(token) {
        const formData = new FormData(document.forms['contact-form']);
        formData.append('captcha', token)
        
        return formData;
    }

    async verifySubmission(data) {
        const request = new Request(this.verifyURL, {
            method: "POST",
            body: data
        });

        try {
            const response = await fetch(request);
            console.log(await response.json())
            return response.status
        } catch(error) {
            return false
        }
    }
}

const recaptchaController = new OnSiteRecaptcha()