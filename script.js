const languageButton = document.querySelector(".language-button");
const languageMenu = document.querySelector(".language-menu");
const languageOptions = document.querySelectorAll(".language-option");
const navLinks = document.querySelectorAll(".nav-link");
const advisorsView = document.querySelector("#advisors-view");
const otherView = document.querySelector("#other-view");
const examplesView = document.querySelector("#examples-view");
const cards = document.querySelectorAll(".advisor-card");
const activeAdvisor = document.querySelector(".active-advisor");
const activeAdvisorName = document.querySelector("#active-advisor-name");
const dialog = document.querySelector(".advisor-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogDescription = document.querySelector("#dialog-description");
const teacherDetail = document.querySelector("#teacher-detail");
const categoryNav = document.querySelector("#category-nav");
const questionTitle = document.querySelector("#question-title");
const questionCategory = document.querySelector("#question-category");
const answerPanel = document.querySelector("#answer-panel");
const ariCard = document.querySelector('.advisor-card[data-content-id="asd-guide"]');
const ariDemoExpiresAt = Date.parse("2026-11-26T23:10:06Z");
let currentLanguage = "en";
let advisorCategories = [];
let advisorQuestions = [];
let loadedAdvisorId = "";
let currentAdvisorId = "teacher-guide";
let selectedQuestionId = "";
let answerRequestId = 0;

const uiText = {
  en: {
    navAdvisors: "Advisors",
    navExamples: "Real-world examples",
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
    ariSearchLabel: "Search Ari's guidance",
    ariAnswerPending: "An answer for this question has not been prepared yet. This demo includes answer drafts for the first five questions only.",
    loadingQuestions: "Loading questions…",
    contentUnavailable: "The advisor content could not be loaded.",
    noQuestionSelected: "Select a question from the menu to read its answer.",
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
    examplesKicker: "Real-world examples",
    examplesTitle: "What happens, and what helps",
    examplesIntro: "Real-world classroom situations and practical ways to handle them.",
    scenarioProblem: "What happened",
    scenarioResponse: "What to do",
    scenarioUnderstanding: "Understanding the challenge",
    scenarioLearn: "What to learn",
    scenarioRelated: "Related guide answers",
    scenarioOpenGuide: "Open in guide",
    scenarioSelect: "Select a scenario",
    scenarioSportsTitle: "Ambiguous rules in sports",
    scenarioSportsSummary: "Students interpreted the rules differently, and an autistic student accused peers of cheating.",
    scenarioSportsProblem: "During sports class, the teacher gave a task with rules that were open to interpretation. Students played according to their own understanding. The autistic student became angry and accused classmates of cheating or lying. The classmates were offended.",
    scenarioSportsResponse: [
      "Pause the game and lower the pressure: stop the audience, speak calmly, and give everyone time to settle.",
      "State the incident without deciding intent: \"The rules were unclear, and several people understood them differently.\"",
      "Clarify and demonstrate the rules concretely, then allow a reset round.",
      "Address the student's distress separately. Validate that the mismatch felt unfair without accepting accusations as established facts.",
      "If the student shows signs of a meltdown, reduce demands and offer a known quiet option.",
      "Check in privately with the classmates and review the rules again before the next activity."
    ],
    other: {
      accessories: ["Accessories", "Tools and supportive resources are being prepared."],
      books: ["Books", "Approved educational books and reading resources will appear here."],
      about: ["About Inclusion", "Inclusion helps schools and families support autistic children with practical, role-specific guidance."]
    }
  },
  he: {
    navAdvisors: "יועצים",
    navExamples: "דוגמאות מהעולם",
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
    ariSearchLabel: "חיפוש בהכוונה של ארי",
    ariAnswerPending: "תשובה לשאלה זו עדיין לא הוכנה. בהדגמה זו קיימות טיוטות תשובה לחמש השאלות הראשונות בלבד.",
    loadingQuestions: "השאלות נטענות…",
    contentUnavailable: "לא ניתן לטעון את תוכן המדריך.",
    noQuestionSelected: "בחרו שאלה מהתפריט כדי לקרוא את התשובה.",
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
    examplesKicker: "דוגמאות מהעולם",
    examplesTitle: "מה קורה ומה עשוי לעזור",
    examplesIntro: "מצבי כיתה מהעולם האמיתי ודרכים מעשיות להתמודד איתם.",
    scenarioProblem: "מה קרה",
    scenarioResponse: "מה לעשות",
    scenarioUnderstanding: "הבנת האתגר",
    scenarioLearn: "מה לומדים",
    scenarioRelated: "התשובות הרלוונטיות במדריך",
    scenarioOpenGuide: "פתיחה במדריך",
    scenarioSelect: "בחרו תרחיש",
    scenarioSportsTitle: "כללים מעורפלים בחוג ספורט",
    scenarioSportsSummary: "תלמידים פירשו את הכללים באופן שונה, ותלמיד אוטיסט האשים אחרים ברמאות.",
    scenarioSportsProblem: "בשיעור ספורט נתן המורה משימה שכלליה היו פתוחים לפרשנות. התלמידים שיחקו לפי ההבנה שלהם. התלמיד האוטיסט כעס והאשים את חבריו בכיתה ברמאות או בשקר. חבריו נפגעו.",
    scenarioSportsResponse: [
      "עצירת המשחק והפחתת לחץ: הורידו את הקהל, דברו בשקט והעניקו זמן להירגע.",
      "תארו את האירוע בלי לקבוע כוונות: \"הכללים לא היו ברורים, ומספר אנשים הבינו אותם אחרת.\"",
      "הבהירו והדגימו את הכללים בצורה קונקרטית, ואז ערכו סיבוב חדש.",
      "התייחסו למצוקה של התלמיד בנפרד. אשרו שהפער הרגיש לא הוגן, בלי לקבל האשמות כאמיתות.",
      "אם התלמיד מראה סימנים של קריסה, הקטינו דרישות והציעו מקום שקט מוכר.",
      "דברו עם חבריו בפרטיות ונסחו את הכללים שוב לפני הפעילות הבאה."
    ],
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
  document.querySelector("#translation-notice").textContent = text.translatedNotice;
  document.querySelector("#translation-notice").hidden = !text.translatedNotice;
  document.querySelector(".dialog-kicker").textContent = text.selectedAdvisor;
  document.querySelector(".dialog-primary").textContent = text.startConversation;
  document.querySelector(".dialog-close").setAttribute("aria-label", text.close);

  if (!examplesView.hidden) renderExamples();
  if (!otherView.hidden) {
    const [title, copy] = text.other[document.querySelector(".nav-link.active").dataset.view];
    document.querySelector("#other-kicker").textContent = title;
    document.querySelector("#other-title").textContent = title;
    document.querySelector("#other-copy").textContent = copy;
  }
  if (selectedCard && !teacherDetail.hidden) updateAdvisorDetails(selectedCard);
  if (advisorQuestions.length) renderAdvisorContent(document.querySelector("#content-search").value);
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
      examplesView.hidden = true;
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (link.dataset.view === "examples") {
      advisorsView.hidden = true;
      teacherDetail.hidden = true;
      otherView.hidden = true;
      examplesView.hidden = false;
      renderExamples();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const [title, copy] = uiText[currentLanguage].other[link.dataset.view];
    document.querySelector("#other-kicker").textContent = title;
    document.querySelector("#other-title").textContent = title;
    document.querySelector("#other-copy").textContent = copy;
    advisorsView.hidden = true;
    teacherDetail.hidden = true;
    examplesView.hidden = true;
    otherView.hidden = false;
  });
});

