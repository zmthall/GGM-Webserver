class GGMEventHandler{constructor(){this.events={buttons:document.querySelectorAll("[data-event-expand-btn]")},this.events.buttons.forEach(e=>{e.addEventListener("click",e=>{this.toggleInfo(e)})})}toggleInfo(e){e.target.previousElementSibling.classList.toggle("expanded"),"more"===e.target.innerHTML?e.target.innerHTML="less":"less"===e.target.innerHTML&&(e.target.innerHTML="more")}}window.addEventListener("load",()=>{new GGMEventHandler});