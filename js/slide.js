export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
  }

  start(e) {
    e.preventDefault();
  }

  slideEvents() {
    this.wrapper.addEventListener('mousedown', this.start)
  }

  init() {
    this.slideEvents();
    return this;
  }
}