document.querySelector("[data-back]").addEventListener("click", () => {
  document.querySelector('[data-view="advisors"]').click();
});

let selectedExampleId = "rules-fairness";

const realWorldExamples = [
  {
    id: "rules-fairness",
    category: { en: "Rules / Social Dynamics / Emotional Regulation", he: "כללים / דינמיקה חברתית / ויסות רגשי" },
    title: { en: "When Fairness Becomes an Obsession", he: "כאשר ההגינות הופכת לדחף חזק" },
    summary: {
      en: "A strong sense of fairness, literal rule-following, and frustration about others' behavior.",
      he: "תחושת הגינות חזקה, הכלה מילולית של כללים וקושי בוויסות תסכול."
    },
    situation: {
      en: "During a school activity, students are given homework to complete. Some students decide to work together, with each student completing half of the exercises, so they can finish the assignment at school and avoid taking their books home. An autistic student notices what they are doing and becomes very angry. The student believes they are cheating and insists that they stop. When the other students ignore the demand and continue working, the autistic student tries to take their notebooks away.",
      he: "בפעילות בית־ספרית ניתנה לתלמידים משימת שיעורי בית. כמה תלמידים החלטו לעבוד יחד: כל אחד השלים חצי מהתרגילים כדי לסיים בבית הספר ולא לקחת את הספרים הביתה. תלמיד אוטיסט הבחין בכך וכעס מאוד. הוא האמין שהם מרמים והתעקש שיעצרו. כשחבריו התעלמו מדרישתו והמשיכו לעבוד, ניסה לקחת את המחברות שלהם."
    },
    understanding: {
      en: "Some autistic children have a strong sense of fairness and a preference for following rules consistently. They may interpret rules literally and find it difficult to understand that other people can have different interpretations of what is acceptable. The student may genuinely believe that classmates are doing something wrong and feel responsible for stopping them. Frustration can become overwhelming when others do not respond as expected.",
      he: "לתלמידים אוטיסטים רבים יש תחושת הגינות חזקה והעדפה לעקוב אחר כללים באופן עקבי. ייתכן שהכללים יפורשו באופן מילולי, ויהיה קשה להבין שאנשים אחרים יכולים לפרש את מה שמותר אחרת. התלמיד עשוי באמת להאמין שחבריו עושים דבר אסור ולהרגיש אחראי לעצור אותם. התסכול עשוי להיות כבד במיוחד כשאחרים אינם מגיבים כמצופה."
    },
    steps: {
      en: [
        "Stop the immediate conflict: calmly prevent the student from taking or grabbing other students' belongings.",
        "Clarify the expectations: explain whether working together is permitted for this assignment, and take responsibility for making unclear rules explicit.",
        "Acknowledge the concern: recognize that the student is trying to follow what they understand to be the rules.",
        "Explain different perspectives: classmates may have permission to approach the task differently; deciding whether rules are followed is the teacher's responsibility.",
        "Teach an appropriate response: if the student believes someone is breaking a rule, they can tell the teacher rather than confronting classmates or taking their belongings.",
        "Address the social impact: once calm, help the student understand why the others were upset and how to repair the conflict."
      ],
      he: [
        "עצור את הסכסוך המיידי: מנע באיפוק מהתלמיד לקחת או לתפוס את חפצי חבריו.",
        "הבהר את הציפיות: הסבר אם מותר לעבוד יחד במשימה זו וקח אחריות להסביר כללים שאינם ברורים.",
        "אשר את החשש: הכירו בכך שהתלמיד מנסה לפעול לפי מה שהוא מבין כחוק.",
        "הסבר נקודות מבט שונות: ייתכן לחברים הרשאה לנהוג אחרת; קביעת מותר ואסור היא באחריות המורה.",
        "למד תגובה מתאימה: אם התלמיד חושב שמישהו מפר כללים, עליו לפנות למורה ולא להתעמת או לקחת חפצים.",
        "טפל בהשפעה החברתית: כשכולם רגועים, עזור לתלמיד להבין מדוע חבריו נפגעו וכיצד לתקן את המצב."
      ]
    },
    learn: {
      en: "Having a strong sense of fairness is not the problem. The challenge is learning that other people may interpret situations differently, and that we cannot control their actions. Children need to understand the difference between expressing a concern and taking responsibility for enforcing the rules.",
      he: "תחושת הגינות חזקה אינה הבעיה. האתגר הוא ללמוד שאנשים אחרים עשויים לפרש מצבים באופן שונה ושאנחנו לא יכולים לשלוט במעשיהם. על הילד להבין את ההבדל בין ביטוי חשש לבין נטילת אחריות לאכיפת הכללים."
    },
    relatedQuestions: [
      { id: "clear-instructions", label: { en: "Clear instructions", he: "הוראות ברורות" } },
      { id: "meltdown-middle-of-lesson", label: { en: "Meltdown", he: "מצב קריסה" } }
    ]
  },
  {
    id: "unclear-rules",
    category: { en: "Social Dynamics / Communication", he: "דינמיקה חברתית / תקשורת" },
    title: { en: "When the Rules Aren't Clear", he: "כשהכללים אינם ברורים" },
    summary: {
      en: "Ambiguous instructions lead to different interpretations and accusations of cheating.",
      he: "הוראות מעורפלות מובילות לפרשנויות שונות ולהאשמות ברמאות."
    },
    situation: {
      en: "During a sports lesson, the teacher gives the class a game to play. The instructions are somewhat ambiguous and leave room for interpretation. Different groups understand the rules differently and start playing according to their interpretations. One autistic student believes the rules mean something very specific. When others play differently, the student becomes extremely upset and accuses them of cheating and lying.",
      he: "בשיעור ספורט נותן המורה למשימה כללים מעורפלים ומותירים מקום לפרשנות. קבוצות שונות מבינות את הכללים אחרת ומשחקות לפי פרשנותן. תלמיד אוטיסט מאמין שהכללים ברורים ומשמעותם מסוימת. כשהאחרים משחקים אחרת, הוא מתעצבן מאוד ומאשים אותם ברמאות ובשקר."
    },
    understanding: {
      en: "Some autistic children strongly prefer clear, consistent, and explicit rules. Ambiguity and unexpected interpretations can create confusion and frustration. The child may genuinely believe that others are breaking the rules rather than interpreting them differently.",
      he: "לתלמידים אוטיסטים רבים חשיבות רבה לכללים ברורים, עקביים ומפורשים. עמימות ופרשנויות בלתי צפויות עלולות ליצור בלבול ותסכול. הילד עשוי באמת להאמין שאחרים מפרים את הכללים."
    },
    steps: {
      en: [
        "Clarify the rules: pause the game and explain that the original instructions allowed different interpretations.",
        "Acknowledge the child's perspective without confirming that anyone cheated.",
        "Explain that people can interpret the same instructions differently without anyone intentionally doing wrong.",
        "Repair the social situation and help the student express disagreement appropriately.",
        "For future games, explain and agree on the rules before starting."
      ],
      he: ["הבהירו את הכללים ועצרו את המשחק.", "אשרו את נקודת המבט של התלמיד מבלי לאשר שהאחרים רימו.", "הסבירו שמותר לפרש הוראות באופנים שונים.", "עזרו לתלמיד לתקן את הפגיעה ולהביע אי־הסכמה בדרך מתאימה.", "במשחקים הבאים הסכימו על הכללים לפני תחילת הפעילות."]
    },
    learn: {
      en: "Not every disagreement is about right versus wrong. Sometimes people simply understand the same situation differently.",
      he: "לא כל אי־הסכמה היא שאלה של נכון מול לא נכון. לפעמים אנשים פשוט מבינים את אותה מציאות אחרת."
    },
    relatedQuestions: [
      { id: "clear-instructions", label: { en: "Clear instructions", he: "הוראות ברורות" } },
      { id: "meltdown-middle-of-lesson", label: { en: "Meltdown", he: "מצב קריסה" } }
    ]
  },
  {
    id: "schedule-change",
    category: { en: "Transitions / Emotional Regulation", he: "מעברים / ויסות רגשי" },
    title: { en: "When the Schedule Suddenly Changes", he: "כשהשגרה משתנה פתאום" },
    summary: { en: "A cancelled lesson causes distress after a child has prepared for a predictable day.", he: "ביטול שיעור גורם למצוקה לאחר שהתלמיד התכונן לשגרה צפויה." },
    situation: {
      en: "A student arrives knowing exactly what the day will look like. Just before art class, the teacher announces that the lesson is cancelled and replaced with another activity. The autistic student becomes distressed, refuses to participate, and may start crying.",
      he: "תלמיד מגיע לבית הספר כשהוא יודע בדיוק איך ייראה היום. רגע לפני שיעור אמנות מודיע המורה שהשיעור בוטל והוא יוחלף בפעילות אחרת. התלמיד האוטיסט מתעצבן, מסרב להשתתף ועלול לבכות."
    },
    understanding: {
      en: "Predictability can be very important for autistic children. Knowing what comes next helps them prepare mentally and manage expectations. A sudden change may require reorganizing expectations without enough time to process it.",
      he: "צפיות ולעיתים שגרתיות יכולות להיות חשובות מאוד לתלמידים אוטיסטים. הידיעה מה יבוא לאחר מכן מאפשרת הכנה וויסות ציפיות. שינוי פתאומי עשוי להצריך ארגון מחדש של הציפיות בלי זמן לעיבוד."
    },
    steps: {
      en: ["Acknowledge the disappointment rather than dismissing it.", "Give a simple, concrete explanation.", "Explain what will happen instead and when the original activity might take place.", "Allow processing time instead of demanding immediate participation.", "Communicate future changes in advance when possible."],
      he: ["אשרו את האכזבה ולא תזלזלו בה.", "תנו הסבר פשוט ומוחשי.", "הסבירו מה יקרה במקום ומתי ניתן יהיה לבצע את הפעילות המקורית.", "תנו זמן לעיבוד במקום לדרוש השתתפות מיידית.", "הודיעו על שינויים עתידיים מראש ככל האפשר."]
    },
    learn: { en: "Flexibility may require time, information, and support rather than simply deciding to accept a change.", he: "גמישות עשויה לדרוש זמן, מידע ותמיכה ולא רק החלטה לקבל את השינוי." },
    relatedQuestions: [{ id: "transitions-and-substitute-teacher", label: { en: "Transitions", he: "מעברים" } }]
  },
  {
    id: "words-misunderstood",
    category: { en: "Communication / Social Dynamics", he: "תקשורת / דינמיקה חברתית" },
    title: { en: "When Words Are Misunderstood", he: "כשהמילים מובנות אחרת" },
    summary: {
      en: "A curious question is interpreted as criticism, leaving both students confused.",
      he: "שאלה מתוך סקרנות מובנת כביקורת ומשאירה את שני התלמידים מבולבלים."
    },
    situation: {
      en: "During a classroom activity, a student asks an autistic classmate, \"Why are you always so quiet? You never talk to anyone.\" The student does not intend to insult or hurt anyone. They are simply curious and trying to start a conversation. However, the autistic student feels criticized and becomes upset. They interpret the question as saying something is wrong with them or that they are expected to behave differently. The other student is confused because they did not mean anything bad.",
      he: "בפעילות בכיתה שואל תלמיד את חברו האוטיסט: \"למה אתה כל כך שקט תמיד? אתה אף פעם לא מדבר עם אף אחד.\" התלמיד אינו מתכוון להעליב או לפגוע. הוא פשוט סקרן ומנסה להתחיל בשיחה. אולם התלמיד האוטיסט מרגיש מוערך בביקורת ומתעצבן. הוא מפרש את השאלה כאילו יש בו משהו לא תקין או שהוא צריך להתנהג אחרת. התלמיד האחר מבולבל כי לא התכוון לרעה."
    },
    understanding: {
      en: "Some autistic children may interpret language literally or attach a different meaning to words than the speaker intended. They may also find it difficult to recognize the social context or intention behind a question. A comment intended as curiosity or casual conversation can be experienced as criticism or rejection. This does not mean the child's feelings are wrong: the emotional impact of words can be real even when no harm was intended.",
      he: "ילדים אוטיסטים מסוימים עשויים לפרש שפה באופן מילולי או לשייך למילים משמעות שונה מכוונת הדובר. הם עשויים גם להתקשות לזהות את ההקשר החברתי או את הכוונה מאחורי שאלה. הערה שנועדה לסקרנות או לשיחה חולפת עשויה להרגיש כביקורת או דחייה. זה לא אומר שהרגשות של הילד שגויים: ההשפעה הרגשית של מילים יכולה להיות אמיתית גם כשלא הייתה כוונה לפגוע."
    },
    steps: {
      en: [
        "Acknowledge the feelings: do not dismiss the child's reaction by saying, \"They didn't mean anything.\"",
        "Clarify the intention: explain that the classmate was curious and trying to start a conversation, not criticize.",
        "Explore alternative interpretations: help the child consider that the same words can have different meanings depending on context and intention.",
        "Support both students: help the other student understand how their question was received, without blaming either child.",
        "Encourage clarification: teach the autistic student that it is okay to ask, \"What do you mean?\" when unsure about someone's intention."
      ],
      he: [
        "אשרו את התחושות: אל תזלזלו בתגובה של הילד באמירה \"הם לא התכוונו לרעה\".",
        "הבהירו את הכוונה: הסבירו שהחבר סקרן ומנסה להתחיל בשיחה ולא לבקר.",
        "עיינו בפרשנויות חלופיות: עזרו לילד להבין שאותן מילים יכולות לשאת משמעויות שונות בהתאם להקשר ולכוונה.",
        "תמכו בשני התלמידים: עזרו לתלמיד השני להבין כיצד השאלה התקבלה, מבלי להאשים אף אחד מהם.",
        "עודדו בקשת הבהרה: למד את התלמיד האוטיסט שמותר לשאול \"מה הכוונה?\" כשאינו בטוח בכוונה."
      ]
    },
    learn: {
      en: "What someone says and what another person understands are not always the same. Learning to recognize intentions, ask for clarification, and consider different interpretations can help prevent misunderstandings.",
      he: "מה שמישהו אומר ומה שאדם אחר מבין אינם תמיד אותו דבר. לימוד זיהוי כוונות, בקשת הבהרה ושיקול פרשנויות שונות יכול לסייע למנוע אי־הבנות."
    },
    relatedQuestions: [
      { id: "hurtful-speech-without-intent", label: { en: "Hurtful speech", he: "דיבור פוגעני" } },
      { id: "clear-instructions", label: { en: "Clear communication", he: "תקשורת ברורה" } }
    ]
  },
  {
    id: "group-work",
    category: { en: "Social Interaction / Collaboration", he: "אינטראקציה חברתית / שיתוף פעולה" },
    title: { en: "When Group Work Becomes a Struggle", he: "כשעבודה בקבוצה מתערערת" },
    summary: { en: "A clear personal plan collides with the need to negotiate and compromise.", he: "תוכנית אישית ברורה מתנגשת בצורך לנהל משא ומתן ולהגיע לפשרה." },
    situation: {
      en: "The teacher divides the class into groups to prepare a presentation. One autistic student has a clear idea of how the project should be organized and wants to follow a particular plan. They become frustrated when others suggest different ideas or change parts of the work and insist that everyone follow their plan.",
      he: "המורה מחלק את הכיתה לקבוצות להכנת מצגת. לתלמיד אוטיסט יש תוכנית ברורה לארגון המשימה והוא רוצה ללכת בה. הוא מתוסכל כשאחרים מציעים רעיונות שונים או משנים חלקים בעבודה ומתעקש כולם יפעלו לפי התוכנית שלו."
    },
    understanding: {
      en: "Group work involves negotiating, compromising, interpreting suggestions, and managing unexpected changes. An autistic child may find these social and organizational demands challenging even with excellent subject knowledge.",
      he: "עבודה בקבוצה דורשת משא ומתן, פשרה, הבנת הצעות והתמודדות עם שינויים. תלמיד אוטיסט עשוי להתקשות בדרישות החברתיות והארגוניות גם אם הוא בעל ידע מצוין."
    },
    steps: {
      en: ["Give each student a defined role.", "Divide the project into smaller steps with clear expectations.", "Explain explicitly that collaboration requires listening and agreeing on a shared plan.", "Recognize strengths and give the child meaningful contributions.", "Help the group combine ideas rather than demanding that one student gives in."],
      he: ["הקצו לכל תלמיד תפקיד מוגדר.", "חלקו את הפרויקט לשלבים קטנים עם ציפיות ברורות.", "הסבירו ששיתוף פעולה דורש הקשבה והסכמה על תוכנית משותפת.", "כבדו את החוזקות והעניקו לתלמיד תרומה משמעותית.", "עזרו לקבוצה לשלב רעיונות במקום לדרוש מתלמיד לוותר."]
    },
    learn: { en: "Being good at a subject and being comfortable with group collaboration are two different skills.", he: "שליטה בנושא ונוחות בשיתוף פעולה בקבוצה הן שתי מיומנויות שונות." },
    relatedQuestions: [{ id: "teaching-with-aide", label: { en: "Teaching with an aide", he: "למידה עם סייעת" } }]
  },
  {
    id: "sharing-interests",
    category: { en: "Special Interests / Social Communication", he: "תחומי עניין מיוחדים / תקשורת חברתית" },
    title: { en: "When Sharing an Interest Becomes Too Much", he: "כשהשיתוף בעניין חביב הופך למוגזם" },
    summary: {
      en: "Strong enthusiasm for Marvel overwhelms classmates who have a different level of interest.",
      he: "התלהבות חזקה מ־Marvel מציפה חברים שאין להם אותו רמת עניין."
    },
    situation: {
      en: "A new Marvel movie is coming to the cinema next week. One autistic student is extremely excited about it and knows a lot about the Marvel universe. During every break, the student talks about the upcoming movie, sharing extensive details about the characters, timeline, connections between previous movies, and events from years before. The student is enthusiastic and wants to share their excitement with classmates. However, the other students are not equally interested. They become bored and annoyed, and eventually complain to the teacher that the student talks about Marvel all the time and doesn't let anyone else talk. The autistic student doesn't understand why the others are complaining.",
      he: "סרט Marvel חדש אמור להגיע לקולנוע בשבוע הבא. תלמיד אוטיסט מתרגש מאוד ומכיר היטב את יקום Marvel. בכל הפסקה הוא מדבר על הסרט הקרוב ומשתף פרטים רבים על הדמויות, ציר הזמן, הקשרים בין סרטים קודמים ואירועים שהתרחשו שנים לפני כן. התלמיד נלהב ורוצה לשתף את חבריו בהתרגשות. אך חבריו אינם מתעניינים באותה המידה. הם משתעממים ומתעצבנים, ובסופו של דבר מתלוננים למורה שהתלמיד מדבר על Marvel כל הזמן ואינו נותן לאחרים לדבר. התלמיד האוטיסט אינו מבין מדוע הם מתלוננים."
    },
    understanding: {
      en: "Many autistic people have special interests: subjects or activities that generate particularly strong enthusiasm and interest. These interests can be an important source of enjoyment, knowledge, motivation, and emotional regulation. An autistic child may find it difficult to recognize when others have lost interest, understand conversational boundaries, or balance sharing their own interests with listening to others. The child may not realize that extensive details can overwhelm listeners who do not share the same enthusiasm. The problem is not having a strong interest or wanting to talk about it; it is learning to share it while recognizing other people's interests and boundaries.",
      he: "לאנשים אוטיסטים רבים יש תחומי עניין מיוחדים: נושאים או פעילויות שמייצרים התלהבות ועניין חזקים במיוחד. תחומי עניין אלו יכולים להיות מקור חשוב להנאה, ידע, מוטיבציה וויסות רגשי. הילד עשוי להתקשות לזהות שרוב השומעים איבדו עניין, להבין גבולות שיחה או לאזן בין שיתוף תחום העניין שלו לבין הקשבה לאחרים. הוא עשוי שלא להבחין שביטוי פרטים רבים עלול להציף אנשים שאינם חולקים את ההתרגשות. הבעיה אינה העניין עצמו או הרצון לדבר עליו, אלא למידה לשתף אותו תוך הכרה בתחומי עניין וגבולות של אחרים."
    },
    steps: {
      en: [
        "Do not discourage the interest: avoid telling the student that nobody cares about Marvel or that they should stop talking about it.",
        "Explain conversational balance: conversations involve both sharing and listening.",
        "Teach how to recognize interest: people may ask questions, but may also want to change the subject.",
        "Encourage the student to check in by asking, \"Do you want to hear something interesting about Marvel?\"",
        "Explain that there is a time and place for detailed information, and that not every break needs to focus on the same subject.",
        "Create opportunities to share the interest with classmates who enjoy the same topic."
      ],
      he: [
        "אל תדכאו את תחום העניין: אל תגידו לתלמיד שאף אחד לא אכפת לו מ־Marvel או שהוא צריך להפסיק לדבר על כך.",
        "הסבירו את האיזון בשיחה: שיחה כוללת גם שיתוף וגם הקשבה.",
        "למדו לזהות עניין: אנשים עשויים לשאול שאלות, אך עשויים גם לרצות לשנות נושא.",
        "עודדו את התלמיד לבדוק אם יש עניין על ידי שאלה: \"רוצה לשמוע משהו מעניין על Marvel?\"",
        "הסבירו שיש זמן ומקום לפרטים רבים, ולא כל הפסקה חייבת להתמקד באותו נושא.",
        "צרו הזדמנויות לתלמיד לשתף בנושא עם חברים שמתעניינים בו."
      ]
    },
    learn: {
      en: "Having a strong interest is a strength, not a problem. The goal is to help the child develop reciprocal conversations: sharing what they love while making room for other people's interests.",
      he: "תחום עניין חזק הוא חוזקה, לא בעיה. המטרה היא לעזור לילד לפתח שיחה הדדית: לשתף במה שהוא אוהב תוך מתן מקום לתחומי עניין של אחרים."
    },
    relatedQuestions: [
      { id: "encourage-friendships", label: { en: "Encourage friendships", he: "עודדו חברויות" } },
      { id: "ten-things-teachers-should-know", label: { en: "Key things to know", he: "עיקרי הדברים לדעת" } }
    ]
  }
];

