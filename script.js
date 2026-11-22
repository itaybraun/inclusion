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
const teacherDetail = document.querySelector("#teacher-detail");

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
      teacherDetail.hidden = true;
      otherView.hidden = true;
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const copy = viewCopy[link.dataset.view];
    document.querySelector("#other-kicker").textContent = link.textContent;
    document.querySelector("#other-title").textContent = copy.title;
    document.querySelector("#other-copy").textContent = copy.copy;
    advisorsView.hidden = true;
    teacherDetail.hidden = true;
    otherView.hidden = false;
  });
});

document.querySelector("[data-back]").addEventListener("click", () => {
  document.querySelector('[data-view="advisors"]').click();
});

let teacherCategories = [];
let teacherQuestions = [];
let selectedCategoryId = "disclosure-and-privacy";

function openDialog(card) {
  cards.forEach((item) => item.classList.remove("selected"));
  card.classList.add("selected");

  const advisorName = card.dataset.advisor;
  const advisorDescription = card.dataset.description;
  const advisorColor = getComputedStyle(card).getPropertyValue("--advisor-color").trim();

  activeAdvisor.hidden = false;
  activeAdvisor.style.setProperty("--active-color", advisorColor);
  activeAdvisorName.textContent = advisorName;

  if (card.dataset.status === "ready") {
    showTeacherDetail();
    return;
  }

  dialogTitle.textContent = `${card.dataset.friendlyName} / ${advisorName}`;
  dialogDescription.textContent = "The advisor is not ready yet.";
  dialog.querySelector(".dialog-primary").textContent = "Not available";
  dialog.hidden = false;
  dialog.querySelector(".dialog-close").focus();
}

async function showTeacherDetail() {
  advisorsView.hidden = true;
  otherView.hidden = true;
  teacherDetail.hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (!teacherCategories.length) {
    await loadTeacherContent();
  }
  renderTeacherContent();
}

async function loadTeacherContent() {
  const base = "content/advisors/teacher-guide/";
  const [categoriesResponse, questionsResponse] = await Promise.all([
    fetch(`${base}categories.json`),
    fetch(`${base}questions.json`)
  ]);

  if (!categoriesResponse.ok || !questionsResponse.ok) {
    document.querySelector("#category-list").innerHTML =
      '<p class="answer-panel">The advisor content could not be loaded.</p>';
    return;
  }

  teacherCategories = await categoriesResponse.json();
  teacherQuestions = await questionsResponse.json();
}

