import { galleryItems } from "./gallery-items.js";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryList = document.querySelector(".gallery");

function createGalleryItem(item) {
    const galleryItem = document.createElement("li");
    galleryItem.classList.add("gallery__item");

    const galleryLink = document.createElement("a");
    galleryLink.classList.add("gallery__link");
    galleryLink.href = item.original;
    galleryLink.addEventListener("click", (e) => e.preventDefault());

    const galleryImage = document.createElement("img");
    galleryImage.classList.add("gallery__image");
    galleryImage.src = item.preview;
    galleryImage.alt = item.description;
    galleryImage.setAttribute("data-source", item.original);

    galleryLink.appendChild(galleryImage);
    galleryItem.appendChild(galleryLink);

    return galleryItem;
}


function renderGallery() {
    const galleryFragment = document.createDocumentFragment();
    galleryItems.forEach((item) => {
        const galleryItem = createGalleryItem(item);
        galleryFragment.appendChild(galleryItem);
    });
    galleryList.appendChild(galleryFragment);

    const lightbox = new SimpleLightbox(".gallery a", {
        captions: true,
        captionDelay: 250,
    });
}


galleryList.addEventListener("click", (e) => {
    e.preventDefault();

    if (e.target.tagName === "IMG") {
        const imageUrl = e.target.getAttribute("data-source");
        const instance = basicLightbox.create(`<img src="${imageUrl}">`);

        window.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                instance.close();
            }
        });

        instance.show();
    }
});

renderGallery();