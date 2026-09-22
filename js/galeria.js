const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxTitle = document.querySelector("#lightbox-title");
const lightboxCounter = document.querySelector(".lightbox-counter");
const lightboxDescription = document.querySelector(".lightbox-description");
const closeButton = document.querySelector(".lightbox-close");
const previousButton = document.querySelector(".lightbox-prev");
const nextButton = document.querySelector(".lightbox-next");

let currentImage = 0;
let lastFocusedItem;
let touchStartX = 0;
let touchStartY = 0;

function updateLightbox() {
	const selectedItem = galleryItems[currentImage];
	const image = selectedItem.querySelector("img");

	lightboxImage.src = image.currentSrc || image.src;
	lightboxImage.alt = image.alt;
	lightboxCounter.textContent = `Imagen ${currentImage + 1} de ${galleryItems.length} · ${image.alt}`;
	lightboxDescription.textContent = selectedItem.dataset.description;
}

function openLightbox(index) {
	currentImage = index;
	lastFocusedItem = document.activeElement;
	updateLightbox();
	lightbox.hidden = false;
	document.body.classList.add("lightbox-open");
	closeButton.focus();
}

function closeLightbox() {
	lightbox.hidden = true;
	document.body.classList.remove("lightbox-open");
	lastFocusedItem?.focus();
}

function changeImage(direction) {
	currentImage = (currentImage + direction + galleryItems.length) % galleryItems.length;
	updateLightbox();
}

galleryItems.forEach((item, index) => {
	item.addEventListener("click", () => openLightbox(index));
});

closeButton.addEventListener("click", closeLightbox);
previousButton.addEventListener("click", () => changeImage(-1));
nextButton.addEventListener("click", () => changeImage(1));

lightbox.addEventListener("click", (event) => {
	if (event.target === lightbox) closeLightbox();
});

lightbox.addEventListener("touchstart", (event) => {
	const touch = event.changedTouches[0];
	touchStartX = touch.clientX;
	touchStartY = touch.clientY;
}, { passive: true });

lightbox.addEventListener("touchend", (event) => {
	const touch = event.changedTouches[0];
	const horizontalDistance = touch.clientX - touchStartX;
	const verticalDistance = touch.clientY - touchStartY;

	if (Math.abs(horizontalDistance) < 50 || Math.abs(horizontalDistance) < Math.abs(verticalDistance)) return;
	changeImage(horizontalDistance < 0 ? 1 : -1);
});

document.addEventListener("keydown", (event) => {
	if (lightbox.hidden) return;
	if (event.key === "Escape") closeLightbox();
	if (event.key === "ArrowLeft") changeImage(-1);
	if (event.key === "ArrowRight") changeImage(1);
});
