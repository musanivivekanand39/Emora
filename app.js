const icons = {
  "layout-dashboard": '<rect x="3" y="3" width="7" height="9" rx="2"/><rect x="14" y="3" width="7" height="5" rx="2"/><rect x="14" y="12" width="7" height="9" rx="2"/><rect x="3" y="16" width="7" height="5" rx="2"/>',
  bot: '<path d="M12 8V4H8"/><rect x="4" y="8" width="16" height="12" rx="4"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>',
  "messages-square": '<path d="M14 9a3 3 0 0 1 3 3v5l-3-2H9a3 3 0 0 1-3-3"/><path d="M4 4h9a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H8l-4 3V7a3 3 0 0 1 3-3Z"/>',
  "line-chart": '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
  "clipboard-check": '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-5"/>',
  wind: '<path d="M3 8h10a3 3 0 1 0-3-3"/><path d="M4 12h14a3 3 0 1 1-3 3"/><path d="M2 16h9"/>',
  "phone-call": '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.32 1.77.6 2.61a2 2 0 0 1-.45 2.11L8 9.7a16 16 0 0 0 6.3 6.3l1.26-1.26a2 2 0 0 1 2.11-.45c.84.28 1.71.48 2.61.6A2 2 0 0 1 22 16.92Z"/><path d="M14 2a8 8 0 0 1 8 8"/><path d="M14 6a4 4 0 0 1 4 4"/>',
  settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.51a2 2 0 0 1 1-1.72l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z"/><circle cx="12" cy="12" r="3"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  bell: '<path d="M10.27 21a2 2 0 0 0 3.46 0"/><path d="M18 8A6 6 0 0 0 6 8c0 7-3 7-3 7h18s-3 0-3-7"/>',
  smile: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01"/><path d="M15 9h.01"/>',
  play: '<polygon points="6 3 20 12 6 21 6 3"/>',
  pause: '<path d="M7 4v16"/><path d="M17 4v16"/>',
  send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  "message-circle": '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  "arrow-left": '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
  "rotate-ccw": '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  sparkles: '<path d="m12 3-1.9 5.4L5 10.5l5.1 2.1L12 18l1.9-5.4 5.1-2.1-5.1-2.1Z"/><path d="M5 3v4"/><path d="M3 5h4"/><path d="M19 17v4"/><path d="M17 19h4"/>',
  "heart-pulse": '<path d="M19.5 12.6 12 20l-7.5-7.4A5 5 0 0 1 12 6a5 5 0 0 1 7.5 6.6Z"/><path d="M3 12h4l2-3 3 6 2-3h7"/>',
  brain: '<path d="M9.5 2A2.5 2.5 0 0 0 7 4.5v.2A3.5 3.5 0 0 0 5.4 11 3.5 3.5 0 0 0 7 17.3v.2A2.5 2.5 0 0 0 11.5 19V2Z"/><path d="M14.5 2A2.5 2.5 0 0 1 17 4.5v.2A3.5 3.5 0 0 1 18.6 11a3.5 3.5 0 0 1-1.6 6.3v.2A2.5 2.5 0 0 1 12.5 19V2Z"/>',
  activity: '<path d="M22 12h-4l-3 8-6-16-3 8H2"/>'
};

const svg = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.sparkles}</svg>`;

document.querySelectorAll("[data-icon]").forEach((item) => {
  item.insertAdjacentHTML("afterbegin", svg(item.dataset.icon));
});

document.querySelectorAll("[data-mobile-icon]").forEach((item) => {
  item.innerHTML = svg(item.dataset.mobileIcon);
});

document.querySelectorAll("[data-icon-button]").forEach((item) => {
  item.innerHTML = svg(item.dataset.iconButton);
});

document.querySelectorAll("[data-inline-icon]").forEach((item) => {
  item.innerHTML = svg(item.dataset.inlineIcon);
});

const currentDate = document.querySelector("#currentDate");
if (currentDate) {
  currentDate.textContent = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric"
  }).format(new Date());
}

const views = [...document.querySelectorAll("[data-view]")];
const links = [...document.querySelectorAll("[data-view-link]")];
const mobileMenuToggle = document.querySelector("#mobileMenuToggle");
const mobileNavigation = document.querySelector("#mobileNavigation");

function closeMobileMenu() {
  document.body.classList.remove("mobile-menu-open");
  mobileMenuToggle?.setAttribute("aria-expanded", "false");
  mobileMenuToggle?.setAttribute("aria-label", "Open navigation menu");
}

function setView(name) {
  views.forEach((view) => view.classList.toggle("active", view.dataset.view === name));
  links.forEach((link) => link.classList.toggle("active", link.dataset.viewLink === name));
  window.history.replaceState(null, "", `#${name}`);
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  requestAnimationFrame(() => {
    drawCharts();
    setTimeout(drawCharts, 100);
  });
  closeMobileMenu();
}
window.emoraSetView = setView;

mobileMenuToggle?.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("mobile-menu-open");
  mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
  mobileMenuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

links.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    setView(link.dataset.viewLink);
  });
});

const initialView = window.location.hash.replace("#", "") || "dashboard";
if (views.some((view) => view.dataset.view === initialView)) setView(initialView);

const themeToggle = document.querySelector("#themeToggle");
const savedTheme = localStorage.getItem("emora-theme");
if (savedTheme === "light") {
  document.documentElement.classList.add("light");
  themeToggle.checked = true;
}

themeToggle.addEventListener("change", () => {
  document.documentElement.classList.toggle("light", themeToggle.checked);
  localStorage.setItem("emora-theme", themeToggle.checked ? "light" : "dark");
  drawCharts();
});

document.querySelector("#motionToggle").addEventListener("change", (event) => {
  document.body.classList.toggle("reduced-motion", event.target.checked);
});

