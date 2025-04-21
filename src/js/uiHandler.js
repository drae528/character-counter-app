import {
  appendLetterArray,
  calculateReadingTime,
  readCharacters,
  readSentences,
  readWords,
  setCharacterLimit,
} from "./textAnalyzer";

const inputArea = document.getElementById("inputArea");
const excludeSpacesBtn = document.getElementById("excludeSpacesBtn");
const characterLimitBtn = document.getElementById("characterLimitBtn");
const readingTimeEl = document.getElementById("readingTimeEl");
const characterCountEl = document.getElementById("characterCountEl");
const wordCountEl = document.getElementById("wordCountEl");
const sentenceCountEl = document.getElementById("sentenceCountEl");
const densityDisplay = document.getElementById("densityDisplay");
const sliders = document.querySelectorAll(".slider");

let typingTimer;
export let letterArray = [];

inputArea.addEventListener("input", () => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(() => {
    const input = inputArea.value;
    if (input.trim() !== "" && input) {
      updateCountDisplay(input);
      updateDensityDisplay(input);
    } else {
      characterCountEl.textContent = "000";
      wordCountEl.textContent = "000";
      sentenceCountEl.textContent = "000";
      readingTimeEl.textContent = "Approx. reading time:";
      letterArray = [];
      updateDensityDisplay(input);
    }
  }, 1000);
});

export function updateCountDisplay(input) {
  characterCountEl.textContent = readCharacters(input)
    .toString()
    .padStart(3, "0");
  wordCountEl.textContent = readWords(input).toString().padStart(3, "0");
  sentenceCountEl.textContent = readSentences(input)
    .toString()
    .padStart(3, "0");
  readingTimeEl.textContent = calculateReadingTime(readWords(input));
}

export function updateDensityDisplay(input) {
  densityDisplay.innerHTML = "";
  letterArray = [];
  appendLetterArray(input);
  letterArray.forEach((obj) => {
    let letter = createLetterDisplay(obj);
    densityDisplay.appendChild(letter);
  });
}

function createLetterDisplay(obj) {
  const character = obj.character;
  const count = obj.count;
  const density = obj.density;
  const densityValue = parseFloat(density);

  const letter = document.createElement("div");
  letter.className = "[ flex items-center ]";
  letter.innerHTML = `
  <p class="w-6">${character}</p>
  <input
    class="slider [ appearance-none grow-1 ]"
    type="range"
    min="0"
    max="100"
    value="${densityValue}"
  />
  <p class="[ w-24 ] [ text-right ]">${count} (${density})</p>
  `;

  const slider = letter.querySelector(".slider");
  updateSlider(slider, densityValue);

  return letter;
}

export function updateSlider(slider, val) {
  const percent = ((val - slider.min) / (slider.max - slider.min)) * 100;
  const theme = document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";
  const trackColor = theme === "dark" ? "#171717" : "#e5e5e5";

  slider.style.background = `linear-gradient(to right, #925cff ${percent}%, ${trackColor} ${percent}%)`;
}

excludeSpacesBtn.addEventListener("change", () => {
  const input = inputArea.value;
  if (input.trim() !== "" && input) {
    updateCountDisplay(input);
  }
});
characterLimitBtn.addEventListener("change", () => {
  const input = inputArea.value;
  if (input.trim() !== "" && input) {
    setCharacterLimit(input);
  }
});