function renderExamples() {
  const text = uiText[currentLanguage];
  const list = document.querySelector("#example-list");
  const detail = document.querySelector("#example-detail");
  list.setAttribute("aria-label", text.examplesTitle);
  list.textContent = "";

  const exampleOrder = ["unclear-rules", "schedule-change", "words-misunderstood", "group-work", "rules-fairness", "sharing-interests"];
  const orderedExamples = exampleOrder
    .map((id) => realWorldExamples.find((example) => example.id === id))
    .filter(Boolean);

  orderedExamples.forEach((example) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "example-card";
    button.classList.toggle("selected", example.id === selectedExampleId);
    button.setAttribute("aria-current", String(example.id === selectedExampleId));

    const category = document.createElement("span");
    category.className = "example-category";
    category.textContent = example.category[currentLanguage];
    const title = document.createElement("strong");
    title.textContent = example.title[currentLanguage];
    const summary = document.createElement("span");
    summary.className = "example-summary";
    summary.textContent = example.summary[currentLanguage];
    button.append(category, title, summary);
    button.addEventListener("click", () => {
      selectedExampleId = example.id;
      renderExamples();
    });
    list.append(button);
  });

  const example = realWorldExamples.find((item) => item.id === selectedExampleId) || realWorldExamples[0];
  detail.textContent = "";

  const heading = document.createElement("h2");
  heading.textContent = example.title[currentLanguage];
  detail.append(heading);

  const problemSection = document.createElement("section");
  problemSection.className = "scenario-section scenario-situation";
  const problemHeading = document.createElement("h3");
  problemHeading.textContent = text.scenarioProblem;
  const problem = document.createElement("p");
  problem.textContent = example.situation[currentLanguage];
  problemSection.append(problemHeading, problem);

  const understandingSection = document.createElement("section");
  understandingSection.className = "scenario-section";
  const understandingHeading = document.createElement("h3");
  understandingHeading.textContent = text.scenarioUnderstanding;
  const understanding = document.createElement("p");
  understanding.textContent = example.understanding[currentLanguage];
  understandingSection.append(understandingHeading, understanding);

  const responseSection = document.createElement("section");
  responseSection.className = "scenario-section";
  const responseHeading = document.createElement("h3");
  responseHeading.textContent = text.scenarioResponse;
  const responseList = document.createElement("ul");
  example.steps[currentLanguage].forEach((step) => {
    const item = document.createElement("li");
    item.textContent = step;
    responseList.append(item);
  });
  responseSection.append(responseHeading, responseList);

  const learnSection = document.createElement("section");
  learnSection.className = "scenario-section scenario-learn";
  const learnHeading = document.createElement("h3");
  learnHeading.textContent = text.scenarioLearn;
  const learn = document.createElement("p");
  learn.textContent = example.learn[currentLanguage];
  learnSection.append(learnHeading, learn);

  const relatedSection = document.createElement("section");
  relatedSection.className = "scenario-related";
  const relatedHeading = document.createElement("h3");
  relatedHeading.textContent = text.scenarioRelated;
  relatedSection.append(relatedHeading);

  example.relatedQuestions.forEach((related) => {
    const link = document.createElement("button");
    link.type = "button";
    link.className = "guide-link";
    link.textContent = `${related.label[currentLanguage]} →`;
    link.addEventListener("click", () => openGuideQuestion(related.id));
    relatedSection.append(link);
  });

  detail.append(problemSection, understandingSection, responseSection, learnSection, relatedSection);
}