const emojiPopover = document.querySelector("#emojiPopover");
let activeEmojiInput = null;

document.querySelectorAll(".emoji-trigger").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    activeEmojiInput = document.querySelector(`#${button.dataset.emojiTarget}`);
    const rect = button.getBoundingClientRect();
    emojiPopover.style.left = `${Math.min(rect.left, window.innerWidth - 166)}px`;
    emojiPopover.style.top = `${rect.top - 154}px`;
    emojiPopover.classList.toggle("open");
  });
});

emojiPopover.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    if (!activeEmojiInput) return;
    activeEmojiInput.value += button.textContent;
    activeEmojiInput.focus();
    emojiPopover.classList.remove("open");
  });
});

document.addEventListener("click", () => emojiPopover.classList.remove("open"));

document.querySelectorAll(".voice-button").forEach((button) => {
  button.addEventListener("click", () => button.classList.toggle("recording"));
});

const answerOptions = [
  { label: "Not at all", value: 0 },
  { label: "Several days", value: 1 },
  { label: "More than half the days", value: 2 },
  { label: "Nearly every day", value: 3 }
];

const screeningData = {
  phq9: {
    title: "PHQ-9",
    subtitle: "Depression screening",
    context: "Over the last 2 weeks, how often have you been bothered by...",
    maxScore: 27,
    questions: [
      { id: "phq-interest", text: "Little interest or pleasure in doing things" },
      { id: "phq-low", text: "Feeling down, depressed, or hopeless" },
      { id: "phq-sleep", text: "Trouble falling or staying asleep, or sleeping too much" },
      { id: "phq-energy", text: "Feeling tired or having little energy" },
      { id: "phq-appetite", text: "Poor appetite or overeating" },
      { id: "phq-worth", text: "Feeling bad about yourself, or that you are a failure or have let yourself or your family down" },
      { id: "phq-focus", text: "Trouble concentrating on things, such as reading or watching something" },
      { id: "phq-pace", text: "Moving or speaking so slowly that others could notice, or being so fidgety or restless that you moved around more than usual" },
      { id: "phq-harm", text: "Thoughts that you would be better off dead, or of hurting yourself in some way" }
    ],
    ranges: [
      { max: 4, label: "Minimal range" },
      { max: 9, label: "Mild range" },
      { max: 14, label: "Moderate range" },
      { max: 19, label: "Moderately severe range" },
      { max: 27, label: "Severe range" }
    ]
  },
  gad7: {
    title: "GAD-7",
    subtitle: "Anxiety screening",
    context: "Over the last 2 weeks, how often have you been bothered by...",
    maxScore: 21,
    questions: [
      { id: "gad-nervous", text: "Feeling nervous, anxious, or on edge" },
      { id: "gad-control", text: "Not being able to stop or control worrying" },
      { id: "gad-worry", text: "Worrying too much about different things" },
      { id: "gad-relax", text: "Trouble relaxing" },
      { id: "gad-restless", text: "Being so restless that it is hard to sit still" },
      { id: "gad-irritable", text: "Becoming easily annoyed or irritable" },
      { id: "gad-afraid", text: "Feeling afraid as if something awful might happen" }
    ],
    ranges: [
      { max: 4, label: "Minimal range" },
      { max: 9, label: "Mild range" },
      { max: 14, label: "Moderate range" },
      { max: 21, label: "Severe range" }
    ]
  }
};

const rotatingPromptPool = [
  { id: "daily-sleep", text: "How restful was your sleep last night?" },
  { id: "daily-energy", text: "How steady has your energy felt today?" },
  { id: "daily-focus", text: "How easy has it been to focus today?" },
  { id: "daily-social", text: "How supported have you felt by people around you?" },
  { id: "daily-body", text: "How tense or heavy has your body felt?" },
  { id: "daily-appetite", text: "How stable has your appetite felt today?" },
  { id: "daily-pressure", text: "How much pressure are you carrying right now?" },
  { id: "daily-calm", text: "How calm does your mind feel at this moment?" },
  { id: "daily-outdoors", text: "How much daylight or fresh air did you get today?" },
  { id: "daily-hope", text: "How hopeful do you feel about tomorrow?" },
  { id: "daily-overload", text: "How overloaded have your thoughts felt?" },
  { id: "daily-kindness", text: "How kindly have you spoken to yourself today?" }
];

let activeScreening = null;
let activeAnswers = [];
let activeQuestionIndex = 0;
let latestReportText = "";

function getReports() {
  return JSON.parse(localStorage.getItem("emora-screening-reports") || "[]");
}

function saveReports(reports) {
  localStorage.setItem("emora-screening-reports", JSON.stringify(reports.slice(0, 8)));
}

function getDailyQuestions() {
  const used = new Set(JSON.parse(localStorage.getItem("emora-used-daily-questions") || "[]"));
  let fresh = rotatingPromptPool.filter((question) => !used.has(question.id));
  if (fresh.length < 5) {
    used.clear();
    fresh = [...rotatingPromptPool];
  }
  return fresh
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);
}

function buildDailyScreening() {
  return {
    title: "Rotating check-in",
    subtitle: "Wellness pattern report",
    context: "For today, choose the answer that fits best...",
    maxScore: 15,
    questions: getDailyQuestions(),
    ranges: [
      { max: 4, label: "Low strain" },
      { max: 8, label: "Mild strain" },
      { max: 12, label: "Moderate strain" },
      { max: 15, label: "High strain" }
    ],
    options: [
      { label: "Very low", value: 0 },
      { label: "A little", value: 1 },
      { label: "Moderate", value: 2 },
      { label: "High", value: 3 }
    ]
  };
}

