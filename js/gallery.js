import { galleryItems } from './gallery-items.js';

console.log(galleryItems);

const galleryRef = document.querySelector('.gallery');
const imageMarkup = galleryItems.map(({ preview, original, description }) => {
  return `
  <li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img class="gallery__image" src="${preview}" data-source="${original}"
      alt="${description}">
    </a>
  </li>`
}).join('');

galleryRef.innerHTML = imageMarkup;

galleryRef.addEventListener("click", onGalleryItemClick);
function onGalleryItemClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") { return; }
  const instance = basicLightbox.create(
    `
      <div class="modal">
        <img src="${event.target.dataset.source}" width="800" height="600">
      </div>`,
    {
      onShow: () => {
        document.addEventListener("keydown", onModalKeyDown);
      },
      onClose: () => {
        document.removeEventListener("keydown", onModalKeyDown);
      },
    }
  );
  instance.show();
  const modalElement = document.querySelector(".modal");
  modalElement.addEventListener("click", () => {
    instance.close();
  });
  function onModalKeyDown(event) {
    if (event.code === "Escape") {
      instance.close();
    }
  }
};