async function openGuideQuestion(questionId) {
  const teacherCard = document.querySelector('.advisor-card[data-content-id="teacher-guide"]');
  await showAdvisorDetail(teacherCard, questionId);
  navLinks.forEach((item) => item.classList.toggle("active", item.dataset.view === "advisors"));
  examplesView.hidden = true;
}

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
    showAdvisorDetail(card);
    return;
  }

  const role = uiText[currentLanguage][roleKey];
  dialogTitle.textContent = `${friendlyName} / ${role}`;
  dialogDescription.textContent = uiText[currentLanguage].notReady;
  dialog.querySelector(".dialog-primary").textContent = uiText[currentLanguage].close;
  dialog.hidden = false;
  dialog.querySelector(".dialog-close").focus();
}

async function showAdvisorDetail(card, questionId = "") {
  currentAdvisorId = card.dataset.contentId;
  selectedQuestionId = questionId;
  updateAdvisorDetails(card);
  categoryNav.textContent = uiText[currentLanguage].loadingQuestions;
  questionTitle.textContent = "";
  questionCategory.textContent = "";
  answerPanel.textContent = uiText[currentLanguage].loadingQuestions;
  document.querySelector("#search-status").textContent = "";
  advisorsView.hidden = true;
  otherView.hidden = true;
  teacherDetail.hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (loadedAdvisorId !== currentAdvisorId && !(await loadAdvisorContent(currentAdvisorId))) {
    return;
  }
  renderAdvisorContent();
}