function getRange(screening, score) {
  return screening.ranges.find((range) => score <= range.max) || screening.ranges.at(-1);
}

function showCheckPanel(panelId) {
  document.querySelectorAll(".check-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === panelId);
  });
}

function startScreening(type) {
  activeScreening = type === "daily" ? buildDailyScreening() : screeningData[type];
  activeScreening.type = type;
  activeAnswers = new Array(activeScreening.questions.length).fill(null);
  activeQuestionIndex = 0;
  showCheckPanel("screeningFlow");
  renderQuestion();
}

function renderQuestion() {
  if (!activeScreening) return;
  const question = activeScreening.questions[activeQuestionIndex];
  const options = activeScreening.options || answerOptions;
  document.querySelector("#screeningTitle").textContent = activeScreening.title;
  document.querySelector("#screeningMeta").textContent = `Question ${activeQuestionIndex + 1} of ${activeScreening.questions.length}`;
  document.querySelector("#questionContext").textContent = activeScreening.context;
  document.querySelector("#questionText").textContent = question.text;
  document.querySelector("#screeningProgress").style.width = `${((activeQuestionIndex + 1) / activeScreening.questions.length) * 100}%`;
  document.querySelector("#previousQuestion").disabled = activeQuestionIndex === 0;
  document.querySelector("#nextQuestion").textContent = activeQuestionIndex === activeScreening.questions.length - 1 ? "See result" : "Next";

  const selected = activeAnswers[activeQuestionIndex];
  document.querySelector("#answerList").innerHTML = options.map((option) => `
    <button class="answer-option ${selected === option.value ? "selected" : ""}" type="button" data-answer="${option.value}">
      <span>${option.label}</span>
      <small>+${option.value}</small>
    </button>
  `).join("");

  document.querySelectorAll(".answer-option").forEach((button) => {
    button.addEventListener("click", () => {
      activeAnswers[activeQuestionIndex] = Number(button.dataset.answer);
      if (activeQuestionIndex < activeScreening.questions.length - 1) {
        activeQuestionIndex += 1;
        renderQuestion();
      } else {
        completeScreening();
      }
    });
  });
}

function buildExplanation(screening, score, range, topSignals) {
  const signalText = topSignals.length ? ` The strongest signals came from ${topSignals.join(", ")}.` : "";
  if (screening.type === "phq9") {
    const safety = activeAnswers[8] > 0
      ? " Because you marked self-harm thoughts, please contact a trusted person and seek urgent professional support. If you may be in immediate danger, dial 112. You can also call Tele-MANAS on 14416 for mental health support in India."
      : "";
    return `Your answers point to the ${range.label.toLowerCase()} for low-mood symptoms over the past two weeks.${signalText} This screening is not a diagnosis, but it can help guide a conversation with a clinician.${safety}`;
  }
  if (screening.type === "gad7") {
    return `Your answers point to the ${range.label.toLowerCase()} for anxiety symptoms over the past two weeks.${signalText} A healthcare professional can interpret this alongside your health history and current stressors.`;
  }
  return `Your rotating check-in suggests ${range.label.toLowerCase()} today.${signalText} These questions are intentionally varied so the app can track patterns without repeating the same prompt set every time.`;
}

function completeScreening() {
  const score = activeAnswers.reduce((total, value) => total + Number(value || 0), 0);
  const range = getRange(activeScreening, score);
  const topSignals = activeScreening.questions
    .map((question, index) => ({ text: question.text, value: activeAnswers[index] }))
    .filter((item) => item.value >= 2)
    .sort((a, b) => b.value - a.value)
    .slice(0, 3)
    .map((item) => `"${item.text}"`);
  const completedAt = new Date();
  const explanation = buildExplanation(activeScreening, score, range, topSignals);
  latestReportText = [
    `Emora Mental Health Screening Report`,
    `Date: ${completedAt.toLocaleString()}`,
    `Screening: ${activeScreening.title} (${activeScreening.subtitle})`,
    `Score: ${score}/${activeScreening.maxScore}`,
    `Range: ${range.label}`,
    `Strongest signals: ${topSignals.length ? topSignals.join("; ") : "No high-frequency symptoms selected."}`,
    `Clinical note: This is a screening result, not a diagnosis. Please review with a qualified doctor or mental health professional.`,
    activeScreening.type === "phq9" && activeAnswers[8] > 0 ? `Safety note: Self-harm thoughts were endorsed. Urgent professional support is recommended if there is any risk of harm.` : "",
    `Answers:`,
    ...activeScreening.questions.map((question, index) => `- ${question.text}: ${activeAnswers[index]}/3`)
  ].filter(Boolean).join("\n");

  const reports = getReports();
  reports.unshift({
    id: Date.now(),
    type: activeScreening.type,
    title: activeScreening.title,
    score,
    maxScore: activeScreening.maxScore,
    range: range.label,
    completedAt: completedAt.toISOString(),
    report: latestReportText
  });
  saveReports(reports);
  localStorage.setItem("emora-last-screening-type", activeScreening.type);

  if (activeScreening.type === "daily") {
    const used = new Set(JSON.parse(localStorage.getItem("emora-used-daily-questions") || "[]"));
    activeScreening.questions.forEach((question) => used.add(question.id));
    localStorage.setItem("emora-used-daily-questions", JSON.stringify([...used]));
  }

  document.querySelector("#resultType").textContent = `${activeScreening.title} screening`;
  document.querySelector("#resultScore").textContent = `${score}/${activeScreening.maxScore}`;
  document.querySelector("#resultRange").textContent = range.label;
  document.querySelector("#resultExplanation").textContent = explanation;
  document.querySelector("#doctorReportText").textContent = latestReportText;
  showCheckPanel("screeningResult");
  renderReportHistory();
  renderNextSuggestion();
  renderRelaxRecommendations();
}

