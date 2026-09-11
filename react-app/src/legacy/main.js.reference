/* ==========================================================================
   GHLevelUp - site behaviour
   No dependencies. Safe to inline into a GoHighLevel custom-code block.
   --------------------------------------------------------------------------
     1. Sticky header shadow
     2. Mobile navigation
     3. Active nav link
     4. FAQ accordion
     5. Reveal on scroll
     6. Footer year
     7. GHL embed height guard
   ========================================================================== */

(function () {
  "use strict";

  var onReady = function (fn) {
    if (document.readyState !== "loading") { fn(); }
    else { document.addEventListener("DOMContentLoaded", fn); }
  };

  onReady(function () {

    /* 1. Sticky header ---------------------------------------------------- */
    var header = document.querySelector(".site-header");

    if (header) {
      // Expose the real header height so the mobile menu can sit right below it.
      var setHeaderH = function () {
        document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");
      };
      setHeaderH();
      window.addEventListener("resize", setHeaderH);

      var onScroll = function () {
        header.classList.toggle("is-stuck", window.scrollY > 8);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }


    /* 2. Mobile navigation ------------------------------------------------ */
    var toggle = document.querySelector(".nav__toggle");
    var links  = document.querySelector(".nav__links");

    if (toggle && links) {
      // The accessible name tracks the open/closed state.
      var setMenu = function (open) {
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
        links.classList.toggle("is-open", open);
      };

      toggle.addEventListener("click", function () {
        setMenu(toggle.getAttribute("aria-expanded") !== "true");
      });

      // Close after tapping a link, and on Escape.
      links.addEventListener("click", function (e) {
        if (e.target.closest("a")) { setMenu(false); }
      });

      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") { setMenu(false); }
      });

      // Reset when crossing back to the desktop breakpoint.
      window.addEventListener("resize", function () {
        if (window.innerWidth > 900) { setMenu(false); }
      });
    }


    /* 3. Active nav link -------------------------------------------------- */
    // Marks the current page in the nav without each page hard-coding it.
    var here = (location.pathname.split("/").pop() || "index.html").toLowerCase();

    document.querySelectorAll(".nav__link").forEach(function (link) {
      var target = (link.getAttribute("href") || "").split("/").pop().split("#")[0].toLowerCase();
      if (target && target === here) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      }
    });


    /* 4. FAQ accordion ---------------------------------------------------- */
    document.querySelectorAll(".faq__q").forEach(function (btn) {
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      if (!panel) { return; }

      btn.addEventListener("click", function () {
        var isOpen = btn.getAttribute("aria-expanded") === "true";

        // One panel open at a time, within this accordion only.
        var group = btn.closest(".faq");
        if (group) {
          group.querySelectorAll(".faq__q[aria-expanded='true']").forEach(function (other) {
            if (other === btn) { return; }
            other.setAttribute("aria-expanded", "false");
            var otherPanel = document.getElementById(other.getAttribute("aria-controls"));
            if (otherPanel) { otherPanel.style.maxHeight = null; }
          });
        }

        btn.setAttribute("aria-expanded", String(!isOpen));
        panel.style.maxHeight = isOpen ? null : panel.scrollHeight + "px";
      });
    });

    // Keep an open panel correctly sized if the text reflows.
    window.addEventListener("resize", function () {
      document.querySelectorAll(".faq__q[aria-expanded='true']").forEach(function (btn) {
        var panel = document.getElementById(btn.getAttribute("aria-controls"));
        if (panel) { panel.style.maxHeight = panel.scrollHeight + "px"; }
      });
    });


    /* 5. Reveal on scroll ------------------------------------------------- */
    var revealables = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      revealables.forEach(function (el) { el.classList.add("is-in"); });
    } else {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) { return; }
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

      revealables.forEach(function (el, i) {
        // Small stagger so grids cascade instead of popping in together.
        el.style.transitionDelay = (i % 4) * 70 + "ms";
        observer.observe(el);
      });
    }


    /* 6. Footer year ------------------------------------------------------ */
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });


    /* 7. GHL embed height guard ------------------------------------------- */
    // GoHighLevel's form_embed.js posts a resize message and rewrites the
    // iframe height. If it is blocked or slow, the inline height:100% on the
    // form snippet collapses to nothing - so hold a sensible floor until the
    // script reports a real height.
    //
    // Note: this deliberately does NOT read the iframe's own data-height
    // attribute. GHL's snippet reports a generic worst-case value there
    // (1040 for the contact form) that is far taller than the form actually
    // renders at this column width, and using it as a floor is what caused
    // the oversized blank box below the form. Each embed gets its own
    // realistic floor instead, matched to its actual content.
    document.querySelectorAll(".ghl-embed iframe").forEach(function (frame) {
      var floor = frame.closest(".ghl-embed--calendar") ? 760 : 420;

      if (frame.offsetHeight < 80) {
        frame.style.height = floor + "px";
      }
    });

  });
})();
