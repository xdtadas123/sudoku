document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("theme-toggle");

  const applyTheme = (theme) => {
    document.body.dataset.theme = theme;
    toggle.textContent = theme === "dark" ? "☀️" : "🌙";
  };

  const stored = localStorage.getItem("sudoku-theme");
  if (stored === "light" || stored === "dark") {
    applyTheme(stored);
  } else {
    const prefersDark = window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark ? "dark" : "light");
  }

  toggle.addEventListener("click", () => {
    const current = document.body.dataset.theme === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("sudoku-theme", next);
  });
});
