class ApplicationHandler{constructor(){this.date=(new Date).toLocaleString(),this.form={select:document.querySelector("[data-select]"),selectOption:this.GetURLParameter("select"),dateInput:document.querySelector("[data-form-date]"),fileUpload:document.querySelectorAll("[data-file-upload]"),fileInputs:document.querySelectorAll("[data-file-input]"),uploadButtons:document.querySelectorAll("[data-file-input-btn]"),uploadDeleteButtons:document.querySelectorAll("[data-upload-delete-btn]"),dynamicForm:{driverSection:document.querySelector("[data-driving-section]"),dynamicRadios:document.querySelectorAll("[data-dynamic-radio]")}},null!=this.form.selectOption?this.form.select.value=this.form.selectOption:this.form.select.value="other",window.addEventListener("load",e=>{this.form.dateInput.value=this.date,"driver"===this.form.select.selectedOptions[0].getAttribute("data-job-type")?this.form.dynamicForm.driverSection.classList.contains("hidden")&&this.form.dynamicForm.driverSection.classList.remove("hidden"):this.form.dynamicForm.driverSection.classList.contains("hidden")||this.form.dynamicForm.driverSection.classList.add("hidden"),this.form.uploadDeleteButtons.forEach(e=>{e.addEventListener("click",this.deleteUpload)}),this.form.uploadButtons.forEach(e=>{e.addEventListener("change",e=>this.fileUploadHandler(e,this))}),this.form.select.addEventListener("change",()=>{var e=new URL(location);e.searchParams.set("select",this.form.select.value),history.pushState({},"",e),"driver"===this.form.select.selectedOptions[0].getAttribute("data-job-type")?this.form.dynamicForm.driverSection.classList.contains("hidden")&&this.form.dynamicForm.driverSection.classList.remove("hidden"):this.form.dynamicForm.driverSection.classList.contains("hidden")||this.form.dynamicForm.driverSection.classList.add("hidden")}),this.form.dynamicForm.dynamicRadios.forEach(e=>{e.addEventListener("change",e=>{var t=e.target.getAttribute("data-dynamic-radio"),a=e.target.id,e=e.target.closest(`[data-parent-container='${t}']`).querySelector(".extra-input");/yes|part-time/.test(a)?e.classList.contains("hidden")&&(e.classList.remove("hidden"),e.classList.contains("has-required"))&&(e.querySelector("[data-required]").required=!0):e.classList.contains("hidden")||(e.classList.add("hidden"),e.classList.contains("has-required")&&(e.querySelector("[data-required]").required=!1))})}),this.form.fileUpload.forEach(e=>{e.addEventListener("dragover",this.preventDefaults),e.addEventListener("dragenter",()=>{e.classList.add("drag-over")}),e.addEventListener("dragleave",()=>{e.classList.remove("drag-over")}),e.addEventListener("drop",e=>this.fileDropHandler(e,this))})})}GetURLParameter(t){let a;return window.location.search.slice(1).split("&").forEach(e=>{e=e.split("=");if(t===e[0])return a=e[1]||e[0],!1}),a}preventDefaults(e){e.preventDefault(),e.stopPropagation}fileDropHandler(e,t){e.preventDefault();var a=e.target.getAttribute("data-file-upload"),a=document.querySelector(`[data-file-input-btn='${a}']`),r=e.target.getAttribute("data-file-upload");e.target.classList.remove("drag-over"),""===a.accept||""!==a.accept&&t.onlyPDF(a.accept,e.dataTransfer.files)?(a.files=e.dataTransfer.files,this.showUpload(r,a.files[0].name,t.convertSizeMB(a.files[0].size))):this.showUpload(r)}onlyPDF(e,t){return t[0].type===e}fileUploadHandler(e,t){var a=e.target.getAttribute("data-file-input-btn");""===e.target.accept||""!==e.target.accept&&t.onlyPDF(e.target.accept,e.target.files)?this.showUpload(a,e.target.files[0].name,t.convertSizeMB(e.target.files[0].size)):(e.target.value="",this.showUpload(a))}convertSizeMB(e){return(1e-6*e).toFixed(2)+" MB"}showUpload(e,t="File Type Not Accepted...",a=""){e=document.querySelector(`[data-upload-description='${e}']`);e.name=e.querySelector("[data-upload-name]"),e.size=e.querySelector("[data-upload-size]"),e.name.innerText=t,e.size.innerText=a,e.classList.remove("hidden")}deleteUpload(e){var t=e.target.getAttribute("data-upload-delete-btn"),t=document.querySelector(`[data-file-input-btn='${t}']`),e=e.target.parentNode;e.name=e.querySelector("[data-upload-name]"),e.size=e.querySelector("[data-upload-size]"),e.name.innerText="",e.size.innerText="",t.value="",e.classList.add("hidden")}}let application=new ApplicationHandler;