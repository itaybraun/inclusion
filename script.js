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
let currentLanguage = "en";
let teacherCategories = [];
let teacherQuestions = [];
let selectedCategoryId = "disclosure-and-privacy";

const uiText = {
  en: {
    navAdvisors: "Advisors",
    navAccessories: "Accessories",
    navBooks: "Books",
    navAbout: "About us",
    homeEyebrow: "School-focused support",
    homeTitle: "Practical guidance for inclusive schools",
    homeCopy: "Choose an advisor for classroom guidance or a general understanding of autism.",
    advisors: "Advisors",
    chooseAdvisor: "Who would you like to speak with?",
    teacherGuide: "Teacher Guide",
    teacherDescription: "Practical classroom guidance for situations, routines, and inclusion.",
    classroomAide: "Classroom Aide",
    aideDescription: "In-the-moment support for routines, de-escalation, and collaboration.",
    asdGuide: "ASD Guide",
    ari: "Ari",
    asdDescription: "Clear, school-relevant information about autism, communication, sensory needs, strengths, and inclusion.",
    notReady: "The advisor is not ready yet",
    maya: "Maya",
    detailDescription: "Practical, classroom-focused guidance for teachers supporting an autistic student.",
    searchLabel: "Search Maya's guidance",
    searchPlaceholder: "Search a topic or question",
    translatedNotice: "",
    noResults: "No matching questions found. Try a shorter topic.",
    loadingAnswer: "Loading answer…",
    unavailableAnswer: "This answer is not available yet.",
    chatNotReady: "Not ready yet",
    selectedLabel: "Selected:",
    selectedAdvisor: "Selected advisor",
    startConversation: "Start conversation",
    close: "Close",
    backToAdvisors: "Back to advisors",
    noMatches: "matching questions",
    matchingQuestion: "matching question",
    other: {
      accessories: ["Accessories", "Tools and supportive resources are being prepared."],
      books: ["Books", "Approved educational books and reading resources will appear here."],
      about: ["About Inclusion", "Inclusion helps schools and families support autistic children with practical, role-specific guidance."]
    }
  },
  he: {
    navAdvisors: "יועצים",
    navAccessories: "עזרים",
    navBooks: "ספרים",
    navAbout: "עלינו",
    homeEyebrow: "הכוונה לצוותי חינוך",
    homeTitle: "הכוונה מעשית לצוותים חינוכיים",
    homeCopy: "בחרו מדריך להכוונה בכיתה או להבנה כללית של אוטיזם.",
    advisors: "יועצים",
    chooseAdvisor: "עם מי תרצו לדבר?",
    teacherGuide: "מדריך למורה",
    teacherDescription: "הכוונה מעשית למורים במצבים יומיומיים בכיתה, בשגרה ובהכלה.",
    classroomAide: "מדריך לסייעת ולסייע",
    aideDescription: "תמיכה בזמן אמת בשגרה, בהרגעה ובשיתוף פעולה בכיתה.",
    asdGuide: "מדריך לאוטיזם",
    ari: "ארי",
    asdDescription: "מידע ברור ורלוונטי לבית הספר על אוטיזם, תקשורת, צרכים חושיים, חוזקות והכלה.",
    notReady: "התוכן עדיין לא מוכן",
    maya: "מאיה",
    detailDescription: "הכוונה מעשית למורים התומכים בתלמידים אוטיסטים.",
    searchLabel: "חיפוש בהכוונה של מאיה",
    searchPlaceholder: "חיפוש לפי נושא או שאלה",
    translatedNotice: "זו תצוגת עברית ראשונית. רק שאלות ותשובות שתורגמו מוצגות; התרגום עדיין דורש עריכה ובדיקה.",
    noResults: "לא נמצאו שאלות. נסו לחפש מונח קצר יותר.",
    loadingAnswer: "התשובה נטענת…",
    unavailableAnswer: "התשובה עדיין אינה זמינה.",
    chatNotReady: "עדיין לא מוכן",
    selectedLabel: "נבחר:",
    selectedAdvisor: "המדריך שנבחר",
    startConversation: "התחלת שיחה",
    close: "סגירה",
    backToAdvisors: "חזרה ליועצים",
    noMatches: "שאלות תואמות",
    matchingQuestion: "שאלה תואמת",
    other: {
      accessories: ["עזרים", "כלים ומשאבים תומכים נמצאים בהכנה."],
      books: ["ספרים", "כאן יופיעו ספרים וחומרי קריאה חינוכיים שאושרו."],
      about: ["על Inclusion", "Inclusion מסייעת לצוותי חינוך ולמשפחות לתמוך בילדים אוטיסטים בעזרת הכוונה מעשית המותאמת לתפקיד."]
    }
  }
};