function renderReportHistory() {
  const history = document.querySelector("#reportHistory");
  if (!history) return;
  const reports = getReports();
  if (!reports.length) {
    history.innerHTML = `<div class="history-empty">No reports yet. Complete a screening to create your first doctor-ready summary.</div>`;
    return;
  }
  history.innerHTML = reports.slice(0, 4).map((report) => `
    <div class="history-item">
      <div>
        <strong>${report.title}</strong>
        <small>${new Date(report.completedAt).toLocaleDateString()} - ${report.range}</small>
      </div>
      <strong>${report.score}/${report.maxScore}</strong>
    </div>
  `).join("");
}

function renderNextSuggestion() {
  const suggestion = document.querySelector("#nextSuggestion");
  if (!suggestion) return;
  const lastType = localStorage.getItem("emora-last-screening-type");
  const next = lastType === "phq9" ? "Try GAD-7 next" : lastType === "gad7" ? "Try rotating check-in next" : "Try PHQ-9 next";
  suggestion.innerHTML = `<i></i> ${next}`;
}

document.querySelectorAll("[data-start-screening]").forEach((button) => {
  button.addEventListener("click", () => startScreening(button.dataset.startScreening));
});

document.querySelector("#exitScreening").addEventListener("click", () => showCheckPanel("checkHome"));
document.querySelector("#closeResult").addEventListener("click", () => showCheckPanel("checkHome"));
document.querySelector("#takeAnother").addEventListener("click", () => showCheckPanel("checkHome"));

document.querySelector("#previousQuestion").addEventListener("click", () => {
  if (activeQuestionIndex > 0) {
    activeQuestionIndex -= 1;
    renderQuestion();
  }
});

document.querySelector("#nextQuestion").addEventListener("click", () => {
  if (activeAnswers[activeQuestionIndex] === null) {
    document.querySelector(".question-card").animate(
      [{ transform: "translateX(0)" }, { transform: "translateX(-7px)" }, { transform: "translateX(7px)" }, { transform: "translateX(0)" }],
      { duration: 240, easing: "ease-out" }
    );
    return;
  }
  if (activeQuestionIndex < activeScreening.questions.length - 1) {
    activeQuestionIndex += 1;
    renderQuestion();
  } else {
    completeScreening();
  }
});

document.querySelector("#copyReport").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(latestReportText);
    document.querySelector("#copyReport").textContent = "Copied";
  } catch {
    document.querySelector("#copyReport").textContent = "Select text";
  }
  setTimeout(() => {
    document.querySelector("#copyReport").textContent = "Copy";
  }, 1200);
});

document.querySelector("#clearReports").addEventListener("click", () => {
  localStorage.removeItem("emora-screening-reports");
  renderReportHistory();
});

renderReportHistory();
renderNextSuggestion();

const relaxPlans = {
  balanced: {
    label: "Balanced",
    reason: "Based on steady mood and recovery signals",
    breathing: "Box breathing - 4-4-4-4",
    recommendations: [
      ["wind", "Breathing reset", "Box breathing for 3 minutes"],
      ["sparkles", "Gratitude note", "Write one thing that felt okay today"],
      ["activity", "Light stretch", "6 minutes of neck and shoulder mobility"],
      ["heart-pulse", "Hydration pause", "Drink water and check posture"]
    ],
    sounds: [
      ["wind", "Ocean Calm", "Nature sound", "22m"],
      ["activity", "Deep Focus", "Relaxing music", "55m"],
      ["sparkles", "Evening Wind-Down", "Guided", "12m"]
    ],
    yoga: [
      ["activity", "Morning Flow", "8m - Beginner"],
      ["wind", "Desk Reset", "5m - All levels"],
      ["sparkles", "Bedtime Yin", "15m - Gentle"]
    ]
  },
  stressed: {
    label: "Stressed",
    reason: "Based on pressure and stress signals",
    breathing: "4-7-8 - follow the circle",
    recommendations: [
      ["wind", "Deep breathing", "4-7-8 breathing for 3 minutes"],
      ["activity", "Short walk", "15 minutes outside if possible"],
      ["sparkles", "Unload thoughts", "Write the top 3 things on your mind"],
      ["heart-pulse", "Drink water", "Reset your body before deciding anything"]
    ],
    sounds: [
      ["wind", "Rain Room", "Soft rain sound", "30m"],
      ["activity", "Low-Fi Reset", "Calming music", "42m"],
      ["sparkles", "Tension Release", "Guided", "10m"]
    ],
    yoga: [
      ["wind", "Shoulder Release", "7m - Gentle"],
      ["activity", "Desk Reset", "5m - All levels"],
      ["heart-pulse", "Grounding Flow", "12m - Slow"]
    ]
  },
  anxious: {
    label: "Anxious",
    reason: "Based on worry and nervous-system signals",
    breathing: "Extended exhale - 4 in, 6 out",
    recommendations: [
      ["wind", "Long exhale breathing", "4 in, 6 out for 4 minutes"],
      ["heart-pulse", "Name five things", "Use a 5-4-3-2-1 grounding reset"],
      ["activity", "Gentle movement", "Walk slowly for 8 minutes"],
      ["sparkles", "Reduce inputs", "Pause notifications for 20 minutes"]
    ],
    sounds: [
      ["wind", "Forest Rain", "Nature sound", "40m"],
      ["sparkles", "Safe Place", "Guided imagery", "14m"],
      ["activity", "Soft Piano", "Calming music", "35m"]
    ],
    yoga: [
      ["heart-pulse", "Grounding Flow", "10m - Gentle"],
      ["wind", "Breath & Stretch", "9m - Beginner"],
      ["activity", "Legs Up Reset", "6m - Calm"]
    ]
  },
  sad: {
    label: "Low mood",
    reason: "Based on low-mood or withdrawal signals",
    breathing: "Gentle breathing - 3 in, 5 out",
    recommendations: [
      ["sparkles", "Tiny activation", "Do one 2-minute task with no pressure"],
      ["heart-pulse", "Support message", "Send one honest line to someone safe"],
      ["activity", "Daylight reset", "Sit near a window or step outside"],
      ["wind", "Gentle breathing", "3 in, 5 out for 3 minutes"]
    ],
    sounds: [
      ["sparkles", "Warm Ambient", "Soft music", "28m"],
      ["heart-pulse", "Self-Compassion", "Guided", "11m"],
      ["wind", "Quiet Lake", "Nature sound", "24m"]
    ],
    yoga: [
      ["sparkles", "Mood Lift Flow", "8m - Easy"],
      ["heart-pulse", "Heart Opener", "6m - Gentle"],
      ["wind", "Bedtime Yin", "15m - Gentle"]
    ]
  },
  tired: {
    label: "Tired",
    reason: "Based on fatigue and recovery signals",
    breathing: "Rest breath - slow and easy",
    recommendations: [
      ["heart-pulse", "Body scan", "10 minute rest without multitasking"],
      ["wind", "Rest breath", "Slow breathing for 3 minutes"],
      ["activity", "Low effort stretch", "Release jaw, neck, and wrists"],
      ["sparkles", "Evening boundary", "Choose one thing to stop doing tonight"]
    ],
    sounds: [
      ["wind", "Evening Wind-Down", "Guided", "12m"],
      ["heart-pulse", "Sleep Drift", "Relaxing music", "45m"],
      ["sparkles", "Brown Noise", "Focus rest", "60m"]
    ],
    yoga: [
      ["wind", "Bedtime Yin", "15m - Gentle"],
      ["heart-pulse", "Floor Reset", "9m - Restorative"],
      ["activity", "Soft Stretch", "6m - Easy"]
    ]
  }
};

