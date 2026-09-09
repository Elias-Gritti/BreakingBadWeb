const quoteButton = document.querySelector("#quote-button");
const quoteText = document.querySelector("#quote-text");

const quotes = [
    '"I am the one who knocks."',
    '"Yeah, science!"',
    '"Say my name."',
    '"No more half measures."'
];

let quoteIndex = 0;

quoteButton.addEventListener("click", () => {
    quoteText.textContent = quotes[quoteIndex];
    quoteIndex = (quoteIndex + 1) % quotes.length;
    quoteButton.innerHTML = 'Otra frase <span aria-hidden="true">↗</span>';
});