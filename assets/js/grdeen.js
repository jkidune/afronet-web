(function ($) {
  "use strict";

  // Translated pages (/fr/, /pt/, /sw/) carry a string table built by tools/i18n-build.mjs; English pages fall back to the text as written
  function t(text) {
    var table = window.AFRONET_I18N;
    return (table && table[text]) || text;
  }

  /*-- Checkout Accoradin --*/
  if ($(".checkout-page__payment__title").length) {
    $(".checkout-page__payment__item")
      .find(".checkout-page__payment__content")
      .hide();
    $(".checkout-page__payment__item--active")
      .find(".checkout-page__payment__content")
      .show();
    $(".checkout-page__payment__title").on("click", function (e) {
      e.preventDefault();
      $(this)
        .parents(".checkout-page__payment")
        .find(".checkout-page__payment__item")
        .removeClass("checkout-page__payment__item--active");
      $(this)
        .parents(".checkout-page__payment")
        .find(".checkout-page__payment__content")
        .slideUp();
      $(this).parent().addClass("checkout-page__payment__item--active");
      $(this).parent().find(".checkout-page__payment__content").slideDown();
    });
  }

  let dynamicyearElm = $(".dynamic-year");
  if (dynamicyearElm.length) {
    let currentYear = new Date().getFullYear();
    dynamicyearElm.html(currentYear);
  }

  // Date Picker
  if ($(".grdeen-datepicker").length) {
    $(".grdeen-datepicker").each(function () {
      $(this).datepicker();
    });
  }

  // Popular Causes Progress Bar
  if ($(".count-bar").length) {
    $(".count-bar").appear(
      function () {
        var el = $(this);
        var percent = el.data("percent");
        $(el).css("width", percent).addClass("counted");
      }, {
        accY: -50
      }
    );
  }

  //Fact Counter + Text Count
  if ($(".count-box").length) {
    $(".count-box").appear(
      function () {
        var $t = $(this),
          n = $t.find(".count-text").attr("data-stop"),
          r = parseInt($t.find(".count-text").attr("data-speed"), 10);

        if (!$t.hasClass("counted")) {
          $t.addClass("counted");
          $({
            countNum: $t.find(".count-text").text()
          }).animate({
            countNum: n
          }, {
            duration: r,
            easing: "linear",
            step: function () {
              $t.find(".count-text").text(Math.floor(this.countNum));
            },
            complete: function () {
              $t.find(".count-text").text(this.countNum);
            }
          });
        }
      }, {
        accY: 0
      }
    );
  }

  // custom coursor
  if ($(".custom-cursor").length) {
    var cursor = document.querySelector(".custom-cursor__cursor");
    var cursorinner = document.querySelector(".custom-cursor__cursor-two");
    var a = document.querySelectorAll("a");

    document.addEventListener("mousemove", function (e) {
      var x = e.clientX;
      var y = e.clientY;
      cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
    });

    document.addEventListener("mousemove", function (e) {
      var x = e.clientX;
      var y = e.clientY;
      cursorinner.style.left = x + "px";
      cursorinner.style.top = y + "px";
    });

    document.addEventListener("mousedown", function () {
      cursor.classList.add("click");
      cursorinner.classList.add("custom-cursor__innerhover");
    });

    document.addEventListener("mouseup", function () {
      cursor.classList.remove("click");
      cursorinner.classList.remove("custom-cursor__innerhover");
    });

    a.forEach((item) => {
      item.addEventListener("mouseover", () => {
        cursor.classList.add("custom-cursor__hover");
      });
      item.addEventListener("mouseleave", () => {
        cursor.classList.remove("custom-cursor__hover");
      });
    });
  }

  if ($(".contact-form-validated").length) {
    $(".contact-form-validated").validate({
      // initialize the plugin
      rules: {
        name: {
          required: true
        },
        email: {
          required: true,
          email: true
        },
        message: {
          required: true
        },
        subject: {
          required: true
        }
      },
      submitHandler: function (form) {
        // sending value with ajax request
        $.post(
          $(form).attr("action"),
          $(form).serialize(),
          function (response) {
            $(form).parent().find(".result").append(response);
            $(form).find('input[type="text"]').val("");
            $(form).find('input[type="email"]').val("");
            $(form).find("textarea").val("");
          }
        );
        return false;
      }
    });
  }

  // newsletter form (Contact Form 7 REST API, cms.afronet.bio)
  if ($(".cf7-newsletter-form").length) {
    $(".cf7-newsletter-form").each(function () {
      var Self = $(this);
      var cf7Id = Self.data("cf7-id");
      var mcResp = Self.parent().find(".mc-form__response");

      Self.on("submit", function (e) {
        e.preventDefault();
        var formEl = Self.get(0);
        var submitBtn = Self.find('button[type="submit"]');
        var formData = new FormData(formEl);
        formData.append("_wpcf7", cf7Id);
        formData.append("_wpcf7_version", "6.1.4");
        formData.append("_wpcf7_locale", "en_US");
        formData.append("_wpcf7_unit_tag", "wpcf7-f" + cf7Id + "-p0-o1");
        formData.append("_wpcf7_container_post", "0");

        submitBtn.prop("disabled", true);
        mcResp.empty();

        fetch(
          "https://cms.afronet.bio/wp-json/contact-form-7/v1/contact-forms/" + cf7Id + "/feedback",
          { method: "POST", body: formData }
        )
          .then(function (res) { return res.json(); })
          .then(function (data) {
            submitBtn.prop("disabled", false);
            var message = data.message || t("Something went wrong. Please try again.");
            mcResp.append('<p class="mc-message">' + message + "</p>");
            if (data.status === "mail_sent") {
              Self.removeClass("errored").addClass("successed");
              mcResp.removeClass("errored").addClass("successed");
              formEl.reset();
            } else {
              Self.removeClass("successed").addClass("errored");
              mcResp.removeClass("successed").addClass("errored");
            }
            mcResp.find("p").fadeOut(10000);
          })
          .catch(function () {
            submitBtn.prop("disabled", false);
            Self.removeClass("successed").addClass("errored");
            mcResp.removeClass("successed").addClass("errored");
            mcResp.append('<p class="mc-message">Something went wrong. Please try again later.</p>');
            mcResp.find("p").fadeOut(10000);
          });
      });
    });
  }

  if ($(".video-popup").length) {
    $(".video-popup").magnificPopup({
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: true,

      fixedContentPos: false,
      iframe: {
        patterns: {
          youtube: {
            src: "//www.youtube.com/embed/%id%?autoplay=1&start=89"
          }
        }
      }
    });
  }

  if ($(".img-popup").length) {
    var groups = {};
    $(".img-popup").each(function () {
      var id = parseInt($(this).attr("data-group"), 10);

      if (!groups[id]) {
        groups[id] = [];
      }

      groups[id].push(this);
    });

    $.each(groups, function () {
      $(this).magnificPopup({
        type: "image",
        closeOnContentClick: true,
        closeBtnInside: false,
        gallery: {
          enabled: true
        }
      });
    });
  }

  // Page name from a URL or link: "/about", "about.html" and "https://afronet.bio/about" all give "about"; the homepage gives ""
  function pageKey(url) {
    let path = String(url || "").split("#")[0].split("?")[0];
    path = path.split("/").pop().replace(/\.html$/, "");
    return path === "index" ? "" : path;
  }

  function dynamicCurrentMenuClass(selector) {
    let FileName = pageKey(window.location.pathname);

    selector.find("li").each(function () {
      // The language switcher links to this same page in other languages, which is not "current"
      if ($(this).closest(".main-menu__lang").length) return;
      let href = $(this).find("a").attr("href") || "";
      // In-page anchors and external links never mark a menu item as current
      if (!href || href.indexOf("#") !== -1 || /^[a-z]+:/i.test(href)) return;
      if (pageKey(href) === FileName) {
        $(this).addClass("current");
      }
    });
    // if any li has .current elmnt add class
    selector.children("li").each(function () {
      if ($(this).find(".current").length) {
        $(this).addClass("current");
      }
    });
    // if no file name return
    if ("" == FileName) {
      selector.find("li").eq(0).addClass("current");
    }
  }

  if ($(".main-menu__list").length) {
    // dynamic current class
    let mainNavUL = $(".main-menu__list");
    dynamicCurrentMenuClass(mainNavUL);
  }

  if ($(".service-sidebar__nav").length) {
    // dynamic current class
    let mainNavUL = $(".service-sidebar__nav");
    dynamicCurrentMenuClass(mainNavUL);
  }

  if ($(".main-menu").length && $(".mobile-nav__container").length) {
    let navContent = document.querySelector(".main-menu").innerHTML;
    let mobileNavContainer = document.querySelector(".mobile-nav__container");
    mobileNavContainer.innerHTML = navContent;
    // On phones the language choice sits first, where people look for it
    $(".mobile-nav__container .main-menu__lang").prependTo(".mobile-nav__container .main-menu__list");
  }

  if ($(".sticky-header").length) {
    $(".sticky-header")
      .clone()
      .insertAfter(".sticky-header")
      .addClass("sticky-header--cloned");
  }

  if ($(".mobile-nav__container .main-menu__list").length) {
    let dropdownAnchor = $(
      ".mobile-nav__container .main-menu__list .dropdown > a"
    );
    dropdownAnchor.each(function () {
      let self = $(this);
      let toggleBtn = document.createElement("BUTTON");
      toggleBtn.setAttribute("aria-label", "dropdown toggler");
      toggleBtn.innerHTML = "<i class='fa fa-angle-down'></i>";
      self.append(function () {
        return toggleBtn;
      });
      self.find("button").on("click", function (e) {
        e.preventDefault();
        let self = $(this);
        self.toggleClass("expanded");
        self.parent().toggleClass("expanded");
        self.parent().parent().children("ul").slideToggle();
      });
    });
  }

  //Show Popup menu
  $(document).on("click", ".megamenu-clickable--toggler > a", function (e) {
    $("body").toggleClass("megamenu-popup-active");
    $(this).parent().find("ul").toggleClass("megamenu-clickable--active");
    e.preventDefault();
  });
  $(document).on("click", ".megamenu-clickable--close", function (e) {
    $("body").removeClass("megamenu-popup-active");
    $(".megamenu-clickable--active").removeClass("megamenu-clickable--active");
    e.preventDefault();
  });

  if ($(".mobile-nav__toggler").length) {
    $(".mobile-nav__toggler").on("click", function (e) {
      e.preventDefault();
      $(".mobile-nav__wrapper").toggleClass("expanded");
      $("body").toggleClass("locked");
    });
  }

  if ($(".search-toggler").length) {
    $(".search-toggler").on("click", function (e) {
      e.preventDefault();
      $(".search-popup").toggleClass("active");
      $(".mobile-nav__wrapper").removeClass("expanded");
      $("body").toggleClass("locked");
    });
  }
  if ($(".event-register-toggler").length) {
    $(".event-register-toggler").on("click", function (e) {
      e.preventDefault();
      const modal = $($(this).data("modal-target"));
      if (!modal.length) return;
      const tier = $(this).data("tier");
      if (tier) {
        modal.find('select[name="tier"]').val(tier);
      }
      modal.addClass("active");
      $("body").addClass("locked");
    });
  }
  $(document).on(
    "click",
    ".event-register-modal__close, .event-register-modal__overlay",
    function () {
      $(this).closest(".event-register-modal").removeClass("active");
      $("body").removeClass("locked");
    }
  );

  const submitEventFormAsMailto = function (form, subject, fields) {
    const lines = fields.map(function (item) {
      return item.label + ": " + (form.find('[name="' + item.name + '"]').val() || "");
    });
    const body =
      "Hello AfrONet,\n\nI would like to submit the following for the 6th African Organic Conference (6AOC), 1-4 December 2026, Chongwe, Lusaka, Zambia:\n\n" +
      lines.join("\n") +
      "\n\nThank you!";
    const mailto =
      "mailto:mgeta.daud@afronet.bio?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body);
    window.location.href = mailto;
    form.closest(".event-register-modal").removeClass("active");
    $("body").removeClass("locked");
  };

  if ($("#event-register-form").length) {
    $("#event-register-form").on("submit", function (e) {
      e.preventDefault();
      const form = $(this);
      const tier = form.find('[name="tier"]').val() || "General";
      submitEventFormAsMailto(form, "6AOC Registration — " + tier, [
        { name: "name", label: "Name" },
        { name: "email", label: "Email" },
        { name: "organisation", label: "Organisation" },
        { name: "country", label: "Country" },
        { name: "participation", label: "Participation" },
        { name: "category", label: "Category" },
        { name: "tier", label: "Registration Tier" },
      ]);
    });
  }

  if ($("#event-exhibit-form").length) {
    $("#event-exhibit-form").on("submit", function (e) {
      e.preventDefault();
      submitEventFormAsMailto($(this), "6AOC Exhibition Space Reservation", [
        { name: "name", label: "Name" },
        { name: "email", label: "Email" },
        { name: "organisation", label: "Organisation" },
        { name: "country", label: "Country" },
        { name: "showcase", label: "Products/Services to showcase" },
      ]);
    });
  }

  if ($("#event-sideevent-form").length) {
    $("#event-sideevent-form").on("submit", function (e) {
      e.preventDefault();
      submitEventFormAsMailto($(this), "6AOC Side Event Proposal", [
        { name: "name", label: "Name" },
        { name: "email", label: "Email" },
        { name: "organisation", label: "Organisation" },
        { name: "country", label: "Country" },
        { name: "topic", label: "Proposed topic/focus" },
        { name: "day", label: "Preferred day" },
      ]);
    });
  }

  if ($(".mini-cart__toggler").length) {
    $(".mini-cart__toggler").on("click", function (e) {
      e.preventDefault();
      $(".mini-cart").toggleClass("expanded");
      $(".mobile-nav__wrapper").removeClass("expanded");
      $("body").toggleClass("locked");
    });
  }
  if ($(".odometer").length) {
    $(".odometer").appear(function (e) {
      var odo = $(".odometer");
      odo.each(function () {
        var countNumber = $(this).attr("data-count");
        $(this).html(countNumber);
      });
    });
  }

  if ($(".wow").length) {
    var wow = new WOW({
      boxClass: "wow", // animated element css class (default is wow)
      animateClass: "animated", // animation css class (default is animated)
      mobile: true, // trigger animations on mobile devices (default is true)
      live: true // act on asynchronously loaded content (default is true)
    });
    wow.init();
  }

  if ($("#donate-amount__predefined").length) {
    let donateInput = $("#donate-amount");
    $("#donate-amount__predefined")
      .find("li")
      .on("click", function (e) {
        e.preventDefault();
        let amount = $(this).find("a").text();
        donateInput.val(amount);
        $("#donate-amount__predefined").find("li").removeClass("active");
        $(this).addClass("active");
      });
  }

  //accrodion
  if ($(".grdeen-accrodion").length) {
    var accrodionGrp = $(".grdeen-accrodion");
    accrodionGrp.each(function () {
      var accrodionName = $(this).data("grp-name");
      var Self = $(this);
      var accordion = Self.find(".accrodion");
      Self.addClass(accrodionName);
      Self.find(".accrodion .accrodion-content").hide();
      Self.find(".accrodion.active").find(".accrodion-content").show();
      accordion.each(function () {
        $(this)
          .find(".accrodion-title")
          .on("click", function () {
            if ($(this).parent().hasClass("active") === false) {
              $(".grdeen-accrodion." + accrodionName)
                .find(".accrodion")
                .removeClass("active");
              $(".grdeen-accrodion." + accrodionName)
                .find(".accrodion")
                .find(".accrodion-content")
                .slideUp();
              $(this).parent().addClass("active");
              $(this).parent().find(".accrodion-content").slideDown();
            }
          });
      });
    });
  }

  $(".add").on("click", function () {
    if ($(this).prev().val() < 999) {
      $(this)
        .prev()
        .val(+$(this).prev().val() + 1);
    }
  });

  $(".sub").on("click", function () {
    if ($(this).next().val() > 0) {
      if ($(this).next().val() > 0)
        $(this)
        .next()
        .val(+$(this).next().val() - 1);
    }
  });

  if ($(".tabs-box").length) {
    $(".tabs-box .tab-buttons .tab-btn").on("click", function (e) {
      e.preventDefault();
      var target = $($(this).attr("data-tab"));

      if ($(target).is(":visible")) {
        return false;
      } else {
        target
          .parents(".tabs-box")
          .find(".tab-buttons")
          .find(".tab-btn")
          .removeClass("active-btn");
        $(this).addClass("active-btn");
        target
          .parents(".tabs-box")
          .find(".tabs-content")
          .find(".tab")
          .fadeOut(0);
        target
          .parents(".tabs-box")
          .find(".tabs-content")
          .find(".tab")
          .removeClass("active-tab");
        $(target).fadeIn(300);
        $(target).addClass("active-tab");
      }
    });
  }

  if ($(".range-slider-price").length) {
    var priceRange = document.getElementById("range-slider-price");

    noUiSlider.create(priceRange, {
      start: [30, 150],
      limit: 200,
      behaviour: "drag",
      connect: true,
      range: {
        min: 10,
        max: 200
      }
    });

    var limitFieldMin = document.getElementById("min-value-rangeslider");
    var limitFieldMax = document.getElementById("max-value-rangeslider");

    priceRange.noUiSlider.on("update", function (values, handle) {
      (handle ? $(limitFieldMax) : $(limitFieldMin)).text(values[handle]);
    });
  }

  function thmOwlInit() {
    // owl slider
    let grdeenowlCarousel = $(".grdeen-owl__carousel");
    if (grdeenowlCarousel.length) {
      grdeenowlCarousel.each(function () {
        let elm = $(this);
        let options = elm.data("owl-options");
        let thmOwlCarousel = elm.owlCarousel(
          "object" === typeof options ? options : JSON.parse(options)
        );
        elm.find("button").each(function () {
          $(this).attr("aria-label", "carousel button");
        });
      });
    }
    let grdeenowlCarouselNav = $(".grdeen-owl__carousel--custom-nav");
    if (grdeenowlCarouselNav.length) {
      grdeenowlCarouselNav.each(function () {
        let elm = $(this);
        let owlNavPrev = elm.data("owl-nav-prev");
        let owlNavNext = elm.data("owl-nav-next");
        $(owlNavPrev).on("click", function (e) {
          elm.trigger("prev.owl.carousel");
          e.preventDefault();
        });

        $(owlNavNext).on("click", function (e) {
          elm.trigger("next.owl.carousel");
          e.preventDefault();
        });
      });
    }
  }

  function thmTinyInit() {
    // tiny slider
    const tinyElm = document.querySelectorAll(".thm-tiny__slider");
    tinyElm.forEach(function (tinyElm) {
      const tinyOptions = JSON.parse(tinyElm.dataset.tinyOptions);
      let thmTinySlider = tns(tinyOptions);
    });
  }

  /*-- Handle Scrollbar --*/
  function handleScrollbar() {
    const bodyHeight = $("body").height();
    const scrollPos = $(window).innerHeight() + $(window).scrollTop();
    let percentage = (scrollPos / bodyHeight) * 100;
    if (percentage > 100) {
      percentage = 100;
    }
    $(".scroll-to-top .scroll-to-top__inner").css("width", percentage + "%");
  }

  /*-- One Page Menu --*/
  function SmoothMenuScroll() {
    var anchor = $(".scrollToLink");
    if (anchor.length) {
      anchor.children("a").bind("click", function (event) {
        if ($(window).scrollTop() > 10) {
          var headerH = "0";
        } else {
          var headerH = "0";
        }
        var target = $(this);
        $("html, body")
          .stop()
          .animate({
              scrollTop: $(target.attr("href")).offset().top - headerH + "px"
            },
            900,
            "easeInOutExpo"
          );
        anchor.removeClass("current");
        anchor.removeClass("current-menu-ancestor");
        anchor.removeClass("current_page_item");
        anchor.removeClass("current-menu-parent");
        target.parent().addClass("current");
        event.preventDefault();
      });
    }
  }
  SmoothMenuScroll();

  function OnePageMenuScroll() {
    var windscroll = $(window).scrollTop();
    if (windscroll >= 117) {
      var menuAnchor = $(".one-page-scroll-menu .scrollToLink").children("a");
      menuAnchor.each(function () {
        var sections = $(this).attr("href");
        $(sections).each(function () {
          if ($(this).offset().top <= windscroll + 100) {
            var Sectionid = $(sections).attr("id");
            $(".one-page-scroll-menu").find("li").removeClass("current");
            $(".one-page-scroll-menu")
              .find("li")
              .removeClass("current-menu-ancestor");
            $(".one-page-scroll-menu")
              .find("li")
              .removeClass("current_page_item");
            $(".one-page-scroll-menu")
              .find("li")
              .removeClass("current-menu-parent");
            $(".one-page-scroll-menu")
              .find("a[href*=\\#" + Sectionid + "]")
              .parent()
              .addClass("current");
          }
        });
      });
    } else {
      $(".one-page-scroll-menu li.current").removeClass("current");
      $(".one-page-scroll-menu li:first").addClass("current");
    }
  }

  // window scroll event
  function stickyMenuUpScroll($targetMenu, $toggleClass) {
    var lastScrollTop = 0;
    window.addEventListener(
      "scroll",
      function () {
        var st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > 500) {
          if (st > lastScrollTop) {
            // downscroll code
            $targetMenu.removeClass($toggleClass);
            // console.log("down");
          } else {
            // upscroll code
            $targetMenu.addClass($toggleClass);
            // console.log("up");
          }
        } else {
          $targetMenu.removeClass($toggleClass);
        }
        lastScrollTop = st;
      },
      false
    );
  }
  stickyMenuUpScroll($(".sticky-header--normal"), "active");

  //Strech Column
  function grdeen_stretch() {
    var i = $(window).width();
    $(".row .grdeen-stretch-element-inside-column").each(function () {
      var $this = $(this),
        row = $this.closest(".row"),
        cols = $this.closest('[class^="col-"]'),
        colsheight = $this.closest('[class^="col-"]').height(),
        rect = this.getBoundingClientRect(),
        l = row[0].getBoundingClientRect(),
        s = cols[0].getBoundingClientRect(),
        r = rect.left,
        d = i - rect.right,
        c = l.left + (parseFloat(row.css("padding-left")) || 0),
        u = i - l.right + (parseFloat(row.css("padding-right")) || 0),
        p = s.left,
        f = i - s.right,
        styles = {
          "margin-left": 0,
          "margin-right": 0
        };
      if (Math.round(c) === Math.round(p)) {
        var h = parseFloat($this.css("margin-left") || 0);
        styles["margin-left"] = h - r;
      }
      if (Math.round(u) === Math.round(f)) {
        var w = parseFloat($this.css("margin-right") || 0);
        styles["margin-right"] = w - d;
      }
      $this.css(styles);
    });
  }
  grdeen_stretch();

  function grdeen_cuved_circle() {
    let circleTypeElm = $(".curved-circle__item");
    if (circleTypeElm.length) {
      circleTypeElm.each(function () {
        let elm = $(this);
        let options = elm.data("circle-text-options");
        elm.circleType(
          "object" === typeof options ? options : JSON.parse(options)
        );
      });
    }
  }

  /*-- Price Range --*/
  function priceFilter() {
    if ($(".price-ranger").length) {
      $(".price-ranger #slider-range").slider({
        range: true,
        min: 50,
        max: 1000,
        values: [11, 500],
        slide: function (event, ui) {
          $(".price-ranger .ranger-min-max-block .min").val("$" + ui.values[0]);
          $(".price-ranger .ranger-min-max-block .max").val("$" + ui.values[1]);
        }
      });
      $(".price-ranger .ranger-min-max-block .min").val(
        "$" + $(".price-ranger #slider-range").slider("values", 0)
      );
      $(".price-ranger .ranger-min-max-block .max").val(
        "$" + $(".price-ranger #slider-range").slider("values", 1)
      );
    }
  }

  // window load event

  $(window).on("load", function () {
    if ($(".preloader").length) {
      $(".preloader").fadeOut();
    }
    thmOwlInit();
    thmTinyInit();
    priceFilter();

    if ($(".circle-progress").length) {
      $(".circle-progress").appear(function () {
        let circleProgress = $(".circle-progress");
        circleProgress.each(function () {
          let progress = $(this);
          let progressOptions = progress.data("options");
          progress.circleProgress(progressOptions);
        });
      });
    }
    if ($(".masonry-layout").length) {
      $(".masonry-layout").imagesLoaded(function () {
        $(".masonry-layout").isotope({
          layoutMode: "masonry"
        });
      });
    }
    if ($(".fitRow-layout").length) {
      $(".fitRow-layout").imagesLoaded(function () {
        $(".fitRow-layout").isotope({
          layoutMode: "fitRows"
        });
      });
    }

    if ($(".post-filter").length) {
      var postFilterList = $(".post-filter li");
      // for first init
      $(".filter-layout").isotope({
        filter: ".filter-item",
        animationOptions: {
          duration: 500,
          easing: "linear",
          queue: false
        }
      });
      // on click filter links
      postFilterList.on("click", function () {
        var Self = $(this);
        var selector = Self.attr("data-filter");
        postFilterList.removeClass("active");
        Self.addClass("active");

        $(".filter-layout").isotope({
          filter: selector,
          animationOptions: {
            duration: 500,
            easing: "linear",
            queue: false
          }
        });
        return false;
      });
    }

    if ($(".post-filter.has-dynamic-filter-counter").length) {
      // var allItem = $('.single-filter-item').length;

      var activeFilterItem = $(".post-filter.has-dynamic-filter-counter").find(
        "li"
      );

      activeFilterItem.each(function () {
        var filterElement = $(this).data("filter");
        var count = $(".filter-layout").find(filterElement).length;
        $(this).append("<sup>[" + count + "]</sup>");
      });
    }

    grdeen_cuved_circle();
  });

  $(window).on("scroll", function () {
    OnePageMenuScroll();
    handleScrollbar();
    if ($(".sticky-header--one-page").length) {
      var headerScrollPos = 130;
      var stricky = $(".sticky-header--one-page");
      if ($(window).scrollTop() > headerScrollPos) {
        stricky.addClass("active");
      } else if ($(this).scrollTop() <= headerScrollPos) {
        stricky.removeClass("active");
      }
    }

    var scrollToTopBtn = ".scroll-to-top";
    if (scrollToTopBtn.length) {
      if ($(window).scrollTop() > 500) {
        $(scrollToTopBtn).addClass("show");
      } else {
        $(scrollToTopBtn).removeClass("show");
      }
    }
  });

  $(window).on("resize", function () {
    grdeen_stretch();
  });

  /*-- 6AOC nav cloud tooltip: remember dismissal, allow hover to peek again --*/
  (function () {
    var STORAGE_KEY = "afronetNavCloudDismissed";
    var dismissed = false;
    try {
      dismissed = localStorage.getItem(STORAGE_KEY) === "1";
    } catch (e) {}
    if (dismissed) {
      $(".nav-cloud-tip").addClass("is-dismissed");
    }
    $(document).on("click", ".nav-cloud-tip__close", function (e) {
      e.preventDefault();
      e.stopPropagation();
      $(this).closest(".nav-cloud-tip").addClass("is-dismissed");
      this.blur();
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch (e) {}
    });
  })();

  /*-- News listing: client-side category filter + pagination --*/
  (function () {
    var $grid = $("#newsGrid");
    if (!$grid.length) return;

    var PER_PAGE = 6;
    var $cards = $grid.children("[data-cats]");
    var $filters = $("#newsFilters");
    var $pagination = $("#newsPagination");
    var $empty = $("#newsEmpty");

    var activeFilter = "all";
    var currentPage = 1;

    function getUrlPage() {
      var match = /[?&]page=(\d+)/.exec(window.location.search);
      return match ? parseInt(match[1], 10) : 1;
    }

    function matches($card) {
      if (activeFilter === "all") return true;
      var cats = ($card.attr("data-cats") || "").split(/\s+/);
      return cats.indexOf(activeFilter) !== -1;
    }

    function updateUrl() {
      var url = window.location.pathname;
      if (currentPage > 1) url += "?page=" + currentPage;
      window.history.replaceState(null, "", url);
    }

    function renderPagination(totalPages) {
      $pagination.empty();
      if (totalPages <= 1) return;

      if (currentPage > 1) {
        $('<button type="button" class="prev" aria-label="Previous page"><i class="fas fa-angle-up"></i></button>')
          .data("page", currentPage - 1)
          .appendTo($pagination);
      }
      for (var i = 1; i <= totalPages; i++) {
        $("<button></button>")
          .attr("type", "button")
          .toggleClass("current", i === currentPage)
          .text(i)
          .data("page", i)
          .appendTo($pagination);
      }
      if (currentPage < totalPages) {
        $('<button type="button" class="next" aria-label="Next page"><i class="fas fa-angle-up"></i></button>')
          .data("page", currentPage + 1)
          .appendTo($pagination);
      }
    }

    function applyState(scroll) {
      var matched = $cards.filter(function () {
        return matches($(this));
      });
      var totalPages = Math.max(1, Math.ceil(matched.length / PER_PAGE));
      if (currentPage > totalPages) currentPage = totalPages;
      if (currentPage < 1) currentPage = 1;

      $cards.addClass("is-hidden");
      matched.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE).removeClass("is-hidden");

      $empty.toggle(matched.length === 0);
      renderPagination(totalPages);
      updateUrl();

      if (scroll) {
        var top = $grid.offset().top - 120;
        $("html, body").animate({ scrollTop: top }, 400);
      }
    }

    $filters.on("click", ".news-filter__btn", function () {
      var $btn = $(this);
      if ($btn.hasClass("is-active")) return;
      $filters.find(".news-filter__btn").removeClass("is-active").attr("aria-pressed", "false");
      $btn.addClass("is-active").attr("aria-pressed", "true");
      activeFilter = $btn.data("filter");
      currentPage = 1;
      applyState(false);
    });

    $pagination.on("click", "button", function () {
      currentPage = $(this).data("page");
      applyState(true);
    });

    currentPage = getUrlPage();
    applyState(false);
  })();

  /*-- 6AOC countdown: top bar phases (Early Bird -> Regular -> event -> live -> hidden) and countdown boxes --*/
  (function () {
    // Key dates, all in Lusaka time (UTC+02:00) so every visitor sees the same countdown
    var EARLY_BIRD_END = Date.parse("2026-10-25T23:59:59+02:00");
    var REGULAR_END = Date.parse("2026-11-25T23:59:59+02:00");
    var EVENT_START = Date.parse("2026-12-01T08:00:00+02:00");
    var EVENT_END = Date.parse("2026-12-04T18:00:00+02:00");
    var LUSAKA_OFFSET_MS = 2 * 60 * 60 * 1000;

    var bar = document.getElementById("aoc-countdown-bar");
    var counters = document.querySelectorAll(".aoc-hero-countdown");
    var registrationOnly = document.querySelectorAll("[data-aoc-registration-only]");
    if (!bar && !counters.length) return;
    // Where the bar sends people while registration is open (set per page)
    var registerHref = (bar && bar.getAttribute("data-register-href")) || "#fees";

    // Testing only: ?aocnow=2026-10-25T10:00:00%2B02:00 pretends the page opened at that moment
    var clockShift = 0;
    var simulated = /[?&]aocnow=([^&]+)/.exec(window.location.search);
    if (simulated) {
      var simulatedTime = Date.parse(decodeURIComponent(simulated[1]));
      if (!isNaN(simulatedTime)) clockShift = simulatedTime - Date.now();
    }
    function now() {
      return Date.now() + clockShift;
    }

    function pad(n) {
      return (n < 10 ? "0" : "") + n;
    }
    // Whole seconds left, rounded up, so a phase switches exactly when it reaches zero
    function timeLeft(ms) {
      var total = Math.max(0, Math.ceil(ms / 1000));
      return {
        d: Math.floor(total / 86400),
        h: Math.floor((total % 86400) / 3600),
        m: Math.floor((total % 3600) / 60),
        s: total % 60
      };
    }
    // Calendar day in Lusaka, e.g. "2026-10-25"
    function lusakaDay(t) {
      return new Date(t + LUSAKA_OFFSET_MS).toISOString().slice(0, 10);
    }

    var BAR_LABELS = {
      early: t("Early Bird ends"),
      regular: t("Regular registration ends"),
      event: t("6AOC starts")
    };

    function renderBar(phase, at, target) {
      if (phase === "done") {
        bar.hidden = true;
        return;
      }
      bar.hidden = false;
      bar.className = "aoc-countdown-bar aoc-countdown-bar--" + phase;
      var canRegister = phase === "early" || phase === "regular";
      if (canRegister) bar.setAttribute("href", registerHref);
      else bar.removeAttribute("href");

      if (phase === "live") {
        bar.textContent = t("Happening now in Chongwe, Lusaka, Zambia");
        return;
      }
      var left = timeLeft(target - at);
      var today = lusakaDay(at) === lusakaDay(target);
      var time = (today ? "" : left.d + t("d") + " ") + pad(left.h + (today ? left.d * 24 : 0)) + t("h") + " " + pad(left.m) + t("m") + " " + pad(left.s) + t("s");
      bar.classList.toggle("is-today", today);
      bar.innerHTML = BAR_LABELS[phase] + (today ? t(" TODAY · ") : t(" in ")) +
        '<span class="aoc-countdown-bar__time">' + time + "</span>" +
        (canRegister ? ' <span class="aoc-countdown-bar__cta">' + t("Register now") + ' <span class="aoc-countdown-bar__arrow" aria-hidden="true">→</span></span>' : "");
    }

    function renderCounter(counter, phase, at) {
      var boxes = counter.querySelector(".aoc-hero-countdown__boxes");
      var message = counter.querySelector(".aoc-hero-countdown__message");
      var counting = phase === "early" || phase === "regular" || phase === "event";
      boxes.hidden = !counting;
      message.hidden = counting;
      if (counting) {
        var left = timeLeft(EVENT_START - at);
        boxes.querySelector('[data-unit="d"]').textContent = left.d;
        boxes.querySelector('[data-unit="h"]').textContent = pad(left.h);
        boxes.querySelector('[data-unit="m"]').textContent = pad(left.m);
        boxes.querySelector('[data-unit="s"]').textContent = pad(left.s);
      } else {
        message.textContent = phase === "live"
          ? t("Happening now in Chongwe, Lusaka, Zambia")
          : t("Thank you for joining the 6th African Organic Conference");
      }
    }

    function tick() {
      var at = now();
      var phase, target;
      if (at < EARLY_BIRD_END) { phase = "early"; target = EARLY_BIRD_END; }
      else if (at < REGULAR_END) { phase = "regular"; target = REGULAR_END; }
      else if (at < EVENT_START) { phase = "event"; target = EVENT_START; }
      else if (at < EVENT_END) { phase = "live"; target = EVENT_END; }
      else { phase = "done"; target = null; }

      if (bar) renderBar(phase, at, target);
      for (var i = 0; i < counters.length; i++) renderCounter(counters[i], phase, at);
      // Register buttons and similar disappear once registration has closed
      var open = phase === "early" || phase === "regular";
      for (var j = 0; j < registrationOnly.length; j++) registrationOnly[j].hidden = !open;

      // Next update just after the next whole second, so the display never drifts
      window.setTimeout(tick, 1000 - (now() % 1000) + 20);
    }

    tick();
  })();

  /*-- Event sub-menu: swipe progress bar, filled to the share of links seen so far --*/
  (function () {
    var list = document.querySelector(".event-subnav__list");
    var nav = list && list.closest(".event-subnav");
    if (!nav || !nav.querySelector(".event-subnav__progress")) return;

    var ticking = false;
    function update() {
      ticking = false;
      var max = list.scrollWidth - list.clientWidth;
      if (max <= 1) {
        nav.classList.remove("is-scrollable");
        return;
      }
      nav.classList.add("is-scrollable");
      var seen = (list.scrollLeft + list.clientWidth) / list.scrollWidth;
      nav.style.setProperty("--subnav-progress", Math.min(1, seen).toFixed(4));
    }
    function requestUpdate() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }

    list.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("load", requestUpdate);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(requestUpdate);
    update();
  })();

  /*-- Promo popups: shown one after another; each poster comes back once a day after it was closed --*/
  (function () {
    var RESHOW_AFTER_MS = 24 * 60 * 60 * 1000;

    function keyOf(el) {
      return $(el).data("storage-key") || "afronet6aocPosterPopupDismissed";
    }
    // Stores the time the poster was closed; older "1" flags read as long expired, so those visitors see it again
    function isDismissed(el) {
      try {
        var closedAt = parseInt(localStorage.getItem(keyOf(el)), 10);
        return closedAt > 0 && Date.now() - closedAt < RESHOW_AFTER_MS;
      } catch (e) {
        return false;
      }
    }
    function markDismissed(el) {
      try {
        localStorage.setItem(keyOf(el), String(Date.now()));
      } catch (e) {}
    }

    var queue = $(".promo-popup").filter(function () {
      return !isDismissed(this);
    }).toArray();
    if (!queue.length) return;

    var $current = null;

    function openNext() {
      var next = queue.shift();
      if (!next) return;
      $current = $(next).addClass("is-open");
    }

    // Close the open popup and, after a short pause, show the next one (if any)
    function closeCurrent() {
      if (!$current) return;
      markDismissed($current[0]);
      $current.removeClass("is-open");
      $current = null;
      setTimeout(openNext, 400);
    }

    setTimeout(openNext, 2500);

    $(queue).on("click", ".promo-popup__close, .promo-popup__overlay", function (e) {
      e.preventDefault();
      closeCurrent();
    });

    $(queue).on("click", ".promo-popup__content", function (e) {
      var hasLink = $(this).find(".promo-popup__poster-link").length > 0;
      if (!hasLink || e.target === this) closeCurrent();
    });

    // Following a poster link: remember it and stop the sequence, the browser navigates away
    $(queue).on("click", ".promo-popup__poster-link", function () {
      markDismissed($(this).closest(".promo-popup")[0]);
      queue.length = 0;
    });

    $(document).on("keydown", function (e) {
      if ((e.key === "Escape" || e.keyCode === 27) && $current) {
        closeCurrent();
      }
    });
  })();

  /*-- Language switcher + a one-time suggestion when the browser prefers a language this page is available in --*/
  (function () {
    var CHOICE_KEY = "afronetLanguage";
    var SUGGEST = {
      fr: { text: "Cette page est disponible en français.", link: "Voir en français", close: "Fermer" },
      pt: { text: "Esta página está disponível em português.", link: "Ver em português", close: "Fechar" },
      sw: { text: "Ukurasa huu unapatikana kwa Kiswahili.", link: "Soma kwa Kiswahili", close: "Funga" }
    };

    function store(value) {
      try { localStorage.setItem(CHOICE_KEY, value); } catch (e) {}
    }
    function stored() {
      try { return localStorage.getItem(CHOICE_KEY); } catch (e) { return null; }
    }

    // The globe button only opens the list (the mobile menu adds its own toggle button)
    $(document).on("click", ".main-menu__lang > a", function (e) {
      e.preventDefault();
    });
    // Picking a language from the list remembers it, so we never suggest another one
    $(document).on("click", ".main-menu__lang ul a", function () {
      store($(this).attr("hreflang") || "");
    });

    var pageLang = (document.documentElement.lang || "en").slice(0, 2);
    if (pageLang !== "en" || stored()) return;
    var wanted = [];
    (navigator.languages || [navigator.language || ""]).forEach(function (l) {
      wanted.push(String(l).slice(0, 2).toLowerCase());
    });
    var target = null;
    for (var i = 0; i < wanted.length && !target; i++) {
      if (wanted[i] === "en") return;
      if (SUGGEST[wanted[i]]) {
        var alt = document.querySelector('link[rel="alternate"][hreflang="' + wanted[i] + '"]');
        if (alt) target = { lang: wanted[i], href: alt.getAttribute("href") };
      }
    }
    if (!target) return;

    var s = SUGGEST[target.lang];
    var bar = document.createElement("div");
    bar.className = "lang-suggest";
    bar.setAttribute("lang", target.lang);
    bar.setAttribute("role", "region");
    bar.setAttribute("aria-label", s.text);
    bar.innerHTML = '<span class="lang-suggest__text">' + s.text + "</span>" +
      '<a class="lang-suggest__link" hreflang="' + target.lang + '"></a>' +
      '<button type="button" class="lang-suggest__close" aria-label="' + s.close + '"><span aria-hidden="true">&times;</span></button>';
    var link = bar.querySelector(".lang-suggest__link");
    link.href = target.href.replace(/^https?:\/\/[^/]+/, "");
    link.textContent = s.link + " →";
    link.addEventListener("click", function () { store(target.lang); });
    bar.querySelector(".lang-suggest__close").addEventListener("click", function () {
      store("en");
      bar.remove();
    });
    document.body.appendChild(bar);
  })();
})(jQuery);