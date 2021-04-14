import gallery from "./gallery-items.js";
const refs = {
  gallery: document.querySelector('.js-gallery'),
  modal: document.querySelector('.lightbox'),
  modalImg: document.querySelector('.lightbox__image'),
}

refs.gallery.addEventListener('click', onGalleryClick);
refs.modal.addEventListener('click', onCloseModal)


let activeIndex = null;

const createGallery = gallery.map(({preview, original, description}) => {
    return `<li class="gallery__item"><a class="gallery__link" href="${original}">
      <img class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"/></a></li>`
});
  
refs.gallery.insertAdjacentHTML("beforeend", createGallery.join(''));

function onGalleryClick(e) {
  e.preventDefault();
  if (e.target.nodeName !== "IMG") {
    return;
  }
  createGallery.forEach((el, ind) => {
    if (el.includes(e.target.src)) {
      activeIndex = ind;
      return;
    }
  });
    refs.modal.classList.add('is-open');
    refs.modalImg.src = e.target.dataset.source;
    refs.modalImg.alt = e.target.alt;
}

function onCloseModal(e) {
  if (e.target.nodeName !== "IMG") {
    refs.modal.classList.remove('is-open');
    refs.modalImg.src = "";
    refs.modalImg.alt = "";
  }
  
}

function keyboardManipulation({ key }) {
  switch (key) {
    case gallery.length - 1 > activeIndex && 'ArrowRight':
      activeIndex += 1;
      refs.modalImg.src = gallery[activeIndex].original;
      break;
    case activeIndex > 0 && 'ArrowLeft':
      activeIndex -= 1;
      refs.modalImg.src = gallery[activeIndex].original;
      break;
    case activeIndex === gallery.length - 1 && 'ArrowRight':
      activeIndex = 0;
      refs.modalImg.src = gallery[activeIndex].original;
      break;
    case activeIndex === 0 && 'ArrowLeft':
      activeIndex = gallery.length - 1;
      refs.modalImg.src = gallery[activeIndex].original;
      break;
    case 'Escape':
      refs.modal.classList.remove('is-open');
      refs.modalImg.src = "";
      refs.modalImg.alt = "";
      break;
    default:
      console.log('Error')
  }
}

window.addEventListener('keydown', keyboardManipulation);