function inferRelaxSentiment() {
  const manual = localStorage.getItem("emora-relax-sentiment");
  if (manual && relaxPlans[manual]) return manual;

  const latestReport = getReports()[0];
  if (latestReport) {
    if (latestReport.type === "gad7" && latestReport.score >= 10) return "anxious";
    if (latestReport.type === "phq9" && latestReport.score >= 10) return "sad";
    if (latestReport.type === "daily" && latestReport.score >= 9) return "stressed";
    if (latestReport.range.toLowerCase().includes("severe")) return "stressed";
  }

  const chatText = localStorage.getItem("emora-last-chat-text") || "";
  if (/\b(tired|exhausted|sleepy|drained|fatigue)\b/i.test(chatText)) return "tired";
  if (/\b(anxious|worry|worried|panic|nervous)\b/i.test(chatText)) return "anxious";
  if (/\b(stress|stressed|pressure|overwhelmed)\b/i.test(chatText)) return "stressed";
  if (/\b(sad|low|hopeless|down|lonely)\b/i.test(chatText)) return "sad";
  return "balanced";
}

function renderRelaxRecommendations(sentiment = inferRelaxSentiment()) {
  const plan = relaxPlans[sentiment] || relaxPlans.balanced;
  const badge = document.querySelector("#sentimentBadge");
  const reason = document.querySelector("#recommendationReason");
  const recommendationList = document.querySelector("#relaxRecommendations");
  const soundList = document.querySelector("#soundList");
  const yogaList = document.querySelector("#yogaList");
  if (!recommendationList || !soundList || !yogaList) return;
  stopAmbientSound();

  badge.innerHTML = `<i></i> ${plan.label}`;
  reason.textContent = plan.reason;

  document.querySelectorAll("#sentimentTabs button").forEach((button) => {
    button.classList.toggle("active", button.dataset.sentiment === sentiment);
  });

  recommendationList.innerHTML = plan.recommendations.map(([icon, title, detail]) => `
    <div class="relax-item">
      <span>${svg(icon)}</span>
      <div><strong>${title}</strong><small>${detail}</small></div>
      <span class="trend-pill">New</span>
    </div>
  `).join("");

  soundList.innerHTML = plan.sounds.map(([icon, title, detail, duration]) => `
    <div class="sound-item">
      <span>${svg(icon)}</span>
      <div><strong>${title}</strong><small>${detail}</small></div>
      <time>${duration}</time>
      <button class="sound-play" type="button" data-sound-title="${title}" aria-label="Play ${title}">${svg("play")}</button>
    </div>
  `).join("");

  yogaList.innerHTML = plan.yoga.map(([icon, title, detail]) => `
    <div class="yoga-tile">
      <span>${svg(icon)}</span>
      <div><strong>${title}</strong><small>${detail}</small></div>
    </div>
  `).join("");

  soundList.querySelectorAll(".sound-play").forEach((button, index) => {
    button.addEventListener("click", () => toggleAmbientSound(button, index));
  });
}

let ambientAudio = null;
let ambientButton = null;

function stopAmbientSound() {
  if (ambientAudio) {
    ambientAudio.oscillator.stop();
    ambientAudio.context.close();
    ambientAudio = null;
  }
  if (ambientButton) {
    ambientButton.classList.remove("playing");
    ambientButton.innerHTML = svg("play");
    ambientButton.setAttribute("aria-label", `Play ${ambientButton.dataset.soundTitle}`);
    ambientButton = null;
  }
}

