document.addEventListener("DOMContentLoaded", function () {
  const storedTheme = localStorage.getItem("theme") || "dark";
  applyTheme(storedTheme);
  updateSliderColors();
});

function setTheme() {
  const currentTheme = localStorage.getItem("theme") || "dark";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  applyTheme(newTheme);
  updateSliderColors();
}

function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
    document.querySelectorAll(".bg-noise-white").forEach((element) => {
      element.classList.remove("bg-noise-white");
      element.classList.add("bg-noise-dark");
    });
    document.querySelectorAll(".slider").forEach((element) => {
      element.classList.add("dark");
      element.classList.remove("light");
    });
  } else {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
    document.querySelectorAll(".bg-noise-dark").forEach((element) => {
      element.classList.remove("bg-noise-dark");
      element.classList.add("bg-noise-white");
    });
    document.querySelectorAll(".slider").forEach((element) => {
      element.classList.add("light");
      element.classList.remove("dark");
    });
  }
}

function updateSliderColors() {
  const sliders = document.querySelectorAll(".slider");
  const theme = document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";

  sliders.forEach((slider) => {
    const value = slider.value;
    const percent = ((value - slider.min) / (slider.max - slider.min)) * 100;
    const trackColor = theme === "dark" ? "#171717" : "#e5e5e5";
    slider.style.background = `linear-gradient(to right, #925cff ${percent}%, ${trackColor} ${percent}%)`;
  });
}
