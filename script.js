const languageButton = document.querySelector(".language-button");
const languageMenu = document.querySelector(".language-menu");
const languageOptions = document.querySelectorAll(".language-option");
const navLinks = document.querySelectorAll(".nav-link");
const advisorsView = document.querySelector("#advisors-view");
const otherView = document.querySelector("#other-view");
const cards = document.querySelectorAll(".advisor-card");
const activeAdvisor = document.querySelector(".active-advisor");
const activeAdvisorName = document.querySelector("#active-advisor-name");
const dialog = document.querySelector(".advisor-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogDescription = document.querySelector("#dialog-description");

languageButton.addEventListener("click", () => {
  const open = languageMenu.classList.toggle("open");
  languageButton.setAttribute("aria-expanded", String(open));
});

languageOptions.forEach((option) => {
  option.addEventListener("click", () => {
    if (!option.classList.contains("selected") && !option.dataset.language || false) return;
  });
});

document.querySelectorAll(".language-option.selected").forEach((option) => {
  option.addEventListener("click", () => {
    languageMenu.classList.remove("open");
    languageButton.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".language-wrap")) {
    languageMenu.classList.remove("open");
    languageButton.setAttribute("aria-expanded", "false");
  }
});

const viewCopy = {
  accessories: {
    title: "Accessories",
    copy: "Tools and supportive resources are being prepared."
  },
  books: {
    title: "Books",
    copy: "Approved educational books and reading resources will appear here."
  },
  about: {
    title: "About Inclusion",
    copy: "Inclusion connects families and the people around autistic children with role-specific, practical guidance."
  }
};

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");

    if (link.dataset.view === "advisors") {
      advisorsView.hidden = false;
      otherView.hidden = true;
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const copy = viewCopy[link.dataset.view];
    document.querySelector("#other-kicker").textContent = link.textContent;
    document.querySelector("#other-title").textContent = copy.title;
    document.querySelector("#other-copy").textContent = copy.copy;
    advisorsView.hidden = true;
    otherView.hidden = false;
  });
});

document.querySelector("[data-back]").addEventListener("click", () => {
  document.querySelector('[data-view="advisors"]').click();
});

function openDialog(card) {
  cards.forEach((item) => item.classList.remove("selected"));
  card.classList.add("selected");

  const advisorName = card.dataset.advisor;
  const advisorDescription = card.dataset.description;
  const advisorColor = getComputedStyle(card).getPropertyValue("--advisor-color").trim();

  activeAdvisor.hidden = false;
  activeAdvisor.style.setProperty("--active-color", advisorColor);
  activeAdvisorName.textContent = advisorName;
  dialogTitle.textContent = advisorName;
  dialogDescription.textContent = advisorDescription;
  dialog.hidden = false;
  dialog.querySelector(".dialog-close").focus();
}

cards.forEach((card) => {
  card.addEventListener("click", () => openDialog(card));
});

document.querySelectorAll("[data-close-dialog]").forEach((control) => {
  control.addEventListener("click", () => {
    dialog.hidden = true;
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    dialog.hidden = true;
    languageMenu.classList.remove("open");
    languageButton.setAttribute("aria-expanded", "false");
  }
});
