const quoteButton = document.querySelector("#quote-button");
const quoteText = document.querySelector("#quote-text");

const quotes = [
	'"I am the one who knocks."',
	'"Yeah, science!"',
	'"Say my name."',
    '"RUN."',
	'"No more half measures."'
];

let quoteIndex = 0;

if (quoteButton && quoteText) {
	quoteButton.addEventListener("click", () => {
		quoteIndex = (quoteIndex + 1) % quotes.length;
		quoteText.textContent = quotes[quoteIndex];
	});
}
