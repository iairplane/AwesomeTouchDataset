(() => {
  "use strict";

  const tools = document.getElementById("catalog-tools");
  const filters = document.getElementById("filters");
  const search = document.getElementById("search");
  const cards = Array.from(document.querySelectorAll(".dataset"), (card) => ({
    card, text: card.textContent.toLowerCase()
  }));
  const count = document.getElementById("catalog-count");
  const empty = document.getElementById("catalog-empty");
  let mode = "all";

  function filter() {
    const terms = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let visible = 0;
    for (const { card, text } of cards) {
      const matches = mode === "all" || card.dataset.mode === mode;
      card.hidden = !matches || !terms.every((term) => text.includes(term));
      if (!card.hidden) visible++;
    }
    count.textContent = `显示 ${visible} / ${cards.length} 套数据集`;
    empty.hidden = visible !== 0;
  }

  function setMode(next) {
    mode = next;
    for (const button of filters.querySelectorAll("button")) {
      button.setAttribute("aria-pressed", String(button.dataset.mode === next));
    }
    filter();
  }

  for (const button of filters.querySelectorAll("button")) {
    button.addEventListener("click", () => setMode(button.dataset.mode));
  }
  search.addEventListener("input", filter);
  window.addEventListener("hashchange", () => {
    const target = document.getElementById(location.hash.slice(1));
    if (target?.classList.contains("dataset") && target.hidden) {
      search.value = "";
      setMode("all");
      target.scrollIntoView();
    }
  });

  const players = Array.from(document.querySelectorAll("video"));
  for (const video of players) {
    video.addEventListener("play", () => {
      for (const other of players) {
        if (video !== other && !other.paused) other.pause();
      }
    });
  }
  tools.hidden = false;
})();
