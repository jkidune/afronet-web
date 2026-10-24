/*
 * 6AOC sponsors (loaded on the 6aoc*.html event pages only)
 * - Sliding logo strip:   <section data-aoc-sponsor-strip></section>
 * - Still sponsor grid:   <div data-aoc-sponsor-grid></div>   (6aoc-sponsors.html)
 * - One shared zoom popup used by both
 * Everything is generated from the SPONSORS list below.
 */
(function () {
  "use strict";

  // ---- Sponsor list: to add a sponsor, add one entry here -------------------------------
  // short: abbreviation, name: full organisation name, logo: image URL, url: website
  var SPONSORS = [
    {
      short: "SDC",
      name: "Swiss Agency for Development and Cooperation",
      logo: "https://cms.afronet.bio/wp-content/uploads/2026/10/SDC-logo-member-profile-removebg-preview.png",
      url: "https://www.eda.admin.ch/deza/en/home.html"
    },
    {
      short: "IFOAM",
      name: "Organics International",
      logo: "https://cms.afronet.bio/wp-content/uploads/2026/10/ifoam-organics-international-vector-logo-removebg-preview.png",
      url: "https://www.ifoam.bio/"
    },
    {
      short: "FiBL",
      name: "Research Institute of Organic Agriculture",
      logo: "https://cms.afronet.bio/wp-content/uploads/2026/10/fibl-logo.png",
      url: "https://www.fibl.org/en"
    },
    {
      short: "BvAT",
      name: "Biovision Africa Trust",
      logo: "https://cms.afronet.bio/wp-content/uploads/2026/10/BvAT_Logo-removebg-preview.png",
      url: "https://www.biovisionafrica.org/"
    }
  ];

  // Roughly how long each logo stays on screen while sliding
  var SECONDS_ON_SCREEN = 7;
  // Translated pages carry a string table (window.AFRONET_I18N); English falls back to the text as written
  function t(text) {
    var table = window.AFRONET_I18N;
    return (table && table[text]) || text;
  }

  var STRIP_LABEL = t("6AOC Sponsors & Partners");

  var stripHosts = document.querySelectorAll("[data-aoc-sponsor-strip]");
  var gridHosts = document.querySelectorAll("[data-aoc-sponsor-grid]");
  if (!SPONSORS.length || (!stripHosts.length && !gridHosts.length)) return;

  var reducedMotion = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };

  function fullName(s) {
    return s.short + " — " + s.name;
  }

  function logoImg(s) {
    var img = document.createElement("img");
    img.src = s.logo;
    img.alt = fullName(s);
    img.decoding = "async";
    return img;
  }

  /* ---------------------------------------------------------------------------------------
   * Shared zoom popup
   * ------------------------------------------------------------------------------------- */
  var pop, popImg, popName, popLink;
  var current = null; // { trigger, mode: "hover" | "tap" | "focus", onClose }
  var closeTimer = null;

  function buildPopup() {
    pop = document.createElement("div");
    pop.className = "aoc-sponsor-pop";
    pop.setAttribute("role", "dialog");
    pop.setAttribute("aria-hidden", "true");
    pop.innerHTML =
      '<div class="aoc-sponsor-pop__card">' +
      '<div class="aoc-sponsor-pop__logo"><img alt=""></div>' +
      '<p class="aoc-sponsor-pop__name"></p>' +
      '<a class="aoc-sponsor-pop__link" target="_blank" rel="noopener">' + t("Visit website") + "</a>" +
      "</div>";
    popImg = pop.querySelector("img");
    popName = pop.querySelector(".aoc-sponsor-pop__name");
    popLink = pop.querySelector(".aoc-sponsor-pop__link");
    document.body.appendChild(pop);

    // Moving the mouse from the logo onto the popup keeps it open (to reach "Visit website")
    pop.addEventListener("mouseenter", cancelClose);
    pop.addEventListener("mouseleave", function () {
      if (current && current.mode === "hover") scheduleClose();
    });
    pop.addEventListener("focusout", function (e) {
      if (current && current.mode === "focus" && !pop.contains(e.relatedTarget) && e.relatedTarget !== current.trigger) closeNow();
    });

    // Tap outside closes a tapped popup
    document.addEventListener("pointerdown", function (e) {
      if (!current || current.mode !== "tap") return;
      if (pop.contains(e.target) || current.trigger.contains(e.target)) return;
      closeNow();
    }, true);
    // Scrolling the page closes the popup (its logo has moved away from it)
    window.addEventListener("scroll", function () {
      if (current) closeNow();
    }, { passive: true });
    window.addEventListener("resize", function () {
      if (current) closeNow();
    });
    document.addEventListener("keydown", function (e) {
      if ((e.key === "Escape" || e.keyCode === 27) && current) closeNow();
    });
  }

  function positionPopup(trigger) {
    var margin = 12;
    var r = trigger.getBoundingClientRect();
    var w = pop.offsetWidth;
    var h = pop.offsetHeight;
    var vw = document.documentElement.clientWidth;
    var vh = window.innerHeight;
    var left = r.left + r.width / 2 - w / 2;
    left = Math.max(margin, Math.min(left, vw - w - margin));
    var top = r.top - h - 10; // above the logo when there is room
    if (top < margin) top = r.bottom + 10; // otherwise below
    if (top + h > vh - margin) top = Math.max(margin, vh - h - margin);
    pop.style.left = Math.round(left) + "px";
    pop.style.top = Math.round(top) + "px";
  }

  function openPopup(trigger, sponsor, mode, onOpen, onClose) {
    cancelClose();
    if (current && current.trigger !== trigger) closeNow();
    popImg.src = sponsor.logo;
    popImg.alt = fullName(sponsor);
    popName.textContent = fullName(sponsor);
    popLink.href = sponsor.url;
    popLink.setAttribute("aria-label", t("Visit the {name} website (opens in a new tab)").replace("{name}", sponsor.name));
    positionPopup(trigger);
    pop.classList.add("is-open");
    pop.setAttribute("aria-hidden", "false");
    current = { trigger: trigger, mode: mode, onClose: onClose };
    if (onOpen) onOpen();
  }

  function closeNow() {
    cancelClose();
    if (!current) return;
    var done = current.onClose;
    current = null;
    pop.classList.remove("is-open");
    pop.setAttribute("aria-hidden", "true");
    if (done) done();
  }

  function scheduleClose() {
    cancelClose();
    closeTimer = window.setTimeout(closeNow, 150);
  }

  function cancelClose() {
    if (closeTimer) {
      window.clearTimeout(closeTimer);
      closeTimer = null;
    }
  }

  // Wire one logo/card: hover (mouse), deliberate tap (touch), keyboard focus
  function bindTrigger(el, sponsor, onOpen, onClose) {
    var down = null;
    var lastPointer = 0;

    el.addEventListener("pointerenter", function (e) {
      if (e.pointerType === "mouse") openPopup(el, sponsor, "hover", onOpen, onClose);
    });
    el.addEventListener("pointerleave", function (e) {
      if (e.pointerType === "mouse" && current && current.trigger === el) scheduleClose();
    });

    el.addEventListener("pointerdown", function (e) {
      lastPointer = Date.now();
      if (e.pointerType === "mouse") return;
      down = { x: e.clientX, y: e.clientY, t: Date.now() };
    });
    el.addEventListener("pointercancel", function () {
      down = null; // the browser took over for scrolling: not a tap
    });
    el.addEventListener("pointerup", function (e) {
      lastPointer = Date.now();
      if (e.pointerType === "mouse" || !down) return;
      var moved = Math.abs(e.clientX - down.x) + Math.abs(e.clientY - down.y);
      var quick = Date.now() - down.t < 500;
      down = null;
      if (moved > 10 || !quick) return; // a swipe or long press, not a tap
      if (current && current.trigger === el) closeNow();
      else openPopup(el, sponsor, "tap", onOpen, onClose);
    });

    el.addEventListener("focus", function () {
      if (Date.now() - lastPointer < 600) return; // focus caused by a click/tap, already handled
      openPopup(el, sponsor, "focus", onOpen, onClose);
    });
    el.addEventListener("blur", function (e) {
      if (current && current.trigger === el && current.mode === "focus" && !pop.contains(e.relatedTarget)) closeNow();
    });

    // Enter / Space: go to the sponsor's website
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        window.open(sponsor.url, "_blank", "noopener");
      }
    });
  }

  /* ---------------------------------------------------------------------------------------
   * Component A: sliding logo strip
   * ------------------------------------------------------------------------------------- */
  function visibleCount() {
    var w = window.innerWidth;
    var target = w < 768 ? 3 : w < 1200 ? 4 : SPONSORS.length >= 6 ? 6 : 4;
    // A moving row shows (visible + 1) logos at once while sliding, so cap at sponsors - 1:
    // that way the same logo never appears twice on screen
    if (SPONSORS.length > 1) target = Math.min(target, SPONSORS.length - 1);
    return Math.max(1, target);
  }

  function buildStrip(host, index) {
    var labelId = "aoc-sponsor-strip-label-" + index;
    host.classList.add("aoc-sponsor-strip");
    host.setAttribute("aria-labelledby", labelId);
    host.innerHTML =
      '<div class="aoc-sponsor-strip__inner">' +
      '<p class="aoc-sponsor-strip__label" id="' + labelId + '"></p>' +
      '<div class="aoc-sponsor-strip__viewport"><div class="aoc-sponsor-strip__track"></div></div>' +
      "</div>";
    host.querySelector(".aoc-sponsor-strip__label").textContent = STRIP_LABEL;
    var viewport = host.querySelector(".aoc-sponsor-strip__viewport");
    var track = host.querySelector(".aoc-sponsor-strip__track");
    var paused = false;
    var lastWidth = 0;

    function pause() {
      paused = true;
      track.style.animationPlayState = "paused";
    }
    function resume() {
      paused = false;
      track.style.animationPlayState = "running";
    }

    function addLogo(sponsor, isCopy) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "aoc-sponsor-logo";
      btn.setAttribute("data-sponsor", sponsor.short);
      btn.appendChild(logoImg(sponsor));
      if (isCopy) {
        // Repeats exist only to make the loop seamless: hide them from keyboard and screen readers
        btn.setAttribute("aria-hidden", "true");
        btn.tabIndex = -1;
      }
      bindTrigger(btn, sponsor, pause, resume);
      track.appendChild(btn);
    }

    function render() {
      if (current && host.contains(current.trigger)) closeNow();
      var visible = visibleCount();
      var areaWidth = viewport.clientWidth;
      if (!areaWidth) return;
      var slot = areaWidth / visible;
      var n = SPONSORS.length;
      lastWidth = areaWidth;

      track.innerHTML = "";
      track.style.animation = "none";
      track.style.setProperty("--aoc-slot", slot + "px");

      if (reducedMotion.matches) {
        // Still, centred row: one copy of each logo, no movement
        track.classList.add("is-static");
        SPONSORS.forEach(function (s) { addLogo(s, false); });
        return;
      }
      track.classList.remove("is-static");

      // Enough copies to fill the area twice over, plus one set to slide into
      var copies = Math.max(2, Math.ceil((areaWidth * 2) / (n * slot)) + 1);
      for (var c = 0; c < copies; c++) {
        SPONSORS.forEach(function (s) { addLogo(s, c > 0); });
      }
      // Slide exactly one set, then loop: the next set is identical, so there is no jump
      track.style.setProperty("--aoc-shift", -(n * slot) + "px");
      var duration = n * (SECONDS_ON_SCREEN / visible);
      void track.offsetWidth; // restart the animation with the new values
      track.style.animation = "aoc-sponsor-slide " + duration.toFixed(2) + "s linear infinite";
      track.style.animationPlayState = paused ? "paused" : "running";
    }

    var resizeTimer = null;
    window.addEventListener("resize", function () {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(function () {
        if (viewport.clientWidth !== lastWidth) render();
      }, 150);
    });
    if (reducedMotion.addEventListener) reducedMotion.addEventListener("change", render);

    render();
  }

  /* ---------------------------------------------------------------------------------------
   * Component B: still sponsor cards (6aoc-sponsors.html)
   * ------------------------------------------------------------------------------------- */
  function buildGrid(host) {
    host.classList.add("aoc-sponsor-grid");
    SPONSORS.forEach(function (s) {
      var card = document.createElement("button");
      card.type = "button";
      card.className = "aoc-sponsor-card";
      card.setAttribute("data-sponsor", s.short);
      var logo = document.createElement("span");
      logo.className = "aoc-sponsor-card__logo";
      logo.appendChild(logoImg(s));
      var name = document.createElement("span");
      name.className = "aoc-sponsor-card__name";
      name.textContent = fullName(s);
      card.appendChild(logo);
      card.appendChild(name);
      bindTrigger(card, s, null, null);
      host.appendChild(card);
    });
  }

  buildPopup();
  Array.prototype.forEach.call(stripHosts, function (host, i) { buildStrip(host, i + 1); });
  Array.prototype.forEach.call(gridHosts, buildGrid);
})();
