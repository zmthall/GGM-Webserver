const rideRequest = {
    data() {
        return {
            post: {
                name: '',
                dob: new Date(),
                phone: '',
                email: '',
                medicaid: '',
                datetime: new Date(),
                pickup: '',
                dropoff: '',
                notes: '',
                agree: '',
            },
            showWeekNumber: false,
            locale: 'en-US' // Browser locale
        }
    },
    methods: {
        clearName() {
            this.post.name = '';
        },
        clearDate() {
            this.post.dob = '';
        },
        clearPhone() {
            this.post.phone = '';
        },
        clearEmail() {
            this.post.email = '';
        },
        clearMedicaid() {
            this.post.medicaid = '';
        },
        clearPickup() {
            this.post.pickup = '';
        },
        clearDropoff() {
            this.post.dropoff = '';
        },
        async rideRequest(event) {
            event.preventDefault();
            const _this = this;
            grecaptcha.ready(function() {
                grecaptcha.execute('6LeZz0UqAAAAACaVm35S2EemtZ1XGc_T1GV4o0wf', {action: 'submit'}).then(async function(token) {
                    const request = new Request('/contact-us/schedule-a-ride', {
                        method: "POST",
                        body: JSON.stringify({ post: _this.post, token }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
        
                    const sendRequest = await fetch(request);
                    const response = await sendRequest.json()

                    if(response.msg === "Authenticated")
                        window.location = '/contact-us/thank-you'
                });
              });
        }
    }
}

const app = new Vue(rideRequest);
app.$mount("#request")