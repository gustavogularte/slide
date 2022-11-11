export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.dist = { finalPosition: 0, startX: 0, movement: 0, };
  }

  moveSlide(px) {
    this.dist.movePosition = px;
    this.slide.style.transform = `translate3d(${px}px, 0, 0)`
  }

  UpdateMove(clientX) { 
    this.dist.movement = (this.dist.startX - clientX) * 1.6;
    return this.dist.finalPosition - this.dist.movement;
  }

  start(e) {
    e.preventDefault();
    this.dist.startX = e.clientX;
    this.wrapper.addEventListener('mousemove', this.move);
  }

  move(e) {
    const finalPosition = this.UpdateMove(e.clientX);
    this.moveSlide(finalPosition);
  }

  end() {
    this.wrapper.removeEventListener('mousemove', this.move);
    this.dist.finalPosition = this.dist.movePosition;
  }

  slideEvents() {
    this.wrapper.addEventListener('mousedown', this.start)
    this.wrapper.addEventListener('mouseup', this.end)
  }

  bindEvents() {
    this.start = this.start.bind(this);
    this.move = this.move.bind(this);
    this.end = this.end.bind(this);
  }

  init() {
    this.bindEvents();
    this.slideEvents();
    return this;
  }
}
