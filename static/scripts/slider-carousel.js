class SliderCarousel{constructor(){this.root=document.querySelector(":root"),this.viewArea=document.querySelector("[data-view-area]"),this.pageResizeResponse(),window.addEventListener("resize",e=>{this.pageResizeResponse()})}get slideX(){return getComputedStyle(this.root).getPropertyValue("--slide-item-x")}set viewAreaHeight(e){this.root.style.setProperty("--slide-view-area-height",e)}set slideX(e){this.root.style.setProperty("--slide-item-x",e)}get containerWidth(){return this.viewArea.getBoundingClientRect().width}pageResizeResponse(){var e=document.querySelector('.carousel-slide-item[data-slide-index="2"]');this.pageWidth=document.body.offsetWidth,this.pageWidth<=1600&&1e3<this.pageWidth?(e.style.transition="transform .5s ease-in-out",this.slideX=(this.containerWidth-96)/3.2+"px",this.viewAreaHeight=(this.containerWidth-96)/3.2+64+"px"):this.pageWidth<=1e3&&600<this.pageWidth?(e.style.transition="unset",this.slideX=(this.containerWidth-64)/2+"px",this.viewAreaHeight=(this.containerWidth-64)/2+32+"px"):this.pageWidth<=600?(this.slideX=0,this.viewAreaHeight=0):1600<this.pageWidth&&(this.slideX="400.0125px",this.viewAreaHeight="464.0125px"),console.log(this.slideX)}}window.addEventListener("load",e=>{var t=new SliderCarousel;console.log(t)});