function toggleAmbientSound(button, index) {
  if (button === ambientButton) {
    stopAmbientSound();
    return;
  }

  stopAmbientSound();
  const AudioEngine = window.AudioContext || window.webkitAudioContext;
  if (!AudioEngine) return;
  const context = new AudioEngine();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = "sine";
  oscillator.frequency.value = [174.61, 220, 261.63, 196][index % 4];
  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.035, context.currentTime + 1.2);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start();
  ambientAudio = { context, oscillator };
  ambientButton = button;
  button.classList.add("playing");
  button.innerHTML = svg("pause");
  button.setAttribute("aria-label", `Pause ${button.dataset.soundTitle}`);
}

document.querySelectorAll("#sentimentTabs button").forEach((button) => {
  button.addEventListener("click", () => {
    localStorage.setItem("emora-relax-sentiment", button.dataset.sentiment);
    renderRelaxRecommendations(button.dataset.sentiment);
  });
});

const breathCircle = document.querySelector("#breathCircle");
const breathingStart = document.querySelector("#breathingStart");
let breathingTimeout = null;
let breathingPhase = "inhale";
const standardBreathingPace = { inhale: 4, exhale: 6 };

function getBreathingPace() {
  return standardBreathingPace;
}

function runBreathingPhase() {
  const { inhale, exhale } = getBreathingPace();
  breathCircle.style.setProperty("--breath-cycle", `${inhale + exhale}s`);
  const isInhaling = breathingPhase === "inhale";
  breathCircle.querySelector("span").textContent = isInhaling ? "Breathe in" : "Breathe out";
  breathingTimeout = setTimeout(() => {
    breathingPhase = isInhaling ? "exhale" : "inhale";
    runBreathingPhase();
  }, (isInhaling ? inhale : exhale) * 1000);
}

breathingStart.addEventListener("click", () => {
  const active = breathCircle.classList.toggle("breathing");
  breathingStart.textContent = active ? "Pause" : "Start";

  if (!active) {
    clearTimeout(breathingTimeout);
    breathCircle.querySelector("span").textContent = "Ready";
    return;
  }

  const { inhale, exhale } = getBreathingPace();
  breathCircle.style.setProperty("--breath-cycle", `${inhale + exhale}s`);
  breathingPhase = "inhale";
  runBreathingPhase();
});

let meditationSeconds = 300;
let meditationRemaining = 300;
let meditationInterval = null;

function renderMeditationTime() {
  const minutes = String(Math.floor(meditationRemaining / 60)).padStart(2, "0");
  const seconds = String(meditationRemaining % 60).padStart(2, "0");
  document.querySelector("#meditationTime").textContent = `${minutes}:${seconds}`;
}

document.querySelectorAll("[data-minutes]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-minutes]").forEach((option) => option.classList.remove("selected"));
    button.classList.add("selected");
    meditationSeconds = Number(button.dataset.minutes) * 60;
    meditationRemaining = meditationSeconds;
    clearInterval(meditationInterval);
    meditationInterval = null;
    document.querySelector("#meditationStart").textContent = "Start";
    renderMeditationTime();
  });
});

function setCustomMeditationTimer() {
  const customInput = document.querySelector("#customMinutes");
  const minutes = Math.min(120, Math.max(1, Number(customInput.value) || 5));
  customInput.value = minutes;
  document.querySelectorAll("[data-minutes]").forEach((option) => option.classList.remove("selected"));
  meditationSeconds = minutes * 60;
  meditationRemaining = meditationSeconds;
  clearInterval(meditationInterval);
  meditationInterval = null;
  document.querySelector("#meditationStart").textContent = "Start";
  renderMeditationTime();
}

document.querySelector("#setCustomTimer").addEventListener("click", setCustomMeditationTimer);
document.querySelector("#customMinutes").addEventListener("keydown", (event) => {
  if (event.key === "Enter") setCustomMeditationTimer();
});

document.querySelector("#meditationStart").addEventListener("click", () => {
  if (meditationInterval) {
    clearInterval(meditationInterval);
    meditationInterval = null;
    document.querySelector("#meditationStart").textContent = "Start";
    return;
  }
  document.querySelector("#meditationStart").textContent = "Pause";
  meditationInterval = setInterval(() => {
    meditationRemaining = Math.max(0, meditationRemaining - 1);
    renderMeditationTime();
    if (meditationRemaining === 0) {
      clearInterval(meditationInterval);
      meditationInterval = null;
      document.querySelector("#meditationStart").textContent = "Start";
    }
  }, 1000);
});

document.querySelector("#meditationReset").addEventListener("click", () => {
  clearInterval(meditationInterval);
  meditationInterval = null;
  meditationRemaining = meditationSeconds;
  document.querySelector("#meditationStart").textContent = "Start";
  renderMeditationTime();
});

renderRelaxRecommendations();
renderMeditationTime();

let emergencyContacts = [];

function getEmergencyContacts() { return emergencyContacts; }

function saveEmergencyContacts(contacts) {
  emergencyContacts = contacts.slice(0, 6);
  window.emoraAuth?.saveUserData({ emergencyContacts });
}

function renderEmergencyContacts() {
  const list = document.querySelector("#contactList");
  if (!list) return;
  const contacts = getEmergencyContacts();
  if (!contacts.length) {
    list.innerHTML = `<div class="contact-empty">Add someone you trust so their call and text actions are ready when you need them.</div>`;
    return;
  }
  list.innerHTML = contacts.map((contact) => `
    <div class="contact-item">
      <div>
        <strong>${escapeHtml(contact.name)}</strong>
        <small>${escapeHtml(contact.phone)}</small>
      </div>
      <div class="contact-actions">
        <a href="tel:${encodeURIComponent(contact.phone)}" aria-label="Call ${escapeHtml(contact.name)}">${svg("phone-call")}</a>
        <a href="sms:${encodeURIComponent(contact.phone)}" aria-label="Text ${escapeHtml(contact.name)}">${svg("message-circle")}</a>
        <button type="button" aria-label="Remove ${escapeHtml(contact.name)}" data-remove-contact="${contact.id}">${svg("x")}</button>
      </div>
    </div>
  `).join("");

  document.querySelectorAll("[data-remove-contact]").forEach((button) => {
    button.addEventListener("click", () => {
      saveEmergencyContacts(getEmergencyContacts().filter((contact) => String(contact.id) !== button.dataset.removeContact));
      renderEmergencyContacts();
    });
  });
}

