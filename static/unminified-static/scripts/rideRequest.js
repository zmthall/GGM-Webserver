const rideRequest = {
    data() {
        return {
            post: {
                name: 'Zachary Thallas',
                dob: new Date(),
                phone: '719-252-2700',
                email: 'zmthall@gmail.com',
                medicaid: 'medicaid#',
                date: new Date(),
                time: new Date(),
                pickup: '1913 Beulah Ave',
                dropoff: '300 Colorado Ave.',
                notes: 'I need a wheelchair van',
                agree: 'true',
            },
            minutesGranularity: 10,
            showWeekNumber: false,
            locale: 'en-US', // Browser locale
            mobile: screen.width < 768
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
        clearAptTime() {
            this.post.time = '';
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
                    const response = await sendRequest.json();

                    if(response.msg === "Authenticated")
                        window.location = '/contact-us/thank-you';
                    else 
                        window.location.reload();
                });
              });
        }
    }
}

const app = new Vue(rideRequest);
app.$mount("#request")