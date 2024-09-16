class OnSiteRecaptcha {
    constructor() {
        this.form = document.forms['contact-form'];
        this.publicKey = '6LeZz0UqAAAAACaVm35S2EemtZ1XGc_T1GV4o0wf'
        this.verifyURL = '/contact-us/send-email'
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
                    if(verify === 200) {
                        const redirectURL = new URL('/contact-us/thank-you', window.location.origin);
                        window.location.replace(redirectURL);
                    }
                });
            });
        })
    }

    createData(token) {
        this.formData = new FormData(this.form);
        const data = { formData: {}};
        for(const value of this.formData.entries()) {
            data.formData[value[0]] = value[1];
        }
        data.captcha = token;
        
        return data;
    }

    async verifySubmission(data) {
        const request = new Request(this.verifyURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const response = await fetch(request);
        return response.status
    }
}

const recaptchaController = new OnSiteRecaptcha()
