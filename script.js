const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const mobileNav = document.querySelector("[data-mobile-nav]");
const year = document.querySelector("[data-year]");
const navLinks = Array.from(document.querySelectorAll(".desktop-nav a"));
const mobileLinks = Array.from(document.querySelectorAll(".mobile-nav a"));
const sections = Array.from(document.querySelectorAll("[data-section]"));
const reveals = Array.from(document.querySelectorAll(".reveal"));

if (year) {
  year.textContent = new Date().getFullYear();
}

const closeMenu = () => {
  if (!menuButton || !mobileNav) return;
  menuButton.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  mobileNav.classList.remove("is-open");
};

if (menuButton && mobileNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    mobileNav.classList.toggle("is-open", isOpen);
  });

  mobileLinks.forEach((link) => link.addEventListener("click", closeMenu));
}

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 16);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
);

reveals.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  revealObserver.observe(element);
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute("id");
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
      });
    });
  },
  { threshold: 0.36 }
);

sections.forEach((section) => sectionObserver.observe(section));
