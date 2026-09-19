let phrases = window.KG_PHRASES || ["I am a data analyst","I am a process consultant","I am a business analyst","I am an environmental scientist"];

const target = document.getElementById("typewriter");
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;
let timer = null;

function typeLoop() {
  const phrase = phrases[phraseIndex];
  target.textContent = deleting
    ? phrase.slice(0, charIndex--)
    : phrase.slice(0, charIndex++);

  let delay = deleting ? 42 : 75;

  if (!deleting && charIndex > phrase.length) {
    delay = 1700;
    deleting = true;
  } else if (deleting && charIndex < 0) {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    charIndex = 0;
    delay = 450;
  }

  timer = setTimeout(typeLoop, delay);
}

document.getElementById("year").textContent = new Date().getFullYear();
typeLoop();

// When the language is switched, restart the typewriter with the new phrases
window.addEventListener("languagechange", function () {
  if (!window.KG_PHRASES) return;
  phrases = window.KG_PHRASES;
  clearTimeout(timer);
  phraseIndex = 0;
  charIndex = 0;
  deleting = false;
  target.textContent = "";
  typeLoop();
});
