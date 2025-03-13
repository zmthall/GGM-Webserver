const { createApp } = Vue3;

const assistedLivingCarousel = {
  data() {
    return {
      houses: [
        {
          id: "ghorizon",
          images: [],
          name: "Golden Horizon",
          address: "2109 Chautard Drive Pueblo, CO 81005",
          additional: "",
          mapsURL:
            "https://www.google.com/maps/place/2109+Chautard+Dr,+Pueblo,+CO+81005/",
        },
        {
          id: "ggmi",
          images: [],
          name: "Golden Gate Manor I",
          address: "606 West Abriendo Ave. Pueblo, CO 81004",
          additional: "",
          mapsURL:
            "https://www.google.com/maps/place/606+W+Abriendo+Ave,+Pueblo,+CO+81004/",
        },
        {
          id: "gview",
          images: [],
          name: "Golden View",
          address: "525 West 9th Street Pueblo, CO 81003",
          additional: "*Handicap accessible facility",
          mapsURL:
            "https://www.google.com/maps/place/525+W+9th+St,+Pueblo,+CO+81003/",
        },
        {
          id: "gvalley",
          images: [],
          name: "Golden Valley",
          address: "1033 East Evans Pueblo, CO 81004",
          additional: "*Offering private bedrooms & bathrooms",
          mapsURL:
            "https://www.google.com/maps/place/1033+E+Evans+Ave,+Pueblo,+CO+81004/",
        },
        {
          id: "ggmii",
          images: [],
          name: "Golden Gate Manor II",
          address: "1219 Lake Ave Pueblo, CO 81004",
          additional: "",
          mapsURL:
            "https://www.google.com/maps/place/1219+Lake+Ave,+Pueblo,+CO+81004/",
        },
      ],
      autoScrollInterval: null,
      isTabActive: true,
      imageModalOpen: false,
      curentModal: null,
      loadingImages: false,
      currentImage: null,
      sliding: false,
      currentPosition: -20,
    };
  },
  methods: {
    async loadHouseDetails() {
      let url;
      const request = (url) =>
        new Request(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

      await Promise.all(
        this.houses.map(async (house) => {
          url = `/assisted-living/${house.id}`;

          const response = await fetch(request(url));
          const data = await response.json();

          house.images = data.images.sort((a, b) => a.id - b.id);
        })
      );

      return;
    },
    viewMore(house) {
      document.querySelector(`[data-view-more='${house.id}']`).disabled = true;
      document.body.classList.add("no-scroll");
      this.imageModalOpen = true;
      this.currentModal = house.id;
      this.loadImages(house);
    },
    loadImages(house) {
      this.loadingImages = true;
      const imageContainer = document.createElement("div");
      imageContainer.classList.add("image-container");
      house.images.forEach((image, idx) => {
        img = document.createElement("img");
        img.setAttribute("data-idx", idx);
        img.setAttribute("data-image", `${this.currentModal}`);
        if (idx === 0) {
          img.classList.add("current-image");
          this.currentImage = 0;
        }
        img.src = image.url;
        imageContainer.append(img);
      });
      const newImages = Array.from(imageContainer.children);
      const _this = this;
      checkImages = setInterval(function () {
        if (newImages.every((image) => image.complete)) {
          const houseImages = document.querySelector("[data-house-images]");
          houseImages.append(imageContainer);
          _this.checkImages = null;
          _this.loadingImages = false;
          clearInterval(checkImages);
        }
      }, 100);
    },
    closeModal() {
      this.imageModalOpen = false;
      document.querySelector(
        `[data-view-more='${this.currentModal}']`
      ).disabled = false;
      document.body.classList.remove("no-scroll");
      this.currentImage = null;
    },
    debounce(func, delay) {
      let timeout;
      return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
    modalResize() {
      const root = document.querySelector(":root");
      if (window.innerWidth >= 2000) {
        root.style.setProperty("--slide-items-shown", 4);
      } else if (window.innerWidth >= 1250) {
        root.style.setProperty("--slide-items-shown", 3);
      } else if (window.innerWidth >= 768) {
        root.style.setProperty("--slide-items-shown", 2);
      } else {
        root.style.setProperty("--slide-items-shown", 1);
      }
    },
    slideRight(event) {
      if (this.currentPosition === -20) {
        if (event) event.target.disabled = true;
        const carousel = document.querySelector("[data-carousel-container]");
        carousel.style.transition = "translate 0.3s ease-in-out";
        this.currentPosition += 20;
      }
    },
    slideLeft(event) {
      if (this.currentPosition === -20) {
        if (event) event.target.disabled = true;
        const carousel = document.querySelector("[data-carousel-container]");
        carousel.style.transition = "translate 0.3s ease-in-out";
        this.currentPosition -= 20;
      }
    },
    autoScroll(canScroll) {
      if (canScroll === false) clearInterval(this.autoScrollInterval);
      else if (canScroll === true && !this.imageModalOpen) {
        this.autoScrollInterval = setInterval(() => {
          if (document.hasFocus()) this.slideRight();
        }, 5000);
      }
    },
    previousImage() {
      const currentHouse = this.houses.find(
        (house) => house.id === this.currentModal
      );
      const images = document
        .querySelector("[data-house-images]")
        .querySelectorAll(`[data-image='${currentHouse.id}']`);

      const currentImage = document.querySelector(".current-image");

      if (this.currentModal && this.currentImage > 0) this.currentImage--;
      else if (this.currentImage === 0) this.currentImage = images.length - 1;

      currentImage.classList.remove("current-image");
      images[this.currentImage].classList.add("current-image");
    },
    nextImage() {
      const currentHouse = this.houses.find(
        (house) => house.id === this.currentModal
      );
      const images = document
        .querySelector("[data-house-images]")
        .querySelectorAll(`[data-image=${currentHouse.id}]`);
      const currentImage = document.querySelector(".current-image");

      if (this.currentModal && this.currentImage < images.length - 1)
        this.currentImage++;
      else if (this.currentImage === images.length - 1) this.currentImage = 0;

      currentImage.classList.remove("current-image");
      images[this.currentImage].classList.add("current-image");
    },
  },
  computed: {
    houseCardClass() {
      return (house) => `house-card ${house.id}`;
    },
    gHorizon() {
      return (house) => house.id === "ghorizon";
    },
    carouselStyling() {
      return { translate: `${this.currentPosition}%` };
    },
    currentImagePage() {
      if (this.imageModalOpen && this.currentImage !== null)
        return this.currentImage + 1;
      else return -1;
    },
    totalImagePages() {
      if (this.imageModalOpen && this.currentModal)
        return this.houses.find((house) => house.id === this.currentModal)
          .images.length;
      else return -1;
    },
  },
  created() {
    this.loadHouseDetails();
    this.modalResize();
    window.addEventListener("resize", this.debounce(this.modalResize, 50));
  },
  mounted() {
    const carousel = document.querySelector("[data-carousel-container]");
    carousel.addEventListener("transitionend", (event) => {
      if (event.propertyName === "translate") {
        carousel.style.transition = "none";
        if (this.currentPosition === 0) {
          const carouselNodes = Array.from(carousel.childNodes).filter(
            (node) => node.nodeName !== "#text"
          );
          carousel.insertBefore(
            carouselNodes[carouselNodes.length - 1],
            carouselNodes[0]
          );
          this.currentPosition -= 20;
        } else if (this.currentPosition === -40) {
          const carouselNodes = Array.from(carousel.childNodes);
          carousel.insertBefore(
            carouselNodes[1],
            carouselNodes[carouselNodes.length - 1]
          );
          this.currentPosition += 20;
        }
        const disabledButton = document.querySelector("button:disabled");
        if (disabledButton) disabledButton.disabled = false;
      }
    });
    this.autoScroll(true);
  },
  unmounted() {
    window.removeEventListener("resize", this.debounce(this.modalResize, 50));
  },
};

const app = createApp(assistedLivingCarousel);

app.mount("#houses-carousel");
