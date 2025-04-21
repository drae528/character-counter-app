import {
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

let typingTimer;

inputArea.addEventListener("input", () => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(() => {
    const input = inputArea.value;
    if (input.trim() !== "" && input) {
      updateCountDisplay(input);
    } else {
      characterCountEl.textContent = "000";
      wordCountEl.textContent = "000";
      sentenceCountEl.textContent = "000";
      readingTimeEl.textContent = "Approx. reading time:";
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
