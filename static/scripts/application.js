class ApplicationHandler{constructor(){let t=this;this.date=(new Date).toLocaleString(),this.form={select:document.querySelector("[data-select]"),selectOption:this.GetURLParameter("select"),dateInput:document.querySelector("[data-form-date]"),positionInput:document.querySelector("[data-form-position]"),fileUpload:document.querySelectorAll("[data-file-upload]"),fileInputs:document.querySelectorAll("[data-file-input]"),dynamicForm:{driverSection:document.querySelector("[data-driving-section]"),dynamicRadios:document.querySelectorAll("[data-dynamic-radio]")}},window.addEventListener("load",e=>{this.form.dateInput.value=this.date,"driver"===this.form.select.selectedOptions[0].getAttribute("data-job-type")&&this.form.dynamicForm.driverSection.classList.remove("hidden"),null!=this.form.selectOption?(this.form.positionInput.value=this.form.selectOption,this.form.select.value=this.form.selectOption):this.form.positionInput.value="general",console.log(this.form.selectOption),this.form.select.addEventListener("change",()=>{"driver"===t.form.select.selectedOptions[0].getAttribute("data-job-type")?this.form.dynamicForm.driverSection.classList.contains("hidden")&&this.form.dynamicForm.driverSection.classList.remove("hidden"):this.form.dynamicForm.driverSection.classList.contains("hidden")||this.form.dynamicForm.driverSection.classList.add("hidden")}),this.form.dynamicForm.dynamicRadios.forEach(e=>{e.addEventListener("change",e=>{var t=e.target.getAttribute("data-dynamic-radio"),i=e.target.id,e=e.target.closest(`[data-parent-container='${t}']`).querySelector(".extra-input");console.log(e),/yes|part-time/.test(i)?e.classList.contains("hidden")&&e.classList.remove("hidden"):e.classList.contains("hidden")||e.classList.add("hidden")})}),this.form.fileUpload.forEach(e=>{e.addEventListener("dragover",this.preventDefaults),e.addEventListener("dragenter",()=>{e.classList.add("drag-over")}),e.addEventListener("dragleave",()=>{e.classList.remove("drag-over")}),e.addEventListener("drop",this.fileDropHandler)})})}GetURLParameter(t){let i;return window.location.search.slice(1).split("&").forEach(e=>{e=e.split("=");if(t===e[0])return i=e[1]||e[0],!1}),i}preventDefaults(e){e.preventDefault(),e.stopPropagation}fileDropHandler(e){var t=e.target.getAttribute("data-file-upload"),t=document.querySelector(`[data-input-btn='${t}']`);e.preventDefault(),e.target.classList.remove("drag-over"),t.files=e.dataTransfer.files,console.log(t.files)}}let application=new ApplicationHandler;