document.querySelector("#saveContact").addEventListener("click", () => {
  const nameInput = document.querySelector("#contactName");
  const phoneInput = document.querySelector("#contactPhone");
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  if (!name || !phone) {
    document.querySelector(".contact-form").animate(
      [{ transform: "translateX(0)" }, { transform: "translateX(-6px)" }, { transform: "translateX(6px)" }, { transform: "translateX(0)" }],
      { duration: 220, easing: "ease-out" }
    );
    return;
  }
  const contacts = getEmergencyContacts();
  contacts.unshift({ id: Date.now(), name, phone });
  saveEmergencyContacts(contacts);
  nameInput.value = "";
  phoneInput.value = "";
  renderEmergencyContacts();
});

const gratitudeText = document.querySelector("#gratitudeText");
const gratitudeStatus = document.querySelector("#gratitudeStatus");
gratitudeText.value = localStorage.getItem("emora-gratitude-entry") || "";

document.querySelector("#saveGratitude").addEventListener("click", () => {
  localStorage.setItem("emora-gratitude-entry", gratitudeText.value.trim());
  gratitudeStatus.textContent = "Saved on this device.";
  setTimeout(() => {
    gratitudeStatus.textContent = "Saved only on this device.";
  }, 1400);
});

renderEmergencyContacts();

window.addEventListener("emora:user-data", (event) => {
  emergencyContacts = event.detail.emergencyContacts || [];
  renderEmergencyContacts();
});

function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function drawLineChart(canvas, series, labels) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const ratio = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.clearRect(0, 0, width, height);

  const pad = { top: 22, right: 18, bottom: 34, left: 34 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;
  const grid = "rgba(148, 163, 184, 0.16)";
  const text = cssVar("--muted");

  ctx.lineWidth = 1;
  ctx.strokeStyle = grid;
  for (let i = 0; i <= 4; i += 1) {
    const y = pad.top + (chartH / 4) * i;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(width - pad.right, y);
    ctx.stroke();
  }

  ctx.font = "600 11px Poppins, sans-serif";
  ctx.fillStyle = text;
  labels.forEach((label, index) => {
    const x = pad.left + (chartW / (labels.length - 1)) * index;
    ctx.fillText(label, x - 10, height - 12);
  });

  series.forEach((line) => {
    const gradient = ctx.createLinearGradient(pad.left, 0, width - pad.right, 0);
    gradient.addColorStop(0, line.color);
    gradient.addColorStop(1, line.colorEnd || line.color);

    ctx.beginPath();
    line.values.forEach((value, index) => {
      const x = pad.left + (chartW / (line.values.length - 1)) * index;
      const y = pad.top + chartH - (value / 100) * chartH;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.shadowColor = line.color;
    ctx.shadowBlur = 14;
    ctx.stroke();
    ctx.shadowBlur = 0;

    line.values.forEach((value, index) => {
      const x = pad.left + (chartW / (line.values.length - 1)) * index;
      const y = pad.top + chartH - (value / 100) * chartH;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = line.color;
      ctx.fill();
    });
  });
}

function drawBarChart(canvas, values, labels) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const ratio = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.clearRect(0, 0, width, height);

  const pad = 30;
  const barW = (width - pad * 2) / values.length - 12;
  const maxH = height - 64;
  ctx.font = "600 11px Poppins, sans-serif";
  values.forEach((value, index) => {
    const x = pad + index * (barW + 12);
    const h = (value / 100) * maxH;
    const y = height - 34 - h;
    const gradient = ctx.createLinearGradient(0, y, 0, height);
    gradient.addColorStop(0, index % 2 ? cssVar("--teal") : cssVar("--primary"));
    gradient.addColorStop(1, "rgba(155, 140, 255, 0.22)");
    roundRect(ctx, x, y, barW, h, 12);
    ctx.fillStyle = gradient;
    ctx.shadowColor = index % 2 ? cssVar("--teal") : cssVar("--primary");
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = cssVar("--muted");
    ctx.fillText(labels[index], x + 5, height - 12);
  });
}

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function drawCharts() {
  drawLineChart(
    document.querySelector("#weeklyChart"),
    [
      { values: [58, 66, 62, 74, 70, 83, 88], color: cssVar("--primary"), colorEnd: cssVar("--teal") },
      { values: [42, 48, 44, 52, 47, 38, 31], color: cssVar("--warning"), colorEnd: "#ec4899" }
    ],
    ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  );
  drawBarChart(document.querySelector("#energyChart"), [54, 72, 61, 86, 74, 68], ["8", "10", "12", "2", "4", "6"]);
  drawLineChart(
    document.querySelector("#monthlyChart"),
    [
      { values: [62, 65, 71, 68, 76, 82, 84, 79], color: cssVar("--teal"), colorEnd: cssVar("--primary-2") },
      { values: [38, 35, 31, 36, 30, 27, 25, 29], color: cssVar("--pink"), colorEnd: cssVar("--warning") }
    ],
    ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"]
  );
}

window.addEventListener("resize", drawCharts);
requestAnimationFrame(drawCharts);

const counters = document.querySelectorAll("[data-counter]");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting || entry.target.dataset.done) return;
    entry.target.dataset.done = "true";
    const target = Number(entry.target.dataset.counter);
    let current = 0;
    const step = () => {
      current += Math.ceil(target / 24);
      entry.target.textContent = `${Math.min(current, target)}%`;
      if (current < target) requestAnimationFrame(step);
    };
    step();
  });
});
counters.forEach((counter) => observer.observe(counter));

