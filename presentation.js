/**
 * TP1 Diabetic — Professional Reveal.js Enhancements
 * Features: Live clock, slide animations, keyboard shortcuts,
 *           progress tracker, code copy buttons, slide overview panel
 */

(function () {
  "use strict";

  /* ── Wait for Reveal to be ready ─────────────────────── */
  function onRevealReady(cb) {
    if (typeof Reveal !== "undefined" && Reveal.isReady()) {
      cb();
    } else {
      document.addEventListener("DOMContentLoaded", function () {
        if (typeof Reveal !== "undefined") {
          Reveal.addEventListener("ready", cb);
        } else {
          setTimeout(function () { onRevealReady(cb); }, 200);
        }
      });
    }
  }

  /* ══════════════════════════════════════════════════════
     1. LIVE CLOCK + TIMER
  ══════════════════════════════════════════════════════ */
  function initClock() {
    var hud = document.createElement("div");
    hud.id = "tp1-hud";
    hud.style.cssText = [
      "position:fixed",
      "top:14px",
      "left:14px",
      "display:flex",
      "align-items:center",
      "gap:12px",
      "z-index:9999",
      "font-family:'DM Mono',monospace",
      "font-size:11px",
      "color:rgba(56,189,248,0.7)",
      "pointer-events:none",
    ].join(";");

    var clock = document.createElement("span");
    clock.id = "tp1-clock";

    var sep = document.createElement("span");
    sep.textContent = "·";
    sep.style.opacity = "0.4";

    var timer = document.createElement("span");
    timer.id = "tp1-timer";
    timer.title = "Durée de présentation";

    hud.appendChild(clock);
    hud.appendChild(sep);
    hud.appendChild(timer);
    document.body.appendChild(hud);

    var startTime = Date.now();

    function pad(n) { return n < 10 ? "0" + n : n; }

    function tick() {
      var now = new Date();
      clock.textContent =
        pad(now.getHours()) + ":" +
        pad(now.getMinutes()) + ":" +
        pad(now.getSeconds());

      var elapsed = Math.floor((Date.now() - startTime) / 1000);
      var m = Math.floor(elapsed / 60);
      var s = elapsed % 60;
      timer.textContent = pad(m) + ":" + pad(s);
    }

    tick();
    setInterval(tick, 1000);
  }

  /* ══════════════════════════════════════════════════════
     2. CODE COPY BUTTONS
  ══════════════════════════════════════════════════════ */
  function initCopyButtons() {
    document.querySelectorAll(".reveal pre").forEach(function (pre) {
      if (pre.querySelector(".tp1-copy-btn")) return;

      var btn = document.createElement("button");
      btn.className = "tp1-copy-btn";
      btn.innerHTML = "⎘ Copy";
      btn.style.cssText = [
        "position:absolute",
        "top:8px",
        "right:70px",
        "background:rgba(56,189,248,0.12)",
        "border:1px solid rgba(56,189,248,0.3)",
        "color:#38bdf8",
        "font-family:'DM Mono',monospace",
        "font-size:10px",
        "padding:3px 9px",
        "border-radius:5px",
        "cursor:pointer",
        "transition:all 0.2s",
        "z-index:10",
      ].join(";");

      btn.addEventListener("mouseenter", function () {
        btn.style.background = "rgba(56,189,248,0.22)";
      });
      btn.addEventListener("mouseleave", function () {
        btn.style.background = "rgba(56,189,248,0.12)";
      });
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var code = pre.querySelector("code");
        var text = code ? code.innerText : pre.innerText;
        navigator.clipboard.writeText(text).then(function () {
          btn.innerHTML = "✓ Copié!";
          btn.style.color = "#34d399";
          btn.style.borderColor = "#34d399";
          setTimeout(function () {
            btn.innerHTML = "⎘ Copy";
            btn.style.color = "#38bdf8";
            btn.style.borderColor = "rgba(56,189,248,0.3)";
          }, 1800);
        });
      });

      pre.style.position = "relative";
      pre.appendChild(btn);
    });
  }

  /* ══════════════════════════════════════════════════════
     3. SLIDE PROGRESS TRACKER (top bar with step dots)
  ══════════════════════════════════════════════════════ */
  function initProgressDots() {
    var bar = document.createElement("div");
    bar.id = "tp1-progress-bar";
    bar.style.cssText = [
      "position:fixed",
      "top:0",
      "left:0",
      "right:0",
      "height:3px",
      "background:rgba(56,189,248,0.1)",
      "z-index:9998",
    ].join(";");

    var fill = document.createElement("div");
    fill.id = "tp1-progress-fill";
    fill.style.cssText = [
      "height:100%",
      "background:linear-gradient(90deg,#38bdf8,#818cf8)",
      "box-shadow:0 0 12px rgba(56,189,248,0.6)",
      "transition:width 0.35s cubic-bezier(0.4,0,0.2,1)",
      "width:0%",
    ].join(";");

    bar.appendChild(fill);
    document.body.appendChild(bar);

    function updateProgress() {
      if (typeof Reveal === "undefined") return;
      var indices = Reveal.getIndices();
      var total = Reveal.getTotalSlides();
      var current = Reveal.getSlidePastCount() + 1;
      var pct = total > 1 ? ((current - 1) / (total - 1)) * 100 : 100;
      fill.style.width = pct + "%";
    }

    Reveal.addEventListener("slidechanged", updateProgress);
    Reveal.addEventListener("fragmentshown", updateProgress);
    updateProgress();
  }

  /* ══════════════════════════════════════════════════════
     4. KEYBOARD SHORTCUT PANEL  (press '?')
  ══════════════════════════════════════════════════════ */
  function initShortcutPanel() {
    var panel = document.createElement("div");
    panel.id = "tp1-shortcuts";
    panel.style.cssText = [
      "display:none",
      "position:fixed",
      "bottom:60px",
      "right:20px",
      "background:#111827",
      "border:1px solid rgba(56,189,248,0.25)",
      "border-radius:12px",
      "padding:16px 20px",
      "z-index:9999",
      "font-family:'DM Mono',monospace",
      "font-size:11px",
      "color:#94a3b8",
      "box-shadow:0 0 40px rgba(0,0,0,0.6)",
      "min-width:220px",
    ].join(";");

    panel.innerHTML = [
      '<div style="color:#38bdf8;font-weight:600;margin-bottom:10px;font-size:12px;">⌨ Raccourcis</div>',
      shortcut("→ / Space", "Slide suivante"),
      shortcut("← ", "Slide précédente"),
      shortcut("F", "Plein écran"),
      shortcut("S", "Vue Speaker"),
      shortcut("O", "Vue d'ensemble"),
      shortcut("B", "Tableau noir"),
      shortcut("C", "Craie"),
      shortcut("?", "Fermer ce panneau"),
    ].join("");

    document.body.appendChild(panel);

    function shortcut(key, desc) {
      return (
        '<div style="display:flex;justify-content:space-between;gap:24px;margin:4px 0;">' +
        '<span style="color:#38bdf8;">' + key + "</span>" +
        '<span>' + desc + "</span>" +
        "</div>"
      );
    }

    var visible = false;
    document.addEventListener("keydown", function (e) {
      if (
        e.key === "?" &&
        !e.ctrlKey &&
        !e.metaKey &&
        document.activeElement.tagName !== "INPUT" &&
        document.activeElement.tagName !== "TEXTAREA"
      ) {
        visible = !visible;
        panel.style.display = visible ? "block" : "none";
      }
    });
  }

  /* ══════════════════════════════════════════════════════
     5. SECTION TITLE BEAUTIFIER
     Adds animated accent line under section h1 slides
  ══════════════════════════════════════════════════════ */
  function initSectionBeautifier() {
    document.querySelectorAll(".reveal section").forEach(function (section) {
      var children = Array.from(section.children).filter(function (el) {
        return el.tagName !== "ASIDE";
      });

      // Section divider: only has an h1
      if (
        children.length === 1 &&
        children[0].tagName === "H1"
      ) {
        section.classList.add("tp1-section-title");
        section.style.cssText += [
          "display:flex",
          "flex-direction:column",
          "align-items:center",
          "justify-content:center",
          "text-align:center",
        ].join(";");

        // Decorative line
        var line = document.createElement("div");
        line.style.cssText = [
          "width:60px",
          "height:3px",
          "background:linear-gradient(90deg,#38bdf8,#818cf8)",
          "border-radius:2px",
          "margin:12px auto 0",
          "box-shadow:0 0 16px rgba(56,189,248,0.5)",
        ].join(";");
        section.appendChild(line);

        // Subtitle hint
        var hint = document.createElement("p");
        hint.style.cssText = [
          "font-family:'DM Mono',monospace",
          "font-size:0.6em",
          "color:rgba(100,116,139,0.8)",
          "margin-top:16px",
          "letter-spacing:0.15em",
          "text-transform:uppercase",
        ].join(";");
        hint.textContent = "TP1 — Pipeline ITL";
        section.appendChild(hint);
      }
    });
  }

  /* ══════════════════════════════════════════════════════
     6. SLIDE ENTER ANIMATION (particle burst on section change)
  ══════════════════════════════════════════════════════ */
  function initParticleBurst() {
    var canvas = document.createElement("canvas");
    canvas.id = "tp1-particles";
    canvas.style.cssText = [
      "position:fixed",
      "inset:0",
      "pointer-events:none",
      "z-index:1",
    ].join(";");
    document.body.appendChild(canvas);

    var ctx = canvas.getContext("2d");
    var particles = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function burst() {
      var cx = canvas.width / 2;
      var cy = canvas.height / 2;
      for (var i = 0; i < 18; i++) {
        var angle = (Math.PI * 2 * i) / 18 + Math.random() * 0.5;
        var speed = 1.5 + Math.random() * 3;
        particles.push({
          x: cx, y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: 0.025 + Math.random() * 0.02,
          size: 2 + Math.random() * 3,
          color: Math.random() > 0.5 ? "#38bdf8" : "#818cf8",
        });
      }
    }

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter(function (p) { return p.life > 0; });
      particles.forEach(function (p) {
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.life -= p.decay;
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(loop);
    }

    loop();

    Reveal.addEventListener("slidechanged", function () {
      burst();
    });
  }

  /* ══════════════════════════════════════════════════════
     7. STEP COUNTER BADGE (current step / total)
  ══════════════════════════════════════════════════════ */
  function initStepBadge() {
    var badge = document.createElement("div");
    badge.id = "tp1-step-badge";
    badge.style.cssText = [
      "position:fixed",
      "bottom:14px",
      "left:50%",
      "transform:translateX(-50%)",
      "background:rgba(17,24,39,0.9)",
      "border:1px solid rgba(56,189,248,0.2)",
      "border-radius:20px",
      "padding:4px 14px",
      "font-family:'DM Mono',monospace",
      "font-size:10px",
      "color:rgba(56,189,248,0.6)",
      "z-index:9998",
      "backdrop-filter:blur(8px)",
      "pointer-events:none",
    ].join(";");

    document.body.appendChild(badge);

    function update() {
      if (typeof Reveal === "undefined") return;
      var current = Reveal.getSlidePastCount() + 1;
      var total = Reveal.getTotalSlides();
      badge.textContent = current + " / " + total;
    }

    Reveal.addEventListener("slidechanged", update);
    update();
  }

  /* ══════════════════════════════════════════════════════
     8. INIT ALL
  ══════════════════════════════════════════════════════ */
  onRevealReady(function () {
    initClock();
    initProgressDots();
    initCopyButtons();
    initShortcutPanel();
    initSectionBeautifier();
    initParticleBurst();
    initStepBadge();

    // Re-run copy buttons after each slide change (for lazy-rendered slides)
    Reveal.addEventListener("slidechanged", function () {
      setTimeout(initCopyButtons, 200);
    });

    console.log(
      "%cTP1 Diabetic Slides — Loaded ✓",
      "color:#38bdf8;font-family:monospace;font-size:13px;"
    );
  });
})();
