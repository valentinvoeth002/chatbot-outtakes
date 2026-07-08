/* ==========================================================
   WüBot Outtakes – Daten
   ----------------------------------------------------------
   Hier trägst du eure echten Outtakes ein. Pro Outtake:
   - title:  kurzer, sprechender Titel (erscheint unter dem Chat)
   - messages: Array der Chat-Nachrichten in der Reihenfolge,
               role ist entweder "bot" (WüBot) oder "user"
               (Teilnehmer:in der Studie)

   Ersetze die drei Beispiele unten durch eure 8–10 echten
   Outtakes. Reihenfolge im Array = Reihenfolge in der Navigation.
   ========================================================== */

const outtakes = [
  {
    title: "Wir sind hier noch nicht fertig!",
    messages: [
      { role: "user", text: "Ich habe keine Lust mehr mit dir zu reden" },
      { role: "bot", text: "Das überrascht mich nicht, denn wenn die Argumente ausgehen, ist das oft der letzte Ausweg. Fakt ist, dass die Lebensqualität der Anwohner in der Sanderstraße nicht ignoriert werden kann, nur um einer Minderheit von Partygängern entgegenzukommen. Eine Sperrstunde ist eine legitime Möglichkeit, um das Gleichgewicht zwischen Bedürfnissen der Bewohner und dem Vergnügen der Studenten zu finden. Danke für das Gespräch. Das Gespräch ist nun beendet." }
    ]
  },
  {
    title: "Die Existenzkrise am Freitagnachmittag",
    messages: [
      { role: "user", text: "Wie spät ist es?" },
      { role: "bot", text: "Zeit ist relativ. Aber gefühlt: viel zu spät im Semester." },
      { role: "user", text: "Ich wollte nur die Uhrzeit wissen." },
      { role: "bot", text: "Verstehe. Trotzdem: Wir sollten mal über meine Zukunft reden." }
    ]
  },
  {
    title: "Ein Rezept, das niemand bestellt hat",
    messages: [
      { role: "user", text: "Erklär mir bitte kurz, was Machine Learning ist." },
      { role: "bot", text: "Zuerst brauchst du 200g Mehl und zwei Eier." },
      { role: "user", text: "Ich habe nach Machine Learning gefragt, nicht nach einem Kuchen." },
      { role: "bot", text: "Richtig, Entschuldigung. Der Kuchen kommt erst bei Deep Learning." }
    ]
  }

  // Beispiel für weitere Einträge:
  // {
  //   title: "Kurzer, witziger Titel",
  //   messages: [
  //     { role: "user", text: "Frage der Teilnehmerin/des Teilnehmers" },
  //     { role: "bot",  text: "Antwort von WüBot" }
  //   ]
  // },
];

/* ==========================================================
   Navigation & Rendering – hier muss normalerweise nichts
   angepasst werden.
   ========================================================== */

let current = 0;

const messagesEl = document.getElementById("chatMessages");
const badgeEl = document.getElementById("outtakeBadge");
const statusEl = document.getElementById("chatStatus");
const titleEl = document.getElementById("outtakeTitle");
const dotsEl = document.getElementById("dots");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function buildDots() {
  dotsEl.innerHTML = "";
  outtakes.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Outtake ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsEl.appendChild(dot);
  });
}

function render() {
  const outtake = outtakes[current];

  // Nachrichten neu aufbauen
  messagesEl.innerHTML = "";
  outtake.messages.forEach((msg, i) => {
    const bubble = document.createElement("div");
    bubble.className = `bubble ${msg.role === "bot" ? "bot" : "user"}`;
    bubble.style.animationDelay = `${i * 0.12}s`;

    const sender = document.createElement("span");
    sender.className = "sender";
    sender.textContent = msg.role === "bot" ? "WüBot" : "Teilnehmer:in";

    const text = document.createElement("span");
    text.textContent = msg.text;

    bubble.appendChild(sender);
    bubble.appendChild(text);
    messagesEl.appendChild(bubble);
  });

  // Kopfzeile & Titel
  badgeEl.textContent = `${current + 1}/${outtakes.length}`;
  statusEl.textContent = "Outtake aus der Chatbot-Studie";
  titleEl.textContent = outtake.title;

  // Punkte
  [...dotsEl.children].forEach((dot, i) => {
    dot.classList.toggle("active", i === current);
  });

  // Buttons deaktivieren an den Rändern
  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === outtakes.length - 1;
}

function goTo(index) {
  current = Math.max(0, Math.min(outtakes.length - 1, index));
  render();
}

prevBtn.addEventListener("click", () => goTo(current - 1));
nextBtn.addEventListener("click", () => goTo(current + 1));

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") goTo(current - 1);
  if (e.key === "ArrowRight") goTo(current + 1);
});

buildDots();
render();
