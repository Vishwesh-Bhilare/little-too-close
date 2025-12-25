/* PASSWORD */
const passwordInput = document.getElementById("password");
const lockScreen = document.getElementById("lock-screen");
const content = document.getElementById("content");
const errorText = document.getElementById("lock-error");

passwordInput.addEventListener("input", () => {
  if (passwordInput.value.toLowerCase() === "sher") {
    lockScreen.style.display = "none";
    content.classList.remove("hidden");
    revealOnLoad();
  } else if (passwordInput.value.length === 4) {
    errorText.style.opacity = 1;
    setTimeout(() => errorText.style.opacity = 0, 1200);
    passwordInput.value = "";
  }
});

/* SCROLL REVEAL */
const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px"
  }
);

revealElements.forEach(el => observer.observe(el));

function revealOnLoad() {
  // reveal above-the-fold content softly
  setTimeout(() => {
    document.querySelectorAll(".intro .reveal").forEach(el => {
      el.classList.add("visible");
    });
  }, 300);
}

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
