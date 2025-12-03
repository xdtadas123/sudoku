// MOSTLY TEMP STUFF FOR DISPLAYING THE CONCEPT:



// Initialization and page type detection
document.addEventListener("DOMContentLoaded", function () {
  const path = window.location.pathname;
  const isAboutPage = /about\.html?$/i.test(path);
  const toggle = document.getElementById("theme-toggle");


  // Theme (dark/light) logic
  function applyTheme(theme) {
    document.body.dataset.theme = theme;
    if (toggle) {
      toggle.textContent = theme === "dark" ? "☀️" : "🌙";
    }
  }

  if (isAboutPage) {
    applyTheme("light");
  } else {
    const stored = localStorage.getItem("sudoku-theme");
    if (stored === "light" || stored === "dark") {
      applyTheme(stored);
    } else {
      const prefersDark =
        window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      applyTheme(prefersDark ? "dark" : "light");
    }

    if (toggle) {
      toggle.addEventListener("click", function () {
        const current = document.body.dataset.theme === "dark" ? "dark" : "light";
        const next = current === "dark" ? "light" : "dark";
        applyTheme(next);
        localStorage.setItem("sudoku-theme", next);
      });
    }
  }


  //Difficulty selection and leaderboard label
  const difficultySelect = document.getElementById("difficulty");
  const leaderboardDifficulty = document.getElementById("leaderboard-difficulty");

  function updateLeaderboardLabel() {
    if (!difficultySelect || !leaderboardDifficulty) return;
    const selected = difficultySelect.options[difficultySelect.selectedIndex];
    leaderboardDifficulty.textContent = selected ? selected.textContent : "";
  }

  if (difficultySelect && leaderboardDifficulty) {
    updateLeaderboardLabel();
    difficultySelect.addEventListener("change", updateLeaderboardLabel);
  }

  //Sudoku board generation based on size
  const boardSizeSelect = document.getElementById("board-size");
  const sudokuBody = document.getElementById("sudoku-body");

  function buildBoard(blockCount) {
    if (!sudokuBody) return;

    sudokuBody.innerHTML = "";

    const grid = document.querySelector(".sudoku-grid");
    const blockSize = 3;
    const n = blockCount * blockSize;

    for (let r = 0; r < n; r++) {
      const tr = document.createElement("tr");

      for (let c = 0; c < n; c++) {
        const td = document.createElement("td");
        td.innerHTML = "&nbsp;";
        tr.appendChild(td);
      }

      sudokuBody.appendChild(tr);
    }
  }

  if (boardSizeSelect && sudokuBody) {
    const initial = parseInt(boardSizeSelect.value, 10) || 3;
    buildBoard(initial);

    boardSizeSelect.addEventListener("change", () => {
      const value = parseInt(boardSizeSelect.value, 10) || 3;
      buildBoard(value);
    });
  }


  //Navigation buttons between index and about pages
  const navButtons = document.querySelectorAll(".about-badge, .about-back");

  if (navButtons.length > 0) {
    navButtons.forEach((btn) => {
      const href = btn.getAttribute("href") || "";
      const isAboutLink = /about\.html?$/i.test(href);
      const isIndexLink =
        /index\.html?$/i.test(href) ||
        href === "./" ||
        href === "/" ||
        href === "";

      if (isAboutPage) {
        if (isIndexLink) {
          btn.style.display = "block";
        } else {
          btn.style.display = "none";
        }
      } else {
        if (isAboutLink) {
          btn.style.display = "block";
        } else {
          btn.style.display = "none";
        }
      }
    });
  }
});
