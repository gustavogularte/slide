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
    let moveType;
    if (e.type === 'mousedown') {
      e.preventDefault();
      this.dist.startX = e.clientX;
      moveType = 'mousemove';
    } else {
      this.dist.startX = e.changedTouches[0].clientX;
      moveType = 'touchmove';
    }
    this.wrapper.addEventListener(moveType, this.move);
  }

  move(e) {
    const pointerType = (e.type === 'mousemove') ? e.clientX : e.changedTouches[0].clientX;
    const finalPosition = this.UpdateMove(pointerType);
    this.moveSlide(finalPosition);
  }

  end(e) {
    const moveType = (e.type === 'mouseup') ? 'mousemove' : 'touchmove';
    this.wrapper.removeEventListener(moveType, this.move);
    this.dist.finalPosition = this.dist.movePosition;
  }

  slideEvents() {
    this.wrapper.addEventListener('mousedown', this.start);
    this.wrapper.addEventListener('touchstart', this.start)
    this.wrapper.addEventListener('mouseup', this.end);
    this.wrapper.addEventListener('touchend', this.end);
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
