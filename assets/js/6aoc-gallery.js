/*
 * Photo gallery (6aoc-previous-conferences.html and gallery.html)
 * Markup: <div data-aoc-gallery data-initial="12"> with <a class="aoc-gallery__item" href="full.jpg" data-cat="…" data-caption="…"><img …></a>
 * Adds category filters, "Load more", and a full-screen viewer (arrows, keyboard, swipe, counter).
 * Without JavaScript every tile is still a plain link to the full-size photo.
 */
(function () {
  "use strict";

  var CATEGORY_LABELS = {
    sessions: "Sessions",
    exhibition: "Exhibition",
    people: "People & Networking",
    celebrations: "Celebrations",
    promo: "Promotional",
    posters: "Event Posters"
  };

  var galleries = document.querySelectorAll("[data-aoc-gallery]");
  if (!galleries.length) return;

  var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------------------------------
   * Full-screen viewer (one, shared)
   * ------------------------------------------------------------------------------------- */
  var box, boxImg, boxCaption, boxCounter, boxPrev, boxNext, boxClose;
  var list = []; // items currently navigable (the active filter)
  var index = 0;
  var returnFocus = null;

  function buildViewer() {
    box = document.createElement("div");
    box.className = "aoc-lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Photo viewer");
    box.hidden = true;
    box.innerHTML =
      '<button type="button" class="aoc-lightbox__close" aria-label="Close photo viewer"><span aria-hidden="true">&times;</span></button>' +
      '<button type="button" class="aoc-lightbox__nav aoc-lightbox__nav--prev" aria-label="Previous photo"><span aria-hidden="true">&#8249;</span></button>' +
      '<figure class="aoc-lightbox__figure">' +
      '<img class="aoc-lightbox__img" alt="">' +
      '<figcaption class="aoc-lightbox__caption"><span class="aoc-lightbox__text"></span><span class="aoc-lightbox__counter"></span></figcaption>' +
      "</figure>" +
      '<button type="button" class="aoc-lightbox__nav aoc-lightbox__nav--next" aria-label="Next photo"><span aria-hidden="true">&#8250;</span></button>';
    document.body.appendChild(box);
    boxImg = box.querySelector(".aoc-lightbox__img");
    boxCaption = box.querySelector(".aoc-lightbox__text");
    boxCounter = box.querySelector(".aoc-lightbox__counter");
    boxPrev = box.querySelector(".aoc-lightbox__nav--prev");
    boxNext = box.querySelector(".aoc-lightbox__nav--next");
    boxClose = box.querySelector(".aoc-lightbox__close");

    boxClose.addEventListener("click", closeViewer);
    boxPrev.addEventListener("click", function () { show(index - 1); });
    boxNext.addEventListener("click", function () { show(index + 1); });
    // Click on the dark backdrop (not the photo or buttons) closes
    box.addEventListener("click", function (e) {
      if (e.target === box || e.target.classList.contains("aoc-lightbox__figure")) closeViewer();
    });

    document.addEventListener("keydown", function (e) {
      if (box.hidden) return;
      if (e.key === "Escape") { e.preventDefault(); closeViewer(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); show(index - 1); }
      else if (e.key === "ArrowRight") { e.preventDefault(); show(index + 1); }
      else if (e.key === "Tab") {
        // Keep keyboard focus inside the viewer
        var focusables = [boxClose, boxPrev, boxNext].filter(function (b) { return !b.hidden; });
        var i = focusables.indexOf(document.activeElement);
        e.preventDefault();
        var next = e.shiftKey ? (i <= 0 ? focusables.length - 1 : i - 1) : (i + 1) % focusables.length;
        focusables[next].focus();
      }
    });

    // Swipe left/right on touch screens
    var start = null;
    box.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse") start = { x: e.clientX, y: e.clientY };
    });
    box.addEventListener("pointerup", function (e) {
      if (!start) return;
      var dx = e.clientX - start.x;
      var dy = e.clientY - start.y;
      start = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(index + (dx < 0 ? 1 : -1));
    });
    box.addEventListener("pointercancel", function () { start = null; });
  }

  function itemData(a) {
    var img = a.querySelector("img");
    return { full: a.getAttribute("href"), thumb: img ? img.currentSrc || img.src : "", caption: a.getAttribute("data-caption") || (img ? img.alt : ""), alt: img ? img.alt : "" };
  }

  function preload(i) {
    if (i < 0 || i >= list.length) return;
    var im = new Image();
    im.src = list[i].getAttribute("href");
  }

  function show(i) {
    if (!list.length) return;
    index = (i + list.length) % list.length; // wrap around at both ends
    var d = itemData(list[index]);
    box.classList.add("is-loading");
    // Show the thumbnail straight away, then swap in the full-size photo once it has loaded
    boxImg.src = d.thumb;
    boxImg.alt = d.alt;
    var full = new Image();
    var wanted = index;
    full.onload = function () {
      if (wanted !== index) return;
      boxImg.src = d.full;
      box.classList.remove("is-loading");
    };
    full.onerror = function () { box.classList.remove("is-loading"); };
    full.src = d.full;
    boxCaption.textContent = d.caption;
    boxCounter.textContent = (index + 1) + " / " + list.length;
    var single = list.length < 2;
    boxPrev.hidden = single;
    boxNext.hidden = single;
    preload(index + 1);
    preload(index - 1);
  }

  function openViewer(items, i, trigger) {
    list = items;
    returnFocus = trigger;
    box.hidden = false;
    document.documentElement.classList.add("aoc-lightbox-open");
    // Next frame so the fade-in transition runs
    window.requestAnimationFrame(function () { box.classList.add("is-open"); });
    show(i);
    boxClose.focus();
  }

  function closeViewer() {
    box.classList.remove("is-open");
    document.documentElement.classList.remove("aoc-lightbox-open");
    var hide = function () { box.hidden = true; boxImg.removeAttribute("src"); };
    if (reducedMotion) hide(); else window.setTimeout(hide, 200);
    if (returnFocus) returnFocus.focus();
  }

  /* ---------------------------------------------------------------------------------------
   * Gallery grid: filters + load more
   * ------------------------------------------------------------------------------------- */
  function setupGallery(gallery) {
    var grid = gallery.querySelector(".aoc-gallery__grid");
    var items = Array.prototype.slice.call(grid.querySelectorAll(".aoc-gallery__item"));
    var step = parseInt(gallery.getAttribute("data-initial"), 10) || 12;
    var active = "all";
    var shown = step;

    // Filters, built from the categories actually present
    var counts = { all: items.length };
    items.forEach(function (a) {
      var c = a.getAttribute("data-cat");
      counts[c] = (counts[c] || 0) + 1;
    });
    var filters = document.createElement("div");
    filters.className = "aoc-gallery__filters";
    filters.setAttribute("role", "group");
    filters.setAttribute("aria-label", "Filter photos");
    var keys = ["all"].concat(Object.keys(CATEGORY_LABELS).filter(function (k) { return counts[k]; }));
    keys.forEach(function (k) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "aoc-gallery__filter";
      b.setAttribute("data-filter", k);
      b.setAttribute("aria-pressed", k === "all" ? "true" : "false");
      b.innerHTML = (k === "all" ? "All" : CATEGORY_LABELS[k]) + ' <span class="aoc-gallery__count">' + counts[k] + "</span>";
      b.addEventListener("click", function () {
        active = k;
        shown = step;
        filters.querySelectorAll(".aoc-gallery__filter").forEach(function (x) {
          x.setAttribute("aria-pressed", x === b ? "true" : "false");
        });
        render();
      });
      filters.appendChild(b);
    });
    gallery.insertBefore(filters, grid);

    // Load more
    var more = document.createElement("div");
    more.className = "aoc-gallery__more";
    more.innerHTML = '<button type="button" class="aoc-gallery__more-btn"></button>';
    var moreBtn = more.querySelector("button");
    moreBtn.addEventListener("click", function () {
      var firstNew = matching()[shown];
      shown += step;
      render();
      if (firstNew) firstNew.focus(); // keep keyboard users where the new photos start
    });
    gallery.appendChild(more);

    function matching() {
      return items.filter(function (a) { return active === "all" || a.getAttribute("data-cat") === active; });
    }

    function render() {
      var visible = matching();
      items.forEach(function (a) { a.hidden = true; a.classList.remove("is-featured"); });
      visible.forEach(function (a, i) { a.hidden = i >= shown; });
      if (visible[0]) visible[0].classList.add("is-featured"); // first photo gets the large tile
      var left = visible.length - Math.min(shown, visible.length);
      more.hidden = left <= 0;
      moreBtn.textContent = "Load more photos (" + left + ")";
    }

    // Open the viewer on click; arrows move through the whole filtered set, not just the loaded tiles
    items.forEach(function (a) {
      a.addEventListener("click", function (e) {
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) return; // let "open in new tab" work
        e.preventDefault();
        var visible = matching();
        openViewer(visible, visible.indexOf(a), a);
      });
    });

    render();
  }

  buildViewer();
  Array.prototype.forEach.call(galleries, setupGallery);
})();
