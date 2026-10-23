const scenes = [...document.querySelectorAll(".scene")];
const navLinks = [...document.querySelectorAll(".chapter-nav a")];
const music = document.getElementById("background-music");
const musicToggle = document.getElementById("music-toggle");
const revealButton = document.getElementById("reveal-proposal");
const proposalQuestion = document.getElementById("proposal-question");

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      const index = scenes.indexOf(entry.target);
      navLinks.forEach((link, i) => link.classList.toggle("active", i === index));
    }
  }
}, { threshold: 0.52 });

scenes.forEach(scene => observer.observe(scene));

musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicToggle.setAttribute("aria-pressed", "true");
      musicToggle.querySelector("span").textContent = "Выключить музыку";
    } catch {
      musicToggle.querySelector("span").textContent = "Добавь audio/music.mp3";
    }
  } else {
    music.pause();
    musicToggle.setAttribute("aria-pressed", "false");
    musicToggle.querySelector("span").textContent = "Включить музыку";
  }
});

revealButton.addEventListener("click", () => {
  proposalQuestion.hidden = false;
  revealButton.hidden = true;
  proposalQuestion.scrollIntoView({ behavior: "smooth", block: "center" });
});
