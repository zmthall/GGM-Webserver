class OnSiteRecaptcha {
    constructor() {
        this.form = document.forms['contact-form'];
        this.formType = this.form.getAttribute('data-form-type')
        this.publicKey = '6LeZz0UqAAAAACaVm35S2EemtZ1XGc_T1GV4o0wf'
        this.verifyURL = this.getVerifyURL()
        this.messageContainer = document.forms['contact-form'].querySelector('[data-submission-message]')

        this.createEventListener();
    }

    async createEventListener() {
        const _this = this
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            grecaptcha.ready(function() {
                grecaptcha.execute(_this.publicKey, {action: 'submit'}).then(async function(token) {
                    const data = _this.createData(token);
                    const verify = await _this.verifySubmission(data)
                    if(verify.status === 200) {
                        _this.messageContainer.innerText = `Submission ${(await verify.json()).msg}, now redirecting...`
                        setTimeout(() => {
                            const redirectURL = new URL('/contact-us/thank-you', window.location.origin);
                            window.location.replace(redirectURL);
                        }, 2000);
                    } else if(verify.status === 401) {
                        _this.messageContainer.innerText = `Submission ${(await verify.json()).msg}...`
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
            return await fetch(request);
        } catch(error) {
            return -1
        }
    }
}

const recaptchaController = new OnSiteRecaptcha()