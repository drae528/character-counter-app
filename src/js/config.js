import { updateCountDisplay } from "./uiHandler";

function initialize() {
  const input = inputArea.value;
  if (input.trim() !== "" && input) {
    updateCountDisplay(input);
  }
}

initialize();
