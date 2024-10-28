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
        const _this = this;
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            _this.messageContainer.innerText = `Please wait while your submission is authenticated...`
            let hasAttestation = false;
            if(document.getElementById('attestation') && document.getElementById('attestation').checked) {
                hasAttestation = true;
            } else if(!document.getElementById('attestation')) {
                hasAttestation = true;
            }

            if(this.form.getAttribute('data-submittable') === '' && this.form.getAttribute('data-submitted') === null) {
                this.form.setAttribute('data-submitted', '');
                if(hasAttestation) {
                    grecaptcha.ready(function() {
                        grecaptcha.execute(_this.publicKey, {action: 'submit'}).then(async function(token) {
                            const submitBtn = _this.form.querySelector('button');
                            const data = _this.createData(token);
                            const verify = await _this.verifySubmission(data)
                            if(verify.status === 200) {
                                _this.messageContainer.innerText = `Submission ${(await verify.json()).msg}, now redirecting...`
                                submitBtn.disabled = true;
                                setTimeout(() => {
                                    const redirectURL = new URL('/contact-us/thank-you', window.location.origin);
                                    window.location.replace(redirectURL);
                                }, 2000);
                            } else if(verify.status === 401) {
                                _this.messageContainer.innerText = `Submission ${(await verify.json()).msg}...`
                            }
                        });
                    });
                } else {
                    _this.messageContainer.innerText = `Form failed to be submitted... refreshing page...`;
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                }
            } else if(this.form.getAttribute('data-submittable') === '' && this.form.getAttribute('data-submitted') !== null) {
                _this.messageContainer.innerText = `The form was already submitted.. Submission is still being authenticated. Please Wait...`;
            } else {
                const missingUploads = this.form.getAttribute('data-submittable').split('-');
                const firstMissingUpload = document.querySelector(`[data-upload-btn="${missingUploads[0]}"]`);
                _this.messageContainer.innerText = `Make sure to upload all files required.\nThese uploadable items are still required: ${missingUploads.join(' | ')}`
                setTimeout(() => {
                    firstMissingUpload.scrollIntoView();
                    firstMissingUpload.focus();
                }, 500);
            }
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