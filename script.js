/* PASSWORD LOGIC */
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
