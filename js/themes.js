(function () {
  const root = document.documentElement;
  const MAX_THEME = 7;

  const legacyThemes = {
    light: "2",
    dark: "6",
  };

  function getDefaultTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "6" : "2";
  }

  function normalizeTheme(theme) {
    if (legacyThemes[theme]) {
      return legacyThemes[theme];
    }
    const themeNumber = Number(theme);
    if (themeNumber >= 1 && themeNumber <= MAX_THEME) {
      return String(themeNumber);
    }
    return getDefaultTheme();
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
  }

  function getStoredTheme() {
    try {
      return normalizeTheme(localStorage.getItem("theme"));
    } catch {
      return getDefaultTheme();
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // Ignore storage errors (e.g. private browsing / file:// restrictions)
    }
  }

  let currentTheme = getStoredTheme();
  applyTheme(currentTheme);

  const themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) {
    return;
  }

  themeToggle.addEventListener("click", (event) => {
    event.preventDefault();
    currentTheme = currentTheme === String(MAX_THEME) ? "1" : String(Number(currentTheme) + 1);
    applyTheme(currentTheme);
    saveTheme(currentTheme);
  });
})();
