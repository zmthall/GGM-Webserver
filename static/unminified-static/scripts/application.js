class ApplicationHandler {
    constructor() {
        const _this = this;

        this.date = (new Date()).toLocaleString();
        
        this.form = {
            select: document.querySelector('[data-select]'),
            selectOption: this.GetURLParameter('select'),
            dateInput: document.querySelector('[data-form-date]'),
            positionInput: document.querySelector('[data-form-position]'),
            fileUpload: document.querySelectorAll('[data-file-upload]'),
            fileInputs: document.querySelectorAll('[data-file-input]'),
            uploadButtons: document.querySelectorAll('[data-file-input-btn]'),
            uploadDeleteButtons: document.querySelectorAll('[data-upload-delete-btn]'),
            dynamicForm: {
                driverSection: document.querySelector('[data-driving-section]'),
                dynamicRadios: document.querySelectorAll('[data-dynamic-radio]'),
            }
        };

        
        window.addEventListener("load", (event) => {
            this.form.dateInput.value = this.date;

            // if(this.form.select.selectedOptions[0].getAttribute('data-job-type') === 'driver')
            //     this.form.dynamicForm.driverSection.classList.remove('hidden');
            
            if(this.form.selectOption != undefined) {
                this.form.positionInput.value = this.form.selectOption;
                this.form.select.value = this.form.selectOption;
            } else {
                this.form.positionInput.value = "general";
            }

            if(this.form.select.selectedOptions[0].getAttribute('data-job-type') === 'driver') {
                if(this.form.dynamicForm.driverSection.classList.contains('hidden')) {
                    this.form.dynamicForm.driverSection.classList.remove('hidden');
                }
            } else {
                if(!this.form.dynamicForm.driverSection.classList.contains('hidden')) {
                    this.form.dynamicForm.driverSection.classList.add('hidden');
                }
            }

            this.form.uploadDeleteButtons.forEach(button => {
                button.addEventListener('click', this.deleteUpload);
            })

            this.form.uploadButtons.forEach(button => {
                button.addEventListener('change', (event) => this.fileUploadHandler(event, this));
            })


            this.form.select.addEventListener('change', () => {
                const url = new URL(location);
                url.searchParams.set('select', this.form.select.value);
                history.pushState({}, "", url);
                if(this.form.select.selectedOptions[0].getAttribute('data-job-type') === 'driver') {
                    if(this.form.dynamicForm.driverSection.classList.contains('hidden')) {
                        this.form.dynamicForm.driverSection.classList.remove('hidden');
                    }
                } else {
                    if(!this.form.dynamicForm.driverSection.classList.contains('hidden')) {
                        this.form.dynamicForm.driverSection.classList.add('hidden');
                    }
                }
            })

            this.form.dynamicForm.dynamicRadios.forEach(radio => {
                radio.addEventListener('change', (event) => {
                    const dataName = event.target.getAttribute('data-dynamic-radio');
                    const radioID = event.target.id;
                    const extraInput = event.target.closest(`[data-parent-container='${dataName}']`).querySelector('.extra-input');

                    if(/yes|part-time/.test(radioID)) {
                        if(extraInput.classList.contains('hidden')) {
                            extraInput.classList.remove('hidden');
                            if(extraInput.classList.contains('has-required'))
                                extraInput.querySelector('[data-required]').required = true;
                        }
                    } else {
                        if(!extraInput.classList.contains('hidden')) {
                            extraInput.classList.add('hidden');
                            if(extraInput.classList.contains('has-required'))
                                extraInput.querySelector('[data-required]').required = false;
                        }
                    }
                })
            })

            this.form.fileUpload.forEach(uploader => {
                uploader.addEventListener('dragover', this.preventDefaults);

                uploader.addEventListener('dragenter', () => {
                    uploader.classList.add('drag-over');
                });
                uploader.addEventListener('dragleave', () => {
                    uploader.classList.remove('drag-over');
                });

                uploader.addEventListener('drop', (event) => this.fileDropHandler(event, this));
            })
        })
    }

    GetURLParameter(name) {
        let value
        let pageParameters = window.location.search.slice(1).split("&");
        pageParameters.forEach(pageParameter => {
            let parameter = pageParameter.split("=");
            if(name === parameter[0]) {
                value = parameter[1] ? parameter[1] : parameter[0];
                return false;
            }
        })
        return value;
    }

    preventDefaults(event) {
        event.preventDefault();
        event.stopPropagation;
    }

    fileDropHandler(event, _this) {
        event.preventDefault();
        const dataName = event.target.getAttribute('data-file-upload');
        const inputBtn = document.querySelector(`[data-file-input-btn='${dataName}']`);
        const uploadName = event.target.getAttribute('data-file-upload');
        event.target.classList.remove('drag-over');
        if(inputBtn.accept === '' || inputBtn.accept !== '' && _this.onlyPDF(inputBtn.accept, event.dataTransfer.files)) {
            inputBtn.files = event.dataTransfer.files;
            this.showUpload(uploadName, inputBtn.files[0].name, _this.convertSizeMB(inputBtn.files[0].size));
        } else {
            this.showUpload(uploadName)
        }
    }

    onlyPDF(accepted, files) {
        if(files[0].type === accepted)
            return true
        else return false
    }

    fileUploadHandler(event, _this) {
        const uploadName = event.target.getAttribute('data-file-input-btn');
        if(event.target.accept === '' || event.target.accept !== '' && _this.onlyPDF(event.target.accept, event.target.files)) {
            this.showUpload(uploadName, event.target.files[0].name, _this.convertSizeMB(event.target.files[0].size));
        } else {
            event.target.value = ""
            this.showUpload(uploadName)
        }
    }

    convertSizeMB(size) {
        return `${(size * 0.000001).toFixed(2)} MB`;
    }

    showUpload(uploadName, name = 'File Type Not Accepted...', sizeMB = '') {
        const uploadDescription = document.querySelector(`[data-upload-description='${uploadName}']`);

        uploadDescription.name = uploadDescription.querySelector('[data-upload-name]');
        uploadDescription.size = uploadDescription.querySelector('[data-upload-size]');

        uploadDescription.name.innerText = name;
        uploadDescription.size.innerText = sizeMB;
        uploadDescription.classList.remove('hidden');
    }

    deleteUpload(event) {
        const inputName = event.target.getAttribute('data-upload-delete-btn');
        const uploadBtn = document.querySelector(`[data-file-input-btn='${inputName}']`);

        const uploadDescription = event.target.parentNode;

        uploadDescription.name = uploadDescription.querySelector('[data-upload-name]');
        uploadDescription.size = uploadDescription.querySelector('[data-upload-size]');

        uploadDescription.name.innerText = '';
        uploadDescription.size.innerText = '';

        uploadBtn.value = "";
        uploadDescription.classList.add('hidden');
    }
}

const application = new ApplicationHandler();