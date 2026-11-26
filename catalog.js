(() => {
  "use strict";

  const tools = document.getElementById("catalog-tools");
  const filters = document.getElementById("filters");
  const search = document.getElementById("search");
  const cards = Array.from(document.querySelectorAll("#catalog .dataset"));
  const rows = Array.from(document.querySelectorAll("#overview-table tr[data-target]"), (row) => {
    const target = document.getElementById(row.dataset.target);
    return {
      row, target, card: target.closest(".dataset"),
      text: `${row.textContent} ${target.textContent}`.toLowerCase()
    };
  });
  const count = document.getElementById("catalog-count");
  const empty = document.getElementById("catalog-empty");
  let mode = "all";

  function filter() {
    const terms = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const visibleCards = new Set();
    let screened = 0;
    let reference = 0;
    for (const { row, target, card, text } of rows) {
      const matchesMode = mode === "all" || row.dataset.mode === mode;
      const matches = matchesMode && terms.every((term) => text.includes(term));
      row.hidden = !matches;
      if (target !== card) target.hidden = !matches;
      if (!matches) continue;
      visibleCards.add(card);
      screened += Number(row.dataset.scope === "screened");
      reference += Number(row.dataset.scope === "reference");
    }
    for (const card of cards) card.hidden = !visibleCards.has(card);
    count.textContent = `显示 ${screened + reference} 套 · ${screened} 套通过筛选 · ${reference} 套扩展参考`;
    empty.hidden = visibleCards.size !== 0;
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
    if (target?.closest(".dataset") && target.closest("[hidden]")) {
      search.value = "";
      setMode("all");
      target.scrollIntoView();
    }
    return target;
  }

  window.addEventListener("hashchange", () => revealAnchor(location.hash));
  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = revealAnchor(link.hash);
    if (link.closest("#overview-table")) target?.focus({ preventScroll: true });
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
