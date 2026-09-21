const toast = document.getElementById("toast");
const missionBtn = document.getElementById("missionBtn");
const liveBtn = document.getElementById("liveBtn");
const exploreBtn = document.getElementById("exploreBtn");
const searchInput = document.getElementById("searchInput");
const pauseBtn = document.getElementById("pauseBtn");
const stars = document.querySelector(".stars");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

missionBtn.addEventListener("click", () => {
  document.getElementById("missions").scrollIntoView({ behavior: "smooth" });
});

liveBtn.addEventListener("click", () => {
  showToast("Live mission feed coming soon 🚀");
});

exploreBtn.addEventListener("click", () => {
  document.getElementById("gallery").scrollIntoView({ behavior: "smooth" });
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const value = searchInput.value.trim();

    if (value === "") {
      showToast("Type something to search.");
    } else {
      showToast(`Searching for "${value}"...`);
    }
  }
});

let paused = false;

pauseBtn.addEventListener("click", () => {
  paused = !paused;

  if (paused) {
    stars.style.animationPlayState = "paused";
    stars.style.setProperty("--animation-state", "paused");
    pauseBtn.textContent = "▶";
  } else {
    stars.style.animationPlayState = "running";
    pauseBtn.textContent = "Ⅱ";
  }
});

document.querySelectorAll(".arrow").forEach((button) => {
  button.addEventListener("click", () => {
    showToast("Mission information selected.");
  });
});
