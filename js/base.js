const navToggle = document.querySelector(".main-nav-toggle");
const mainNav = document.querySelector(".main-nav");
const dropdownToggles = document.querySelectorAll(".nav-dropdown-toggle");

dropdownToggles.forEach((toggle) => {
	 toggle.addEventListener("click", (event) => {
		if (!event.target.closest("span")) {
			window.location.href = "temporadas.html?temporada=1";
			return;
		}

		const dropdown = toggle.closest(".nav-dropdown");
		const isOpen = dropdown.classList.toggle("is-open");
		toggle.setAttribute("aria-expanded", String(isOpen));
	});
});

document.addEventListener("click", (event) => {
	dropdownToggles.forEach((toggle) => {
		const dropdown = toggle.closest(".nav-dropdown");
		if (!dropdown.contains(event.target)) {
			dropdown.classList.remove("is-open");
			toggle.setAttribute("aria-expanded", "false");
		}
	});
});

if (navToggle && mainNav) {
	navToggle.addEventListener("click", () => {
		const isOpen = mainNav.classList.toggle("is-open");
		navToggle.setAttribute("aria-expanded", String(isOpen));
	});

	mainNav.querySelectorAll("a").forEach((link) => {
		link.addEventListener("click", () => {
			if (window.innerWidth <= 760) {
				mainNav.classList.remove("is-open");
				navToggle.setAttribute("aria-expanded", "false");
			}
		});
	});
}

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

const quizForm = document.querySelector("#quiz-form");
const quizResult = document.querySelector("#quiz-result");
const quizProgress = document.querySelector("#quiz-progress");

const characterDescriptions = {
	Walter: "Tenés una mente brillante, una ambición enorme y siempre querés tener la última palabra.",
	Jesse: "Sos impulsivo, leal y bastante más sensible de lo que querés admitir.",
	Skyler: "Sos inteligente, práctica y capaz de mantener en pie a toda la familia.",
	Saul: "Tu carisma y tu ingenio te sacan de cualquier lío. Mejor llamarte antes de preguntar.",
	Mike: "Observás todo, hablás poco y siempre tenés un plan preparado.",
	Gus: "Tu calma, tu disciplina y tu elegancia esconden una estrategia impecable."
};

const characterImages = {
	Walter: "img/Walter White.jfif",
	Jesse: "img/JeseePínkman.webp",
	Skyler: "img/Skyler White.jfif",
	Saul: "img/SaulGoodman.webp",
	Mike: "img/Mike.jfif",
	Gus: "img/GustavoFring.avif"
};

if (quizForm && quizResult && quizProgress) {
	const questions = [...quizForm.querySelectorAll(".quiz-question")];
	const scores = {};
	let currentQuestion = 0;

	const showResult = () => {
		const character = Object.keys(scores).reduce((winner, current) => (
			scores[current] > scores[winner] ? current : winner
		));

		quizForm.hidden = true;
		quizProgress.hidden = true;
		quizResult.innerHTML = `<img src="${characterImages[character]}" alt="${character}"><strong>Sos ${character}.</strong><span>${characterDescriptions[character]}</span><button class="button button-outline" id="quiz-restart" type="button">Repetir quiz</button>`;
		quizResult.hidden = false;
		quizResult.querySelector("#quiz-restart").addEventListener("click", restartQuiz);
		quizResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
	};

	const handleAnswer = (event) => {
		const answer = event.target;
		scores[answer.value] = (scores[answer.value] || 0) + 1;
		questions[currentQuestion].classList.remove("is-active");
		currentQuestion += 1;

		if (currentQuestion === questions.length) {
			showResult();
			return;
		}

		questions[currentQuestion].classList.add("is-active");
		quizProgress.textContent = `Pregunta ${currentQuestion + 1} de ${questions.length}`;
	};

	function restartQuiz() {
		for (const character of Object.keys(scores)) {
			delete scores[character];
		}
		quizForm.reset();
		questions.forEach((question, index) => question.classList.toggle("is-active", index === 0));
		currentQuestion = 0;
		quizProgress.textContent = "Pregunta 1 de 5";
		quizProgress.hidden = false;
		quizResult.innerHTML = "";
		quizResult.hidden = true;
		quizForm.hidden = false;
	}

	quizForm.addEventListener("change", handleAnswer);
}
