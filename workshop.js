import images from "./gallery-items.js";
// console.log(images);
const galleryContainer = document.querySelector('.js-gallery');

const lightboxEl = document.querySelector('.lightbox');
const btnEl = document.querySelector('[data-action="close-lightbox"]');
const overlay = document.querySelector('div.lightbox__overlay');


const imgMarkup = createImg(images);
galleryContainer.insertAdjacentHTML("beforeend", imgMarkup);

galleryContainer.addEventListener('click', onGalleryContainerClick);
btnEl.addEventListener('click', onBtnElClose);
overlay.addEventListener('click', onClickOverlay);
document.body.addEventListener('keydown', onKeyUp);

// const lightboxImg = document.querySelector('img.is-open');
let currentIndex = 1;

document.addEventListener('keydown', (e) => {
  if (e.code !== 'ArrowLeft' && e.code !== 'ArrowRight') {
    return;
  }
  else if (e.code == 'ArrowLeft') {
    currentIndex -= 1
  } else if (e.code == 'ArrowRight') {
    currentIndex += 1
  }
  console.log(e.code);
  console.log(currentIndex);
  console.log(setModalImage(currentIndex))
})
function setModalImage(index) {
console.log(images[index])
}




function createImg(imges) {
  return imges.map(({preview, original, description}) => {
    return `
    <li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>
    `
  }).join('');

  
}

function onGalleryContainerClick(e) {
  e.preventDefault();
  if (e.target.nodeName === "IMG") {
    lightboxEl.classList.add('is-open');
    lightboxEl.querySelector('.lightbox__image').src = e.target.dataset.source;
    lightboxEl.querySelector('.lightbox__image').alt = e.target.alt;
  }
  // console.log(e.target.nodeName)
}

function onBtnElClose(e) {
  if (e.target.nodeName === "BUTTON") {
    lightboxEl.classList.remove('is-open');
  }
  
}

function onClickOverlay(e) {

  if(e.target.nodeName === 'DIV')
  {
    lightboxEl.classList.remove('is-open');
  }

}

function onKeyUp(e) {
  // console.log(e.keyCode)

  if (e.keyCode == 27) {
    lightboxEl.classList.remove('is-open');
  }
  
};


