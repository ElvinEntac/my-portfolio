
document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation menu
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the menu after choosing a section
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Animate sections when they appear on screen
  const items = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    items.forEach((item) => observer.observe(item));
  } else {
    items.forEach((item) => item.classList.add("visible"));
  }

  // Automatically update the footer year
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Contact form (demo only)
  const form = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");
  const contactSection = document.getElementById("contact");

  if (form && formMessage) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const name = document.getElementById("name").value.trim();

      formMessage.textContent =
        `Thanks, ${name || "there"}! This demo does not send emails yet.`;

      form.reset();

      // Keep the page at the contact section
      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: "auto",
          block: "start"
        });
      }
    });
  }
});