function applyLanguage(language) {
  currentLanguage = language;
  const text = uiText[language];
  document.documentElement.lang = language;
  document.documentElement.dir = language === "he" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (text[key]) element.textContent = text[key];
  });
  cards.forEach((card) => {
    const role = text[{
      "Teacher Guide": "teacherGuide",
      "Classroom Aide": "classroomAide",
      "ASD Guide": "asdGuide"
    }[card.dataset.advisor]];
    const friendlyName = language === "he"
      ? { Maya: "מאיה", Daniel: "דניאל", Ari: "ארי" }[card.dataset.friendlyName]
      : card.dataset.friendlyName;
    card.setAttribute(
      "aria-label",
      card.dataset.status === "ready"
        ? language === "he" ? `פתיחת ${friendlyName}, ${role}` : `Open ${friendlyName}, ${role}`
        : language === "he" ? `${friendlyName}, ${role}, ${text.notReady}` : `${friendlyName}, ${role}, ${text.notReady}`
    );
  });
  const selectedCard = document.querySelector(".advisor-card.selected");
  if (selectedCard) {
    const roleKey = {
      "Teacher Guide": "teacherGuide",
      "Classroom Aide": "classroomAide",
      "ASD Guide": "asdGuide"
    }[selectedCard.dataset.advisor];
    const friendlyName = language === "he"
      ? { Maya: "מאיה", Daniel: "דניאל", Ari: "ארי" }[selectedCard.dataset.friendlyName]
      : selectedCard.dataset.friendlyName;
    activeAdvisorName.textContent = `${friendlyName} / ${text[roleKey]}`;
  }
  document.querySelector(".top-nav").setAttribute(
    "aria-label",
    language === "he" ? "ניווט ראשי" : "Main navigation"
  );
  document.querySelector(".language-menu").setAttribute(
    "aria-label",
    language === "he" ? "בחירת שפה" : "Choose language"
  );

  document.querySelector(".language-code").textContent = language.toUpperCase();
  languageOptions.forEach((option) => {
    const selected = option.dataset.code.toLowerCase() === language;
    option.classList.toggle("selected", selected);
    option.setAttribute("aria-selected", String(selected));
    const indicator = option.querySelector(".check");
    if (indicator) indicator.hidden = !selected;
    const comingSoon = option.querySelector(".coming-soon");
    if (comingSoon && selected) comingSoon.hidden = true;
  });

  document.querySelector("#content-search").placeholder = text.searchPlaceholder;
  document.querySelector("#detail-back").title = text.backToAdvisors;
  document.querySelector("#detail-back").setAttribute("aria-label", text.backToAdvisors);
  document.querySelector(".chat-icon-button").title = `${language === "he" ? "שיחה עם מאיה" : "Chat with Maya"} — ${text.chatNotReady}`;
  document.querySelector(".chat-icon-button").setAttribute(
    "aria-label",
    `${language === "he" ? "שיחה עם מאיה" : "Chat with Maya"}, ${text.chatNotReady}`
  );
  document.querySelector("#translation-notice").textContent = text.translatedNotice;
  document.querySelector("#translation-notice").hidden = !text.translatedNotice;
  document.querySelector(".dialog-kicker").textContent = text.selectedAdvisor;
  document.querySelector(".dialog-primary").textContent = text.startConversation;
  document.querySelector(".dialog-close").setAttribute("aria-label", text.close);

  if (!otherView.hidden) {
    const [title, copy] = text.other[document.querySelector(".nav-link.active").dataset.view];
    document.querySelector("#other-kicker").textContent = title;
    document.querySelector("#other-title").textContent = title;
    document.querySelector("#other-copy").textContent = copy;
  }
  if (teacherQuestions.length) renderTeacherContent(document.querySelector("#content-search").value);
}

languageButton.addEventListener("click", () => {
  const open = languageMenu.classList.toggle("open");
  languageButton.setAttribute("aria-expanded", String(open));
});

languageOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const language = option.dataset.code.toLowerCase();
    if (!uiText[language]) return;
    applyLanguage(language);
    languageMenu.classList.remove("open");
    languageButton.setAttribute("aria-expanded", "false");
  });
});

