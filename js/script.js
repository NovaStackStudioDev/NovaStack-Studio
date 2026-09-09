document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      nav.classList.toggle("open");
    });

    document.querySelectorAll(".nav a").forEach(link => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        nav.classList.remove("open");
      });
    });
  }

  // 2. Active Navigation Link Highlighting
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;

    if (
      href === currentPath ||
      (currentPath === "" && href === "index.html") ||
      (currentPath === "index.html" && href === "index.html")
    ) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });

  // 3. Scroll Reveal Animations
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  // 4. Dynamic Footer Year & Sri Lanka Live Clock
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const timeEl = document.getElementById("colombo-time");
  if (timeEl) {
    const updateTime = () => {
      const now = new Date();
      // Format time in Asia/Colombo timezone (UTC+5:30)
      const options = {
        timeZone: "Asia/Colombo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      };
      timeEl.textContent = new Intl.DateTimeFormat("en-US", options).format(now) + " GMT+5:30";
    };
    updateTime();
    setInterval(updateTime, 1000);
  }

  // 5. Cursor Glow Follower
  const glow = document.querySelector(".cursor-glow");
  if (glow) {
    window.addEventListener("pointermove", e => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    });
  }

  // 6. Header Background on Scroll
  const header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        header.style.background = "rgba(8, 9, 11, .92)";
      } else {
        header.style.background = "rgba(8, 9, 11, .75)";
      }
    });
  }

  // 7. Work Filter Tabs (work.html)
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project[data-category]");

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const targetCategory = btn.getAttribute("data-filter");

        projectCards.forEach(card => {
          const categories = card.getAttribute("data-category").split(" ");
          if (targetCategory === "all" || categories.includes(targetCategory)) {
            card.style.display = "block";
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, 50);
          } else {
            card.style.opacity = "0";
            card.style.transform = "translateY(15px)";
            setTimeout(() => {
              card.style.display = "none";
            }, 250);
          }
        });
      });
    });
  }

  // 8. FAQ Accordion Items
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question");
    if (questionBtn) {
      questionBtn.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        // Close other items for single accordion effect
        faqItems.forEach(otherItem => otherItem.classList.remove("open"));
        if (!isOpen) {
          item.classList.add("open");
        }
      });
    }
  });

  // 9. Interactive Contact Form Submission
  const projectForm = document.getElementById("project-inquiry-form");
  const successAlert = document.getElementById("form-success-message");

  if (projectForm) {
    projectForm.addEventListener("submit", e => {
      e.preventDefault();

      // Gather form values
      const submitBtn = projectForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : "Submit Inquiry";

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Sending Inquiry <span>⏳</span>";
      }

      // Simulate sending inquiry
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }

        if (successAlert) {
          successAlert.classList.add("show");
          projectForm.reset();

          // Scroll smoothly to success alert
          successAlert.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
          alert("Thank you! Your project inquiry has been received. We'll be in touch within 24 hours.");
          projectForm.reset();
        }
      }, 900);
    });
  }
});
