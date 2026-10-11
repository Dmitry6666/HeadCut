/* ============ КОНФИГ TELEGRAM ============ */
const TELEGRAM_BOT_TOKEN = "8197485840:AAHpCcGG5MY352ge26qWDsTzVNt5W9zOEj0";
const TELEGRAM_CHAT_ID = "5229948083";

/* ============ КУРСОР ============ */
const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");
let mouseX = 0,
  mouseY = 0;
let followerX = 0,
  followerY = 0;

if (window.matchMedia("(hover: hover)").matches) {
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX - 6 + "px";
    cursor.style.top = mouseY - 6 + "px";
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.left = followerX - 20 + "px";
    follower.style.top = followerY - 20 + "px";
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  const hoverTargets = document.querySelectorAll(
    "a, button, .service-row, .bento-item, .team-card, input, select, textarea",
  );
  hoverTargets.forEach((el) => {
    el.addEventListener("mouseenter", () =>
      document.body.classList.add("cursor-hover"),
    );
    el.addEventListener("mouseleave", () =>
      document.body.classList.remove("cursor-hover"),
    );
  });
}

/* ============ ФИКС КУРСОРА НА КАРТЕ ============ */
const mapWrapper = document.querySelector(".map-wrapper");
if (mapWrapper) {
  mapWrapper.addEventListener("mouseenter", () => {
    document.body.classList.add("cursor-on-map");
  });
  mapWrapper.addEventListener("mouseleave", () => {
    document.body.classList.remove("cursor-on-map");
  });
}

/* ============ ФИКС КУРСОРА НА SELECT ============ */
/* ============ ФИКС КУРСОРА НА SELECT ============ */
document.querySelectorAll("select").forEach((select) => {
  // При наведении мыши — сразу скрываем кастомный курсор
  select.addEventListener("mouseenter", () => {
    document.body.classList.add("cursor-on-select");
  });

  // При уходе мыши с поля — если dropdown закрыт, возвращаем
  select.addEventListener("mouseleave", () => {
    // Небольшая задержка, чтобы не пропадал при движении внутри
    setTimeout(() => {
      if (document.activeElement !== select) {
        document.body.classList.remove("cursor-on-select");
      }
    }, 100);
  });

  // На всякий случай — при клике тоже скрываем
  select.addEventListener("mousedown", () => {
    document.body.classList.add("cursor-on-select");
  });

  // При выборе значения — возвращаем
  select.addEventListener("change", () => {
    document.body.classList.remove("cursor-on-select");
  });

  // Когда поле теряет фокус — возвращаем
  select.addEventListener("blur", () => {
    document.body.classList.remove("cursor-on-select");
  });
  // Страховка: клик где угодно снимает блокировку курсора
  document.addEventListener("click", (e) => {
    if (!e.target.closest("select")) {
      document.body.classList.remove("cursor-on-select");
    }
  });
});

/* ============ HEADER SCROLL ============ */
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
/* ============ ДИНАМИЧЕСКИЙ СТАТУС РАБОТЫ ============ */
(function updateWorkingStatus() {
  const badge = document.getElementById("heroBadge");
  const dot = document.getElementById("heroStatusDot");
  const text = document.getElementById("heroStatusText");
  if (!badge || !dot || !text) return;

  // Часы работы: Пн–Сб 09:00–21:00, Вс — выходной
  const OPEN_HOUR = 9;
  const CLOSE_HOUR = 21;

  function update() {
    const now = new Date();
    const day = now.getDay(); // 0 = Вс, 1 = Пн, ..., 6 = Сб
    const hour = now.getHours();
    const minutes = now.getMinutes();

    // Воскресенье — выходной
    if (day === 0) {
      badge.style.borderColor = "rgba(255, 95, 31, 0.3)";
      dot.style.background = "#ff5f1f";
      dot.style.boxShadow = "0 0 12px #ff5f1f";
      text.textContent = "Сегодня выходной · Откроемся в понедельник в 09:00";
      return;
    }

    const currentTime = hour + minutes / 60;

    // Открыто (Пн–Сб, 09:00–21:00)
    if (currentTime >= OPEN_HOUR && currentTime < CLOSE_HOUR) {
      const hoursLeft = CLOSE_HOUR - hour;
      badge.style.borderColor = "rgba(212, 255, 58, 0.3)";
      dot.style.background = "#d4ff3a";
      dot.style.boxShadow = "0 0 12px #d4ff3a";

      if (hoursLeft <= 1) {
        text.textContent = `Открыто · Закроемся в ${CLOSE_HOUR}:00`;
      } else {
        text.textContent = `Открыто сейчас · Работаем до ${CLOSE_HOUR}:00`;
      }
      return;
    }

    // До открытия (Пн–Сб, раньше 09:00)
    if (currentTime < OPEN_HOUR) {
      badge.style.borderColor = "rgba(255, 219, 77, 0.3)";
      dot.style.background = "#ffdb4d";
      dot.style.boxShadow = "0 0 12px #ffdb4d";
      text.textContent = "Закрыто · Откроемся сегодня в 09:00";
      return;
    }

    // После закрытия (Пн–Сб, позже 21:00)
    const tomorrow = day === 6 ? 0 : day + 1; // если суббота → завтра воскресенье
    if (tomorrow === 0) {
      badge.style.borderColor = "rgba(255, 95, 31, 0.3)";
      dot.style.background = "#ff5f1f";
      dot.style.boxShadow = "0 0 12px #ff5f1f";
      text.textContent = "Закрыто · Завтра выходной, ждём в понедельник";
    } else {
      badge.style.borderColor = "rgba(255, 219, 77, 0.3)";
      dot.style.background = "#ffdb4d";
      dot.style.boxShadow = "0 0 12px #ffdb4d";
      text.textContent = "Закрыто · Откроемся завтра в 09:00";
    }
  }

  update(); // сразу при загрузке
  setInterval(update, 60 * 1000); // обновляем каждую минуту
})();
/* ============ МОБИЛЬНОЕ МЕНЮ ============ */
const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = document.querySelectorAll("[data-mobile-link]");

