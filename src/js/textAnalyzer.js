import { updateCountDisplay } from "./uiHandler";

export function readCharacters(input) {
  let characters = input;
  if (excludeSpacesBtn.checked) {
    characters = input.replace(/\s+/g, "");
  }
  return characters.length;
}

export function readWords(input) {
  let words = input.split(/[^a-zA-Z0-9']+/);
  words = words.filter((word) => word);
  return words.length;
}

export function readSentences(input) {
  let sentences = input.split(
    /(?<!\w\.\w)(?<![A-Z][a-z]\.)(?<=\.|\?|\!)(?!\.\.\.)(?=\s)/
  );
  sentences = sentences.filter(
    (sentence) => sentence.trim() !== "" && sentence
  );
  return sentences.length;
}

export function setCharacterLimit(input) {
  if (inputArea.maxLength === 250) {
    inputArea.maxLength = "1000";
    updateCountDisplay(inputArea.value);
    return;
  }

  inputArea.maxLength = 250;
  if (inputArea.value.length > 250) {
    inputArea.value = inputArea.value.slice(0, 250);
  }
  updateCountDisplay(inputArea.value);
}

export function calculateReadingTime(wordCount) {
  const time = Math.ceil(wordCount / 200);
  if (time <= 1) {
    return "Approx. reading time: <1 minute";
  }
  return `Approx. reading time: ~${time} minutes`;
}
