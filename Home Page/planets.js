const planets = {
  mercury: {
    name: "Mercury",
    type: "The planet closest to the Sun",
    text: "Mercury is the smallest planet in the Solar System and travels around the Sun faster than any other planet. Its surface is covered with craters because it has almost no atmosphere to protect its rocky surface from impacts. One solar day on Mercury lasts about 176 Earth days, while one year lasts only 88 days. Temperatures change extremely: the illuminated side becomes very hot, while the side in darkness becomes extremely cold. One of the most interesting things is that in some craters near the poles, where sunlight almost never reaches, there may be ice.",
    facts: ["Year: 88 days", "No moons", "Smallest planet", "Rocky surface"]
  },

  venus: {
    name: "Venus",
    type: "The hottest planet",
    text: "Venus is similar in size to Earth, but its conditions are completely different. Its very dense atmosphere, rich in carbon dioxide, creates an extreme greenhouse effect that makes it the hottest planet in the Solar System. Its clouds contain sulfuric acid, and the planet's rotation is unusual: Venus rotates in the opposite direction to most planets. An amazing fact is that one day on Venus lasts longer than one year on the planet. Its surface contains large volcanic plains and mountains, making Venus a natural laboratory for understanding planetary climates.",
    facts: ["Year: 225 days", "No moons", "Very dense atmosphere", "Retrograde rotation"]
  },

  earth: {
    name: "Earth",
    type: "Our planet",
    text: "Earth is the only known planet where life exists. Liquid water covers most of its surface, and its atmosphere has the right composition to support millions of forms of life. Earth has a magnetic field that helps protect it from particles carried by the solar wind. Tectonic plates slowly move and change the continents, create mountains, and are connected to earthquakes and volcanoes. Our Moon affects the tides and the movement of Earth's oceans. From space, Earth appears as a bright blue dot, a view that has inspired many explorers and scientists.",
    facts: ["Year: 365.25 days", "1 Moon", "Liquid water", "Known life"]
  },

  mars: {
    name: "Mars",
    type: "The Red Planet",
    text: "Mars is known as the Red Planet because of iron-rich minerals on its surface that have oxidized and give the planet its characteristic color. It has enormous mountains, deep valleys, and strong evidence suggesting that liquid water may have existed on its surface in the past. Olympus Mons is the largest known volcano in the Solar System, while Valles Marineris is a colossal canyon system. Mars has two small moons, Phobos and Deimos, and it is one of the main targets of scientific research into the possibility of past life.",
    facts: ["Year: 687 days", "2 moons", "Olympus Mons", "Giant canyons"]
  },

  jupiter: {
    name: "Jupiter",
    type: "The gas giant",
    text: "Jupiter is the largest planet in the Solar System and has more mass than all the other planets combined, although it is mostly made of gas. Its atmosphere contains powerful bands of clouds and enormous storms. The most famous is the Great Red Spot, a massive storm that has been observed for centuries. Jupiter has a rich system of moons, including Io, which has powerful volcanic activity, Europa, which may have an ocean beneath its icy surface, and Ganymede, the largest moon in the Solar System. Its magnetic field is extremely powerful.",
    facts: ["Year: 11.86 years", "Largest planet", "Giant storms", "Many moons"]
  },

  saturn: {
    name: "Saturn",
    type: "The ringed planet",
    text: "Saturn is a gas giant that is immediately recognizable because of its spectacular rings. The rings are made mostly of pieces of ice and rock, ranging from microscopic particles to much larger blocks. Although Saturn looks enormous and heavy, its average density is lower than that of water. Its atmosphere contains extremely powerful winds, and a hexagonal atmospheric structure has been observed at its north pole. Saturn's moon Titan has a dense atmosphere and lakes and seas of hydrocarbons on its surface, making it an incredibly interesting world for scientists.",
    facts: ["Year: 29.5 years", "Large rings", "Titan", "Gas giant"]
  },

  uranus: {
    name: "Uranus",
    type: "The ice giant",
    text: "Uranus is an ice giant with a very unusual feature: its axis is tilted so dramatically that the planet appears to rotate while lying on its side. This causes extreme seasons that last for many years. Its blue-green color comes mainly from methane in its upper atmosphere, which absorbs red light. Uranus has faint rings and many moons. Because of its great distance from the Sun, one year on Uranus lasts about 84 Earth years. Although it is often overshadowed by the more famous planets, Uranus is one of the strangest worlds in the Solar System.",
    facts: ["Year: 84 years", "27 moons", "Highly tilted axis", "Blue-green color"]
  },

  neptune: {
    name: "Neptune",
    type: "The farthest planet",
    text: "Neptune is the eighth and farthest planet from the Sun. It has a deep blue color, and its atmosphere is characterized by incredibly fast winds. Despite receiving very little energy from the Sun, Neptune's atmosphere is dynamic and contains storms that can appear and disappear over time. The planet has a faint ring system and many moons, the largest of which is Triton. Triton has an unusual orbit and is believed to be an object that was captured from outside Neptune's original system.",
    facts: ["Year: 164.8 years", "14 moons", "Extremely fast winds", "Farthest planet"]
  }
};


const modal = document.getElementById("planetModal");
const modalPlanet = document.getElementById("modalPlanet");
const modalTitle = document.getElementById("modalTitle");
const modalType = document.getElementById("modalType");
const modalText = document.getElementById("modalText");
const modalFacts = document.getElementById("modalFacts");
const closeModal = document.getElementById("closeModal");


function openPlanet(key) {
  const p = planets[key];
  if (!p) return;

  modalPlanet.className = "modal-planet " + key;
  modalTitle.textContent = p.name;
  modalType.textContent = p.type;
  modalText.textContent = p.text;
  modalFacts.innerHTML = p.facts
    .map(f => `<span class="fact">${f}</span>`)
    .join("");

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}


function closePlanet() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}


document.querySelectorAll("[data-planet]").forEach(el => {
  el.addEventListener("click", () => openPlanet(el.dataset.planet));
});


closeModal.addEventListener("click", closePlanet);


modal.addEventListener("click", (e) => {
  if (e.target === modal) closePlanet();
});


document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closePlanet();
});


document.getElementById("sun").addEventListener("click", () => {

  modalPlanet.className = "modal-planet";

  modalPlanet.style.background =
    "radial-gradient(circle at 35% 30%, #fff9ae, #ffc21f 38%, #ff6a00 75%)";

  modalTitle.textContent = "The Sun";

  modalType.textContent =
    "The star at the center of the Solar System";

  modalText.textContent =
    "The Sun is a star and the main source of light and energy for the Solar System. It contains most of the mass of the entire system, and its gravity keeps planets, asteroids, and other objects in their orbits. The Sun's energy is produced in its core through nuclear fusion, where hydrogen is converted into helium. The sunlight we see takes about eight minutes to travel from the Sun to Earth. Without solar energy, the climate, water cycle, and life as we know it would be completely different.";

  modalFacts.innerHTML = [
    "Star",
    "Center of the Solar System",
    "Light for Earth",
    "Nuclear fusion"
  ]
    .map(f => `<span class="fact">${f}</span>`)
    .join("");

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
});