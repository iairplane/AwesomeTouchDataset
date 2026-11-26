(() => {
  "use strict";

  const tools = document.getElementById("catalog-tools");
  const filters = document.getElementById("filters");
  const search = document.getElementById("search");
  const cards = Array.from(document.querySelectorAll(".dataset"), (card) => ({
    card, text: card.textContent.toLowerCase(), topic: card.classList.contains("topic")
  }));
  const datasetCount = cards.filter(({ topic }) => !topic).length;
  const count = document.getElementById("catalog-count");
  const empty = document.getElementById("catalog-empty");
  let mode = "all";

  function filter() {
    const terms = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let visible = 0;
    let topics = 0;
    for (const { card, text, topic } of cards) {
      const matches = mode === "all" || card.dataset.mode === mode;
      card.hidden = !matches || !terms.every((term) => text.includes(term));
      if (!card.hidden) {
        visible += Number(!topic);
        topics += Number(topic);
      }
    }
    count.textContent = `显示 ${visible} / ${datasetCount} 套数据集${topics ? `，另有 ${topics} 个专题` : ""}`;
    empty.hidden = visible + topics !== 0;
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
  function revealAnchor(hash) {
    const target = document.getElementById(hash.slice(1));
    if (target?.closest(".dataset")?.hidden) {
      search.value = "";
      setMode("all");
      target.scrollIntoView();
    }
  }

  window.addEventListener("hashchange", () => revealAnchor(location.hash));
  document.querySelector('nav a[href="#tachintech"]').addEventListener("click", (event) => {
    revealAnchor(event.currentTarget.hash);
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
