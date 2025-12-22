const hugsContainer = document.querySelector(".hugs");
const hugSymbols = ["🫂", "🤍", "💗"];

function createHug() {
  const hug = document.createElement("span");
  hug.textContent = hugSymbols[Math.floor(Math.random() * hugSymbols.length)];
  hug.style.left = Math.random() * 100 + "vw";
  hug.style.animationDuration = 8 + Math.random() * 6 + "s";
  hugsContainer.appendChild(hug);

  setTimeout(() => {
    hug.remove();
  }, 14000);
}

setInterval(createHug, 900);
