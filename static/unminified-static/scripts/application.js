class ApplicationHandler {
    constructor() {
        const _this = this;

        this.date = (new Date()).toLocaleString();
        
        this.form = {
            select: document.querySelector('[data-select]'),
            selectOption: this.GetURLParameter('select'),
            fullPositionName: document.querySelector('[data-full-position-name]'),
            dateInput: document.querySelector('[data-form-date]'),
            fileUpload: document.querySelectorAll('[data-file-upload]'),
            fileInputs: document.querySelectorAll('[data-file-input]'),
            uploadButtons: document.querySelectorAll('[data-file-input-btn]'),
            uploadDeleteButtons: document.querySelectorAll('[data-upload-delete-btn]'),
            dynamicForm: {
                felonyContainer: document.querySelector('[data-felony-container]'),
                driverSection: document.querySelector('[data-driving-section]'),
                dynamicRadios: document.querySelectorAll('[data-dynamic-radio]'),
            },
            modal: {
                backdrop: document.querySelector('[data-modal-container]'),
                disclaimer: document.querySelector('[data-modal="disclaimer"]'),
                agreement: document.querySelector('[data-modal="agreement"]'),
                modalContinue: document.querySelectorAll('[data-modal-continue]'),
                attestation: document.querySelector('[data-attestation-check]')
            }
        };

        const form = document.forms['contact-form'];
        form.addEventListener('submit', (event) => {
            const requiredUploads = Array.from(document.querySelectorAll('[data-required-upload="true"]'));
            let missingUploads = [];
            if(requiredUploads.every(upload => upload.value.length > 0)) {
                event.target.setAttribute('data-submittable', '');
            } else {
                requiredUploads.map(upload => {
                    if(upload.value.length === 0)
                        missingUploads.push(upload.getAttribute('data-file-input-btn'));
                });

                event.target.setAttribute('data-submittable', `${missingUploads.join('-')}`);
            }
        })
        
        if(this.form.selectOption != undefined) {
            this.form.select.value = this.form.selectOption;
        } else {
            this.form.select.value = "general";     
        }
        
        window.addEventListener("load", (event) => {
            const selectedPosition = this.form.select.options[this.form.select.selectedIndex].innerText;
            this.form.fullPositionName.value = selectedPosition;
            this.form.dateInput.value = this.date;
            if(this.form.select.selectedOptions[0].getAttribute('data-job-type') === 'driver') {
                if(this.form.dynamicForm.driverSection.classList.contains('hidden')) {
                    this.form.dynamicForm.driverSection.classList.remove('hidden');
                }
                document.querySelector('[data-required-upload="license"]').setAttribute('data-required-upload', 'true');
            } else if(this.form.select.selectedOptions[0].getAttribute('data-job-type') === 'no-felony') {
                if(!this.form.dynamicForm.driverSection.classList.contains('hidden')) {
                    this.form.dynamicForm.driverSection.classList.add('hidden');
                }
                if(!this.form.dynamicForm.felonyContainer.classList.contains('hidden')) {
                    this.form.dynamicForm.felonyContainer.classList.add('hidden');
                }
                document.querySelector('[data-required-upload="license"]').setAttribute('data-required-upload', 'license');
            } else {
                if(!this.form.dynamicForm.driverSection.classList.contains('hidden')) {
                    this.form.dynamicForm.driverSection.classList.add('hidden');
                }
                document.querySelector('[data-required-upload="license"]').setAttribute('data-required-upload', 'license');
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
                    if(this.form.dynamicForm.felonyContainer.classList.contains('hidden')) {
                        this.form.dynamicForm.felonyContainer.classList.remove('hidden');
                    }
                    document.querySelector('[data-required-upload="license"]').setAttribute('data-required-upload', 'true');
                } else if(this.form.select.selectedOptions[0].getAttribute('data-job-type') === 'no-felony') { 
                    if(!this.form.dynamicForm.driverSection.classList.contains('hidden')) {
                        this.form.dynamicForm.driverSection.classList.add('hidden');
                    }
                    if(!this.form.dynamicForm.felonyContainer.classList.contains('hidden')) {
                        this.form.dynamicForm.felonyContainer.classList.add('hidden');
                    }
                    document.querySelector('[data-required-upload="true"]').setAttribute('data-required-upload', 'license');
                } else {
                    if(!this.form.dynamicForm.driverSection.classList.contains('hidden')) {
                        this.form.dynamicForm.driverSection.classList.add('hidden');
                    }
                    if(this.form.dynamicForm.felonyContainer.classList.contains('hidden')) {
                        this.form.dynamicForm.felonyContainer.classList.remove('hidden');
                    }
                    document.querySelector('[data-required-upload="true"]').setAttribute('data-required-upload', 'license');
                }

                const selectedPosition = this.form.select.options[this.form.select.selectedIndex].innerText
                this.form.fullPositionName.value = selectedPosition
            })

            this.form.dynamicForm.dynamicRadios.forEach(radio => {
                radio.addEventListener('change', (event) => {
                    const dataName = event.target.getAttribute('data-dynamic-radio');
                    const radioID = event.target.id;
                    const extraInput = event.target.closest(`[data-parent-container='${dataName}']`).querySelector('.extra-input');
                    
                    
                    if(/yes|part-time/.test(radioID)) {
                        const requiredUpload = event.target.closest(`[data-parent-container='${dataName}']`).querySelector(`[data-required-upload="${dataName}"]`)
                        if(extraInput.classList.contains('hidden')) {
                            extraInput.classList.remove('hidden');
                            if(extraInput.classList.contains('has-required'))
                                extraInput.querySelector('[data-required]').required = true;
                            if(extraInput.classList.contains('has-note')) {
                                const note = event.target.closest(`[data-parent-container='${dataName}']`).querySelector('[data-please-note]')
                                if(!note.classList.contains('hidden')) note.classList.add('hidden');
                            }
                            if(requiredUpload) {
                                requiredUpload.setAttribute('data-required-upload', "true");
                            }
                                
                        }
                    } else {
                        const requiredUpload = event.target.closest(`[data-parent-container='${dataName}']`).querySelector(`[data-required-upload="true"]`)
                        if(!extraInput.classList.contains('hidden')) {
                            extraInput.classList.add('hidden');
                            if(extraInput.classList.contains('has-required'))
                                extraInput.querySelector('[data-required]').required = false;
                        }
                        if(extraInput.classList.contains('has-note')) {
                            const note = event.target.closest(`[data-parent-container='${dataName}']`).querySelector('[data-please-note]')
                            if(note.classList.contains('hidden')) note.classList.remove('hidden');
                        }
                        if(requiredUpload && requiredUpload.getAttribute('data-file-input-btn') === dataName) {
                            requiredUpload.setAttribute('data-required-upload', dataName)
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

            this.openModalonLoad();
            this.form.modal.modalContinue.forEach(button => {
                button.addEventListener('click', (event) => {
                    const name = button.getAttribute('data-modal-continue');
                    if(name === 'disclaimer') {
                        this.form.modal.disclaimer.classList.add('hidden');
                        this.form.modal.agreement.classList.remove('hidden');
                    } else {
                        if(this.checkAttestation()) {
                            this.form.modal.backdrop.classList.add('hidden');
                            this.form.modal.agreement.classList.add('hidden');
                            document.body.classList.remove('no-scroll');
                        }
                    }
                })
            })
        })
    }

    GetURLParameter(name) {
        return (new URL(window.location)).searchParams.get(name);
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

    openModalonLoad() {
        if(this.form.modal.backdrop.classList.contains('hidden')) {
            this.form.modal.backdrop.classList.remove('hidden');
            this.form.modal.disclaimer.classList.remove('hidden');
            document.body.classList.add('no-scroll');
        }
        
    }
    checkAttestation() {
        if(this.form.modal.attestation.checked)
            return true;
        else return false;
    }
}

const application = new ApplicationHandler();