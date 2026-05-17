(() => {
  const root = document.documentElement;
  const body = document.body;
  const cursorLight = document.querySelector(".cursor-light");
  const particlesRoot = document.querySelector(".particles");
  const focusToggle = document.querySelector("[data-focus-toggle]");
  const composer = document.querySelector("#reflection-entry");
  const navLinks = [...document.querySelectorAll(".floating-nav-item")];
  const sections = [...document.querySelectorAll("section[id]")];
  const revealNodes = [...document.querySelectorAll(".reveal")];

  if (particlesRoot) {
    const fragments = document.createDocumentFragment();
    for (let index = 0; index < 10; index += 1) {
      const particle = document.createElement("span");
      const size = `${Math.random() * 10 + 4}px`;
      particle.className = "particle";
      particle.style.setProperty("--size", size);
      particle.style.setProperty("--x", `${Math.random() * 100}%`);
      particle.style.setProperty("--y", `${Math.random() * 100}%`);
      particle.style.setProperty("--duration", `${14 + Math.random() * 12}s`);
      particle.style.setProperty("--delay", `${Math.random() * -12}s`);
      fragments.appendChild(particle);
    }
    particlesRoot.appendChild(fragments);
  }

  const updatePointer = (event) => {
    root.style.setProperty("--pointer-x", `${event.clientX}px`);
    root.style.setProperty("--pointer-y", `${event.clientY}px`);
  };

  const setFocusMode = (enabled) => {
    body.classList.toggle("is-writing", enabled);
    body.classList.toggle("is-focus", enabled);
    if (focusToggle) {
      focusToggle.textContent = enabled ? "Exit focus" : "Focus mode";
    }
  };

  if (cursorLight) {
    window.addEventListener("mousemove", updatePointer, { passive: true });
  }

  if (composer) {
    composer.addEventListener("focus", () => setFocusMode(true));
    composer.addEventListener("blur", () => setFocusMode(false));
  }

  if (focusToggle) {
    focusToggle.addEventListener("click", () => {
      const enabled = !body.classList.contains("is-focus");
      setFocusMode(enabled);
      if (enabled && composer instanceof HTMLTextAreaElement) {
        composer.focus();
      }
    });
  }

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );

    revealNodes.forEach((node) => revealObserver.observe(node));

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const nav = navLinks.find((item) => item.getAttribute("href") === `#${entry.target.id}`);
          if (nav && entry.isIntersecting) {
            navLinks.forEach((item) => item.classList.remove("is-active"));
            nav.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0.2 }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  } else {
    revealNodes.forEach((node) => node.classList.add("is-visible"));
  }

  const timelineItems = [...document.querySelectorAll(".timeline-item")];
  timelineItems.forEach((item) => {
    item.addEventListener("click", () => {
      timelineItems.forEach((candidate) => candidate.classList.remove("is-active"));
      item.classList.add("is-active");
    });
  });
})();

