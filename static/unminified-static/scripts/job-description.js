class EmploymentPageHandler {
    constructor() {
        this.employment = {
            jobDescriptionBtns: document.querySelectorAll('[data-modal-btn]'),
            jobOpportunitySection: document.querySelector('[data-job-opportunities]')
        }

        this.employment.jobDescriptionBtns.forEach(button => {
            button.addEventListener('click', async (event) => {
                const dataInfo = event.target.getAttribute('data-modal-btn').split('|');
                const pageHTML = await this.getPageComponents(dataInfo);
                const modal = this.buildJobDescriptionModal(pageHTML, dataInfo)

                this.openModal(modal)
            })
        })
    }

    buildJobDescriptionModal(pageHTML, dataInfo) {
        const modal = document.createElement('article')
        modal.classList.add('job-description-modal')
        modal.setAttribute('data-job-description-modal', '')

        const modalContainer = document.createElement('div')
        modalContainer.classList.add('job-description-modal-container')
        
        const closeButton = this.buildCloseButton(modal)
        const applyButton = this.buildApplyButton(dataInfo)

        modalContainer.append(closeButton)
        for(const content in pageHTML) {
            if(content !== 'title')
                modalContainer.innerHTML += `<div class='job-description-content'>` + pageHTML[content] + '</div>'
            else
                modalContainer.innerHTML += pageHTML[content]
                
        }
        
        modalContainer.append(applyButton)

        modal.append(modalContainer);

        return modal
    }

    buildCloseButton(modal) {
        const closeButton = document.createElement('button')
        closeButton.type = 'button'
        closeButton.classList.add('close-button')
        closeButton.setAttribute('data-close-btn', 'job-description')
        closeButton.innerText = 'X'


        return closeButton
    }

    buildApplyButton(dataInfo) {
        let parameter = `/about-us/employment/apply?select=`;
        if(dataInfo.length === 3) {
            parameter += `${dataInfo[1]}-${dataInfo[2]}`;
        } else {
            parameter += `${dataInfo[0]}-${dataInfo[1]}`;
        }

        const applyButton = document.createElement('a');
        applyButton.classList.add('primary-button', 'job-description-apply-button');
        applyButton.innerText = 'Apply Now';
        applyButton.href = parameter;

        return applyButton;
    }

    async getPageComponents(info) {
        let requestURL = '/json/job-descriptions.json';
        let pageData;

        const request = new Request(requestURL, {
            method: 'GET'
        });
        const response = await fetch(request);
        const dataJSON = await response.json();

        if(info.length === 3) {
            pageData = dataJSON[info[0]][info[1]][info[2]];
        } else {
            pageData = dataJSON[info[0]][info[1]];
        }

        return pageData;
    }

    openModal(newModal) {
        const _this = this
        this.employment.jobOpportunitySection.append(newModal)
        const closeButton = document.querySelector('[data-close-btn]')
        this.employment.jobOpportunitySection.classList.add('open-modal');
        document.body.classList.add('no-scroll')

        closeButton.addEventListener('click', (event) => {
            _this.closeModal(event.target.closest('article'))
        })
    }

    closeModal(modal) {
        modal.remove()
        this.employment.jobOpportunitySection.classList.remove('open-modal');
        document.body.classList.remove('no-scroll')
    }
}

window.addEventListener('load', (event) => {
    const pageHandler = new EmploymentPageHandler();
})