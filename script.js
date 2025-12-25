/* PASSWORD */
const passwordInput = document.getElementById("password");
const lockScreen = document.getElementById("lock-screen");
const content = document.getElementById("content");
const errorText = document.getElementById("lock-error");

passwordInput.addEventListener("input", () => {
  if (passwordInput.value.toLowerCase() === "sher") {
    lockScreen.style.display = "none";
    content.classList.remove("hidden");
    startTimedReveal();
  } else if (passwordInput.value.length === 4) {
    errorText.style.opacity = 1;
    setTimeout(() => errorText.style.opacity = 0, 1200);
    passwordInput.value = "";
  }
});

/* TIMED LINE-BY-LINE REVEAL */
const revealElements = Array.from(document.querySelectorAll(".reveal"));
let revealIndex = 0;
let revealInterval = null;
let paused = false;

function startTimedReveal() {
  revealInterval = setInterval(() => {
    if (paused) return;
    if (revealIndex >= revealElements.length) {
      clearInterval(revealInterval);
      return;
    }
    revealElements[revealIndex].classList.add("visible");
    revealIndex++;
  }, 2000);
}

/* LONG PRESS = PAUSE */
const hugsContainer = document.querySelector(".hugs");

function pauseEverything() {
  paused = true;
  hugsContainer.classList.add("paused");
}

function resumeEverything() {
  paused = false;
  hugsContainer.classList.remove("paused");
}

document.addEventListener("mousedown", pauseEverything);
document.addEventListener("touchstart", pauseEverything);

document.addEventListener("mouseup", resumeEverything);
document.addEventListener("mouseleave", resumeEverything);
document.addEventListener("touchend", resumeEverything);

/* HIDDEN MESSAGE */
document.querySelector(".click-reveal").addEventListener("click", () => {
  document.getElementById("hidden-message").style.display = "block";
});

/* FLOATING HUGS */
const hugSymbols = ["🫂", "🤍", "💗"];

function createHug() {
  const hug = document.createElement("span");
  hug.textContent = hugSymbols[Math.floor(Math.random() * hugSymbols.length)];
  hug.style.left = Math.random() * 100 + "vw";
  hug.style.animationDuration = 8 + Math.random() * 6 + "s";
  hugsContainer.appendChild(hug);

  setTimeout(() => hug.remove(), 14000);
}

setInterval(createHug, 900);