function renderTeacherContent(query = "") {
  const list = document.querySelector("#category-list");
  const status = document.querySelector("#search-status");
  const needle = query.trim().toLowerCase();
  let matchCount = 0;

  list.innerHTML = "";
  const categoriesWithQuestions = teacherCategories
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((category) => {
      const questions = teacherQuestions
        .filter((question) => question.categoryId === category.id)
        .filter((question) => {
          if (!needle) return true;
          const searchable = [
            question.question.en,
            category.name.en,
            category.description.en,
            ...(question.keywords.en || [])
          ].join(" ").toLowerCase();
          return searchable.includes(needle);
        })
        .sort((a, b) => a.sortOrder - b.sortOrder);
      matchCount += questions.length;
      return { category, questions };
    })
    .filter((entry) => !needle || entry.questions.length);

  if (!categoriesWithQuestions.length) {
    status.textContent = "0 matching questions";
    list.innerHTML = '<p class="answer-panel">No matching questions found. Try a shorter topic.</p>';
    return;
  }

  if (needle && !categoriesWithQuestions.some((entry) => entry.category.id === selectedCategoryId)) {
    selectedCategoryId = categoriesWithQuestions[0].category.id;
  }
  if (!needle && !categoriesWithQuestions.some((entry) => entry.category.id === selectedCategoryId)) {
    selectedCategoryId = categoriesWithQuestions[0].category.id;
  }

  const sidebar = document.createElement("nav");
  sidebar.className = "category-sidebar";
  sidebar.setAttribute("aria-label", "Question categories");

  categoriesWithQuestions.forEach(({ category, questions }) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "category-button";
    if (category.id === selectedCategoryId) button.classList.add("selected");
    button.setAttribute("aria-pressed", String(category.id === selectedCategoryId));
    button.innerHTML = `<span>${escapeHtml(category.name.en)}</span><span class="category-count">${questions.length}</span>`;
    button.addEventListener("click", () => {
      selectedCategoryId = category.id;
      renderTeacherContent(document.querySelector("#content-search").value);
    });
    sidebar.append(button);
  });

  const selected = categoriesWithQuestions.find(
    (entry) => entry.category.id === selectedCategoryId
  ) || categoriesWithQuestions[0];
  selectedCategoryId = selected.category.id;

  const panel = document.createElement("section");
  panel.className = "question-panel";
  panel.innerHTML = `
    <div class="question-panel-heading">
      <h2>${escapeHtml(selected.category.name.en)}</h2>
      <p>${escapeHtml(selected.category.description.en)}</p>
    </div>
  `;

  const questionList = document.createElement("div");
  questionList.className = "question-list";

  selected.questions.forEach((question) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "question-button";
    button.setAttribute("aria-expanded", "false");
    button.innerHTML = `<span>${escapeHtml(question.question.en)}</span><span class="question-arrow" aria-hidden="true">↓</span>`;

    const answer = document.createElement("div");
    answer.className = "answer-panel";
    answer.hidden = true;

    button.addEventListener("click", async () => {
      const wasHidden = answer.hidden;
      panel.querySelectorAll(".answer-panel").forEach((item) => {
        item.hidden = true;
      });
      panel.querySelectorAll(".question-button").forEach((item) => {
        item.classList.remove("selected");
        item.setAttribute("aria-expanded", "false");
      });
      if (!wasHidden) return;

      button.classList.add("selected");
      button.setAttribute("aria-expanded", "true");
      answer.hidden = false;
      answer.textContent = "Loading answer…";
      try {
        const response = await fetch(`content/advisors/teacher-guide/${question.answerFile}`);
        if (!response.ok) throw new Error("Answer unavailable");
        answer.innerHTML = renderMarkdown(await response.text());
      } catch (error) {
        answer.textContent = "This answer is not available yet.";
      }
    });

    questionList.append(button, answer);
  });

  panel.append(questionList);
  list.append(sidebar, panel);

  status.textContent = needle
    ? `${matchCount} matching question${matchCount === 1 ? "" : "s"}`
    : "";
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function renderMarkdown(markdown) {
  const content = markdown.replace(/^---[\s\S]*?---\s*/, "");
  const lines = content.split("\n");
  let html = "";
  let listOpen = false;

  const closeList = () => {
    if (listOpen) {
      html += "</ul>";
      listOpen = false;
    }
  };

  lines.forEach((line) => {
    if (!line.trim()) return;
    if (line.startsWith("## ")) {
      closeList();
      html += `<h2>${escapeHtml(line.slice(3))}</h2>`;
    } else if (line.startsWith("### ")) {
      closeList();
      html += `<h3>${escapeHtml(line.slice(4))}</h3>`;
    } else if (line.startsWith("- ")) {
      if (!listOpen) {
        html += "<ul>";
        listOpen = true;
      }
      html += `<li>${escapeInlineMarkdown(line.slice(2))}</li>`;
    } else {
      closeList();
      html += `<p>${escapeInlineMarkdown(line)}</p>`;
    }
  });
  closeList();
  return html;
}

function escapeInlineMarkdown(value) {
  const escaped = escapeHtml(value)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return escaped;
}

document.querySelector("#detail-back").addEventListener("click", () => {
  teacherDetail.hidden = true;
  advisorsView.hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelector("#content-search").addEventListener("input", (event) => {
  renderTeacherContent(event.target.value);
});

document.querySelector(".chat-icon-button").addEventListener("click", () => {
  dialogTitle.textContent = "Maya";
  dialogDescription.textContent = "Not ready yet";
  dialog.querySelector(".dialog-primary").textContent = "Close";
  dialog.hidden = false;
  dialog.querySelector(".dialog-close").focus();
});

cards.forEach((card) => {
  card.addEventListener("click", () => openDialog(card));
});

document.querySelectorAll("[data-close-dialog]").forEach((control) => {
  control.addEventListener("click", () => {
    dialog.hidden = true;
  });
});
document.querySelector(".dialog-primary").addEventListener("click", () => {
  dialog.hidden = true;
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    dialog.hidden = true;
    languageMenu.classList.remove("open");
    languageButton.setAttribute("aria-expanded", "false");
  }
});