applyLanguage(currentLanguage);

document.addEventListener("click", (event) => {
  if (!event.target.closest(".language-wrap")) {
    languageMenu.classList.remove("open");
    languageButton.setAttribute("aria-expanded", "false");
  }
});

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

    const [title, copy] = uiText[currentLanguage].other[link.dataset.view];
    document.querySelector("#other-kicker").textContent = title;
    document.querySelector("#other-title").textContent = title;
    document.querySelector("#other-copy").textContent = copy;
    advisorsView.hidden = true;
    teacherDetail.hidden = true;
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
  const roleKey = {
    "Teacher Guide": "teacherGuide",
    "Classroom Aide": "classroomAide",
    "ASD Guide": "asdGuide"
  }[advisorName];
  const friendlyName = currentLanguage === "he"
    ? { Maya: "מאיה", Daniel: "דניאל", Ari: "ארי" }[card.dataset.friendlyName]
    : card.dataset.friendlyName;
  activeAdvisorName.textContent = `${friendlyName} / ${uiText[currentLanguage][roleKey]}`;

  if (card.dataset.status === "ready") {
    showTeacherDetail();
    return;
  }

  const role = uiText[currentLanguage][roleKey];
  dialogTitle.textContent = `${friendlyName} / ${role}`;
  dialogDescription.textContent = uiText[currentLanguage].notReady;
  dialog.querySelector(".dialog-primary").textContent = uiText[currentLanguage].close;
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
    fetch(`${base}categories.json?v=hebrew-rtl-v1`),
    fetch(`${base}questions.json?v=hebrew-rtl-v1`)
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
        .filter((question) => question.question[currentLanguage] && question.answerFiles?.[currentLanguage])
        .filter((question) => {
          if (!needle) return true;
          const searchable = [
            question.question[currentLanguage],
            category.name[currentLanguage],
            category.description[currentLanguage],
            ...(question.keywords[currentLanguage] || [])
          ].join(" ").toLowerCase();
          return searchable.includes(needle);
        })
        .sort((a, b) => a.sortOrder - b.sortOrder);
      matchCount += questions.length;
      return { category, questions };
    })
    .filter((entry) => !needle || entry.questions.length);

  if (!categoriesWithQuestions.length) {
    status.textContent = `0 ${uiText[currentLanguage].noMatches}`;
    list.innerHTML = `<p class="answer-panel">${escapeHtml(uiText[currentLanguage].noResults)}</p>`;
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
  sidebar.setAttribute("aria-label", currentLanguage === "he" ? "קטגוריות שאלות" : "Question categories");

  categoriesWithQuestions.forEach(({ category, questions }) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "category-button";
    if (category.id === selectedCategoryId) button.classList.add("selected");
    button.setAttribute("aria-pressed", String(category.id === selectedCategoryId));
    button.innerHTML = `<span>${escapeHtml(category.name[currentLanguage])}</span><span class="category-count">${questions.length}</span>`;
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
      <h2>${escapeHtml(selected.category.name[currentLanguage])}</h2>
      <p>${escapeHtml(selected.category.description[currentLanguage])}</p>
    </div>
  `;

  const questionList = document.createElement("div");
  questionList.className = "question-list";

  selected.questions.forEach((question) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "question-button";
    button.setAttribute("aria-expanded", "false");
    button.innerHTML = `<span>${escapeHtml(question.question[currentLanguage])}</span><span class="question-arrow" aria-hidden="true">↓</span>`;

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
      answer.textContent = uiText[currentLanguage].loadingAnswer;
      try {
        const response = await fetch(`content/advisors/teacher-guide/${question.answerFiles[currentLanguage]}?v=hebrew-rtl-v1`);
        if (!response.ok) throw new Error("Answer unavailable");
        answer.innerHTML = renderMarkdown(await response.text());
      } catch (error) {
        answer.textContent = uiText[currentLanguage].unavailableAnswer;
      }
    });

    questionList.append(button, answer);
  });

  panel.append(questionList);
  list.append(sidebar, panel);

  status.textContent = needle
    ? `${matchCount} ${currentLanguage === "he" && matchCount === 1 ? uiText.he.matchingQuestion : uiText[currentLanguage].noMatches}`
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
  dialogTitle.textContent = uiText[currentLanguage].maya;
  dialogDescription.textContent = uiText[currentLanguage].chatNotReady;
  dialog.querySelector(".dialog-primary").textContent = uiText[currentLanguage].close;
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