function updateAdvisorDetails(card) {
  const isAri = card.dataset.contentId === "asd-guide";
  const roleKey = isAri ? "asdGuide" : "teacherGuide";
  const nameKey = card.dataset.friendlyName === "Ari" ? "ari" : "maya";
  const text = uiText[currentLanguage];
  const friendlyName = text[nameKey];
  const avatar = document.querySelector("#detail-avatar");
  const icon = card.querySelector(".advisor-icon svg");

  currentAdvisorId = card.dataset.contentId;
  teacherDetail.dataset.advisorId = currentAdvisorId;
  teacherDetail.style.setProperty(
    "--advisor-color",
    getComputedStyle(card).getPropertyValue("--advisor-color").trim()
  );
  document.querySelector("#detail-friendly-name").textContent = friendlyName;
  document.querySelector("#detail-role").textContent = text[roleKey];
  document.querySelector("#detail-description").textContent = text[isAri ? "asdDescription" : "detailDescription"];
  document.querySelector("#detail-search-label").textContent = text[isAri ? "ariSearchLabel" : "searchLabel"];
  document.querySelector(".chat-icon-button").title = `${currentLanguage === "he" ? `שיחה עם ${friendlyName}` : `Chat with ${friendlyName}`} — ${text.chatNotReady}`;
  document.querySelector(".chat-icon-button").setAttribute(
    "aria-label",
    `${currentLanguage === "he" ? `שיחה עם ${friendlyName}` : `Chat with ${friendlyName}`}, ${text.chatNotReady}`
  );
  avatar.replaceChildren(icon.cloneNode(true));
  avatar.classList.toggle("asd-guide", isAri);
}

