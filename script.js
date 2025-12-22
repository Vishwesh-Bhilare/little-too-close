/* PASSWORD */
const passwordInput = document.getElementById("password");
const lockScreen = document.getElementById("lock-screen");
const content = document.getElementById("content");
const errorText = document.getElementById("lock-error");

passwordInput.addEventListener("input", () => {
  if (passwordInput.value.toLowerCase() === "sher") {
    lockScreen.style.display = "none";
    content.classList.remove("hidden");
  } else if (passwordInput.value.length === 4) {
    errorText.style.opacity = 1;
    setTimeout(() => errorText.style.opacity = 0, 1200);
    passwordInput.value = "";
  }
});

/* HIDDEN MESSAGE */
document.querySelector(".click-reveal").addEventListener("click", () => {
  document.getElementById("hidden-message").style.display = "block";
});

/* FLOATING HUGS */
const hugsContainer = document.querySelector(".hugs");
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

/* LONG PRESS / HOLD */
let holdTimer;
const holdOverlay = document.getElementById("hold-overlay");

function startHold() {
  holdTimer = setTimeout(() => {
    hugsContainer.classList.add("paused");
    holdOverlay.style.opacity = 1;
  }, 500); // intentional delay
}

function endHold() {
  clearTimeout(holdTimer);
  hugsContainer.classList.remove("paused");
  holdOverlay.style.opacity = 0;
}

document.addEventListener("mousedown", startHold);
document.addEventListener("touchstart", startHold);

document.addEventListener("mouseup", endHold);
document.addEventListener("mouseleave", endHold);
document.addEventListener("touchend", endHold);