document.querySelector("#aiComposer")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector("#aiInput");
  const text = input.value.trim();
  if (!text) {
    input.animate(
      [{ transform: "translateX(0)" }, { transform: "translateX(-6px)" }, { transform: "translateX(6px)" }, { transform: "translateX(0)" }],
      { duration: 220, easing: "ease-out" }
    );
    return;
  }
  const stream = document.querySelector("#aiMessages");
  const message = document.createElement("article");
  message.className = "message user";
  message.innerHTML = `<p>${escapeHtml(text)}</p><time>${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</time>`;
  stream.insertBefore(message, stream.querySelector(".typing-indicator"));
  localStorage.setItem("emora-last-chat-text", text);
  if (!localStorage.getItem("emora-relax-sentiment")) {
    renderRelaxRecommendations();
  }
  input.value = "";
  stream.scrollTop = stream.scrollHeight;
  requestChatReply(text, stream);
});

function appendAiMessage(stream, text) {
  const message = document.createElement("article");
  message.className = "message ai";
  message.innerHTML = `<p>${escapeHtml(text)}</p><time>${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</time>`;
  stream.insertBefore(message, stream.querySelector(".typing-indicator"));
  stream.scrollTop = stream.scrollHeight;
}

async function requestChatReply(text, stream) {
  const typing = stream.querySelector(".typing-indicator");
  typing.hidden = false;
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });
    if (!response.ok) throw new Error("Chat service is unavailable");
    const data = await response.json();
    appendAiMessage(stream, data.reply);
  } catch {
    appendAiMessage(stream, "I am ready to listen. The AI chat service is not connected yet.");
  } finally {
    typing.hidden = true;
  }
}

const profileForm = document.querySelector("#profileForm");
const profileData = JSON.parse(localStorage.getItem("emora-profile") || "{}");
if (/^aanya\b/i.test(profileData.profileName || "")) {
  profileData.profileName = "Bhanu";
  if (/aanya/i.test(profileData.profileEmail || "")) profileData.profileEmail = "";
  localStorage.setItem("emora-profile", JSON.stringify(profileData));
}
const profileFields = ["profileAge", "profileGender", "profileLanguage"];
profileFields.forEach((id) => {
  const field = document.querySelector(`#${id}`);
  if (profileData[id] !== undefined) field.value = profileData[id];
});

function renderProfile() {
  const data = JSON.parse(localStorage.getItem("emora-profile") || "{}");
  const name = data.profileName || "Bhanu";
  document.querySelector("#profileNameDisplay").textContent = name;
  document.querySelector("#profileEmailDisplay").textContent = data.profileEmail || "Add your email address";
  document.querySelector("#profileAvatar").textContent = name.charAt(0).toUpperCase();
  document.querySelector("#profileAgeDisplay").textContent = data.profileAge || "—";
  document.querySelector("#profileGenderDisplay").textContent = data.profileGender || "Prefer not to say";
  document.querySelector("#profileLanguageDisplay").textContent = data.profileLanguage || "English";
}

document.querySelector("#editProfile").addEventListener("click", () => {
  profileForm.hidden = !profileForm.hidden;
});

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(profileFields.map((id) => [id, document.querySelector(`#${id}`).value.trim()]));
  localStorage.setItem("emora-profile", JSON.stringify(data));
  window.emoraAuth?.saveUserData({ profile: data });
  profileForm.hidden = true;
  renderProfile();
});

const savedGoals = JSON.parse(localStorage.getItem("emora-goals") || "[]");
document.querySelectorAll(".goal-picker input").forEach((input) => {
  input.checked = savedGoals.includes(input.value);
  input.addEventListener("change", () => {
    const goals = [...document.querySelectorAll(".goal-picker input:checked")].map((goal) => goal.value);
    localStorage.setItem("emora-goals", JSON.stringify(goals));
    window.emoraAuth?.saveUserData({ goals });
  });
});

const notificationSettings = JSON.parse(localStorage.getItem("emora-notifications") || "{}");
document.querySelectorAll(".notification-toggle").forEach((toggle) => {
  toggle.checked = notificationSettings[toggle.dataset.reminder] ?? ["morning", "water", "sleep", "quote"].includes(toggle.dataset.reminder);
  toggle.addEventListener("change", async () => {
    notificationSettings[toggle.dataset.reminder] = toggle.checked;
    localStorage.setItem("emora-notifications", JSON.stringify(notificationSettings));
    if (toggle.checked && "Notification" in window && Notification.permission === "default") await Notification.requestPermission();
  });
});

document.querySelector("#openReports").addEventListener("click", () => setView("check"));
document.querySelector("#exportData").addEventListener("click", () => {
  const data = Object.fromEntries(Object.keys(localStorage).filter((key) => key.startsWith("emora-")).map((key) => [key, localStorage.getItem(key)]));
  const download = document.createElement("a");
  download.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
  download.download = "emora-data-export.json";
  download.click();
  URL.revokeObjectURL(download.href);
});
document.querySelector("#deleteData").addEventListener("click", () => {
  if (!window.confirm("Delete all Emora data saved on this device? This cannot be undone.")) return;
  Object.keys(localStorage).filter((key) => key.startsWith("emora-")).forEach((key) => localStorage.removeItem(key));
  window.location.reload();
});
document.querySelector("#logoutButton").addEventListener("click", () => {
  window.emoraAuth?.signOut();
});

renderProfile();

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
}