function openMenu() {
  burger.classList.add("active");
  mobileMenu.classList.add("active");
  document.body.classList.add("menu-open");
  burger.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  burger.classList.remove("active");
  mobileMenu.classList.remove("active");
  document.body.classList.remove("menu-open");
  burger.setAttribute("aria-expanded", "false");
}

function toggleMenu() {
  if (mobileMenu.classList.contains("active")) {
    closeMenu();
  } else {
    openMenu();
  }
}

burger.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  toggleMenu();
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

mobileMenu.addEventListener("click", (e) => {
  if (e.target === mobileMenu) {
    closeMenu();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
    closeMenu();
  }
});

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (window.innerWidth > 1024 && mobileMenu.classList.contains("active")) {
      closeMenu();
    }
  }, 150);
});

/* ============ REVEAL ============ */
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
);
revealElements.forEach((el) => revealObserver.observe(el));

/* ============ BENTO SPOTLIGHT ============ */
document.querySelectorAll(".bento-item").forEach((item) => {
  item.addEventListener("mousemove", (e) => {
    const rect = item.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    item.style.setProperty("--x", x + "%");
    item.style.setProperty("--y", y + "%");
  });
});

/* ============ СЧЁТЧИКИ ЦИФР ============ */
const counters = document.querySelectorAll("[data-count]");
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        const duration = 1500;
        const startTime = performance.now();

        function updateCounter(now) {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * target);
          el.textContent = current + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = target + suffix;
          }
        }
        requestAnimationFrame(updateCounter);
        counterObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 },
);
counters.forEach((c) => counterObserver.observe(c));

/* ============ ОТПРАВКА ФОРМЫ В TELEGRAM ============ */
const bookingForm = document.getElementById("bookingForm");
const submitBtn = document.getElementById("submitBtn");
const formStatus = document.getElementById("formStatus");

function showStatus(type, message) {
  formStatus.className = "form-status " + type;
  formStatus.innerHTML =
    (type === "success"
      ? '<i class="fas fa-check-circle"></i>'
      : '<i class="fas fa-exclamation-circle"></i>') +
    "<span>" +
    message +
    "</span>";
  if (type === "error") {
    setTimeout(() => {
      formStatus.className = "form-status";
    }, 6000);
  }
}

bookingForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const service = document.getElementById("service").value;
  const comment = document.getElementById("comment").value.trim();

  if (!name || !phone) {
    showStatus("error", "Пожалуйста, заполните имя и телефон.");
    return;
  }

  const now = new Date();
  const dateStr = now.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const message = `
🪒 <b>НОВАЯ ЗАЯВКА — HeadCut</b>

👤 <b>Имя:</b> ${escapeHtml(name)}
📞 <b>Телефон:</b> <a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a>
✂️ <b>Услуга:</b> ${escapeHtml(service)}
💬 <b>Пожелания:</b> ${comment ? escapeHtml(comment) : "—"}
🕐 <b>Время заявки:</b> ${dateStr}
            `.trim();

  submitBtn.disabled = true;
  const originalBtnHTML = submitBtn.innerHTML;
  submitBtn.innerHTML =
    '<i class="fas fa-spinner fa-spin"></i><span>Отправляем...</span>';
  formStatus.className = "form-status";

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      },
    );

    const data = await response.json();

    if (data.ok) {
      showStatus(
        "success",
        "Заявка отправлена! Мы свяжемся с вами в течение 15 минут.",
      );
      bookingForm.reset();
      submitBtn.innerHTML =
        '<i class="fas fa-check"></i><span>Отправлено</span>';
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
      }, 3000);
    } else {
      throw new Error(data.description || "Ошибка Telegram API");
    }
  } catch (error) {
    console.error("Ошибка отправки:", error);
    showStatus(
      "error",
      "Не удалось отправить заявку. Позвоните нам: +375 29 377-08-13",
    );
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnHTML;
  }
});

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/* ============ ПЛАВНЫЙ СКРОЛЛ ============ */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#" || !document.querySelector(href)) return;
    e.preventDefault();
    const target = document.querySelector(href);
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  });
});
