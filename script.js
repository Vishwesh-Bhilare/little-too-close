/* PASSWORD */
const passwordInput = document.getElementById("password");
const lockScreen = document.getElementById("lock-screen");
const content = document.getElementById("content");
const errorText = document.getElementById("lock-error");

passwordInput.addEventListener("input", () => {
  if (passwordInput.value.toLowerCase() === "sher") {
    lockScreen.style.display = "none";
    content.classList.remove("hidden");
    revealImmediately();
    startTimedReveal();
    startStillnessTimer();
  } else if (passwordInput.value.length === 4) {
    errorText.style.opacity = 1;
    setTimeout(() => errorText.style.opacity = 0, 1200);
    passwordInput.value = "";
  }
});

/* REVEAL */
const revealElements = Array.from(document.querySelectorAll(".reveal"));
let revealIndex = 1; // first line shown instantly
let revealInterval = null;
let paused = false;

function revealImmediately() {
  revealElements[0]?.classList.add("visible");
}

function startTimedReveal() {
  revealInterval = setInterval(() => {
    if (paused) return;

    if (revealIndex >= revealElements.length) {
      clearInterval(revealInterval);
      showCrumbleButton();
      stopStillnessTimer();
      return;
    }

    revealElements[revealIndex].classList.add("visible");
    revealIndex++;
  }, 2000);
}

/* STILLNESS */
const stillness = document.getElementById("stillness");
let stillnessTimer = null;

function startStillnessTimer() {
  resetStillness();
}

function resetStillness() {
  if (document.body.classList.contains("crumbling")) return;

  stillness.style.opacity = 0;
  clearTimeout(stillnessTimer);

  stillnessTimer = setTimeout(() => {
    stillness.style.opacity = 1;
  }, 7000);
}

function stopStillnessTimer() {
  clearTimeout(stillnessTimer);
  stillness.style.opacity = 0;
}

["scroll", "mousedown", "touchstart", "keydown"].forEach(evt => {
  document.addEventListener(evt, resetStillness);
});

/* LONG PRESS PAUSE */
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

/* CRUMBLE */
const crumbleBtn = document.createElement("button");
crumbleBtn.id = "crumble-btn";
crumbleBtn.textContent = "crumble";
document.querySelector(".closing").appendChild(crumbleBtn);

function showCrumbleButton() {
  crumbleBtn.style.display = "block";
}

crumbleBtn.addEventListener("click", () => {
  stopStillnessTimer();
  paused = true;
  document.body.classList.add("crumbling");

  setTimeout(() => {
    document.getElementById("love-fill").style.display = "flex";
  }, 1600);
});

/* LOVE FILL TOUCH INTERACTION */
const loveFill = document.getElementById("love-fill");

function warmLove() {
  loveFill.classList.add("warm");
}

function coolLove() {
  loveFill.classList.remove("warm");
}

["mousedown", "touchstart"].forEach(evt => {
  loveFill.addEventListener(evt, warmLove);
});

["mouseup", "mouseleave", "touchend", "touchcancel"].forEach(evt => {
  loveFill.addEventListener(evt, coolLove);
});


/* HUGS */
const hugSymbols = ["🫂", "🤍", "💗"];

setInterval(() => {
  if (paused) return;

  const hug = document.createElement("span");
  hug.textContent = hugSymbols[Math.floor(Math.random() * hugSymbols.length)];
  hug.style.left = Math.random() * 100 + "vw";
  hug.style.animationDuration = 8 + Math.random() * 6 + "s";
  hugsContainer.appendChild(hug);

  setTimeout(() => hug.remove(), 14000);
}, 900);