async function loadAdvisorContent(advisorId) {
  const base = `content/advisors/${advisorId}/`;
  const [categoriesResponse, questionsResponse] = await Promise.all([
    fetch(`${base}categories.json?v=ari-demo-v1`),
    fetch(`${base}questions.json?v=ari-demo-v1`)
  ]);

  if (!categoriesResponse.ok || !questionsResponse.ok) {
    answerPanel.textContent = uiText[currentLanguage].contentUnavailable;
    return false;
  }

  advisorCategories = await categoriesResponse.json();
  advisorQuestions = await questionsResponse.json();
  loadedAdvisorId = advisorId;
  return true;
}

function renderAdvisorContent(query = "") {
  const status = document.querySelector("#search-status");
  const needle = query.trim().toLowerCase();
  let matchCount = 0;

  categoryNav.innerHTML = "";
  const categoriesWithQuestions = advisorCategories
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((category) => {
      const questions = advisorQuestions
        .filter((question) => question.categoryId === category.id)
        .filter((question) => {
          const hasAnswer = Boolean(question.answerFiles?.[currentLanguage]);
          return question.question[currentLanguage] && (hasAnswer || currentAdvisorId === "asd-guide");
        })
        .filter((question) => {
          if (!needle) return true;
          const searchable = [
            question.question[currentLanguage],
            question.shortQuestion?.[currentLanguage],
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
    selectedQuestionId = "";
    questionCategory.textContent = "";
    questionTitle.textContent = "";
    answerRequestId += 1;
    answerPanel.textContent = uiText[currentLanguage].noResults;
    return;
  }

  const allQuestions = categoriesWithQuestions.flatMap(({ questions }) => questions);
  let selectedQuestion = allQuestions.find((question) => question.id === selectedQuestionId);
  if (!selectedQuestion) {
    selectedQuestion = allQuestions[0];
    selectedQuestionId = selectedQuestion.id;
  }

  categoryNav.setAttribute("aria-label", currentLanguage === "he" ? "קטגוריות ושאלות" : "Categories and questions");
  categoriesWithQuestions.forEach(({ category, questions }) => {
    const group = document.createElement("details");
    group.className = "category-group";
    group.open = true;

    const heading = document.createElement("summary");
    heading.className = "category-heading";
    const categoryName = document.createElement("span");
    categoryName.textContent = category.name[currentLanguage];
    const count = document.createElement("span");
    count.className = "category-count";
    count.textContent = String(questions.length);
    heading.append(categoryName, count);
    group.append(heading);

    const questionList = document.createElement("div");
    questionList.className = "sidebar-question-list";
    questions.forEach((question) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "sidebar-question";
      button.dataset.questionId = question.id;
      button.textContent = question.shortQuestion?.[currentLanguage] || question.question[currentLanguage];
      button.title = question.question[currentLanguage];
      button.setAttribute("aria-current", String(question.id === selectedQuestionId));
      button.classList.toggle("selected", question.id === selectedQuestionId);
      button.addEventListener("click", () => selectAdvisorQuestion(question));
      questionList.append(button);
    });
    group.append(questionList);
    categoryNav.append(group);
  });

  selectAdvisorQuestion(selectedQuestion);

  status.textContent = needle
    ? `${matchCount} ${currentLanguage === "he" && matchCount === 1 ? uiText.he.matchingQuestion : uiText[currentLanguage].noMatches}`
    : "";
}

async function selectAdvisorQuestion(question) {
  selectedQuestionId = question.id;
  categoryNav.querySelectorAll(".sidebar-question").forEach((button) => {
    const selected = button.dataset.questionId === selectedQuestionId;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-current", String(selected));
  });

  const category = advisorCategories.find((item) => item.id === question.categoryId);
  questionCategory.textContent = category?.name[currentLanguage] || "";
  questionTitle.textContent = question.question[currentLanguage];
  answerPanel.scrollTop = 0;

  const requestId = ++answerRequestId;
  const answerFile = question.answerFiles?.[currentLanguage];
  if (!answerFile && currentAdvisorId === "asd-guide") {
    answerPanel.textContent = uiText[currentLanguage].ariAnswerPending;
    return;
  }

  answerPanel.textContent = uiText[currentLanguage].loadingAnswer;
  try {
    const response = await fetch(`content/advisors/${currentAdvisorId}/${answerFile}?v=ari-demo-v1`);
    if (!response.ok) throw new Error("Answer unavailable");
    const markdown = await response.text();
    if (requestId === answerRequestId) answerPanel.innerHTML = renderMarkdown(markdown);
  } catch (error) {
    if (requestId === answerRequestId) answerPanel.textContent = uiText[currentLanguage].unavailableAnswer;
  }
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

function ariDemoIsAvailable() {
  return Date.now() < ariDemoExpiresAt;
}

function updateAriDemoAvailability() {
  const isAvailable = ariDemoIsAvailable();
  ariCard.dataset.status = isAvailable ? "ready" : "not-ready";
  ariCard.classList.toggle("ready", isAvailable);
  ariCard.classList.toggle("not-ready", !isAvailable);
  ariCard.querySelector(".advisor-status").hidden = isAvailable;

  const text = uiText[currentLanguage];
  ariCard.setAttribute(
    "aria-label",
    isAvailable
      ? currentLanguage === "he" ? `פתיחת ${text.ari}, ${text.asdGuide}` : `Open ${text.ari}, ${text.asdGuide}`
      : `${text.ari}, ${text.asdGuide}, ${text.notReady}`
  );

  if (!isAvailable && currentAdvisorId === "asd-guide" && !teacherDetail.hidden) {
    window.location.reload();
  }
}

updateAriDemoAvailability();
if (ariDemoIsAvailable()) {
  window.setTimeout(
    updateAriDemoAvailability,
    Math.max(0, ariDemoExpiresAt - Date.now()) + 50
  );
}
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) updateAriDemoAvailability();
});

document.querySelector("#detail-back").addEventListener("click", () => {
  teacherDetail.hidden = true;
  advisorsView.hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelector("#content-search").addEventListener("input", (event) => {
  renderAdvisorContent(event.target.value);
});

document.querySelector(".chat-icon-button").addEventListener("click", () => {
  const text = uiText[currentLanguage];
  const nameKey = currentAdvisorId === "asd-guide" ? "ari" : "maya";
  const roleKey = currentAdvisorId === "asd-guide" ? "asdGuide" : "teacherGuide";
  dialogTitle.textContent = `${text[nameKey]} / ${text[roleKey]}`;
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
