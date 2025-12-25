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
let revealIndex = 1; // first line handled separately
let revealInterval;
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
      return;
    }
    revealElements[revealIndex].classList.add("visible");
    revealIndex++;
  }, 2000);
}

/* STILLNESS */
let stillnessTimer;
const stillness = document.createElement("div");
stillness.id = "stillness";
stillness.textContent = "you don’t have to rush.";
document.body.appendChild(stillness);

function startStillnessTimer() {
  clearTimeout(stillnessTimer);
  stillnessTimer = setTimeout(() => {
    stillness.style.opacity = 1;
  }, 7000);
}

function resetStillness() {
  stillness.style.opacity = 0;
  startStillnessTimer();
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
  document.body.classList.add("crumbling");
  setTimeout(showLoveFill, 1600);
});

function showLoveFill() {
  const love = document.createElement("div");
  love.id = "love-fill";
  love.innerHTML = `
    <p>
      i love you :)<br>
      i love you :)<br>
      i love you :)<br>
      i love you :)<br>
      i love you :)
    </p>
  `;
  document.body.appendChild(love);
  love.style.display = "flex";
}

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
