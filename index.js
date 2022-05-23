//Navbar
const menu = document.querySelector(".menu");
const planetList = document.querySelector(".planets");
//Hamburger
menu.addEventListener("click", (event) => {
  planetList.classList.toggle("hide-mobile");
  menu.classList.toggle("opacity");
});
//Close menu only on mobile
planetList.addEventListener("click", (event) => {
  const screenSize = document.documentElement.clientWidth || window.innerWidth;
  if (screenSize <= 835) {
    planetList.classList.toggle("hide-mobile");
  }
});

//Planets
const planets = document.querySelectorAll(".planet");
const planetHeadline = document.querySelector(".planet-headline");
const planetDescription = document.querySelector(".planet-description");
const planetLink = document.querySelector(".planet-link a");
//Specs
const rotationTime = document.querySelector(".rotation-time");
const revolutionTime = document.querySelector(".revolution-time");
const radius = document.querySelector(".radius");
const temp = document.querySelector(".temp");

//Update information function
const updateInformation = (planetName) => {
  fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((entry) => {
        const capitalizedName = entry.name[0] + entry.name.substring(1);

        if (capitalizedName === planetName) {
          planetImage.setAttribute(
            "src",
            `./assets/planet-${planetName.toLowerCase()}.svg`
          );
          planetImage.className = `planet-image ${planetName.toLowerCase()}-img`;
          planetHeadline.innerHTML = entry.name;
          planetDescription.innerHTML = entry.overview.content;
          planetLink.setAttribute("href", entry.overview.source);
          rotationTime.innerHTML = entry.rotation;
          revolutionTime.innerHTML = entry.revolution;
          radius.innerHTML = entry.radius;
          temp.innerHTML = entry.temperature;
        }
      });
    });
};

//Update information
planets.forEach((entry) => {
  entry.addEventListener("click", (event) => {
    if (!event.target.querySelector("a")) {
      document.body.setAttribute("value", event.target.innerHTML);
      surfaceOverlay.classList.add("hide");
      selects.forEach((entry) => {
        entry.className = `select`;
      });
      const screenSize = document.documentElement.clientWidth || window.innerWidth;

      if(screenSize <= 835){
        console.log("hurr")
        document.querySelector('[value="planet"]').classList.add(`select-${document.body.getAttribute("value").toLowerCase()}`)
      } else {
        document.querySelector('[value="planet"]').classList.add(`active-${document.body.getAttribute("value").toLowerCase()}`)
      }
      updateInformation(event.target.innerHTML);
      return;
    }
    document.body.setAttribute(
      "value",
      event.target.querySelector("a").innerHTML
    );
    surfaceOverlay.classList.add("hide");
    selects.forEach((entry) => {
      entry.className = `select`;
    });
    updateInformation(event.target.querySelector("a").innerHTML);
    const screenSize = document.documentElement.clientWidth || window.innerWidth;

    if(screenSize <= 835){
      console.log("hurr")
      document.querySelector('[value="planet"]').classList.add(`select-${document.body.getAttribute("value").toLowerCase()}`)
    } else {
      document.querySelector('[value="planet"]').classList.add(`active-${document.body.getAttribute("value").toLowerCase()}`)
    }
  });
});

//Selects
const selects = document.querySelectorAll(".select");
const planetImage = document.querySelector(".planet-image");
const surfaceOverlay = document.querySelector(".surface-overlay");

selects.forEach((entry) => {
  entry.addEventListener("click", (event) => {
    selects.forEach((entry) => {
      entry.className = `select`;
    });
    const screenSize = document.documentElement.clientWidth || window.innerWidth;
    if(screenSize <= 835){
      selects.forEach((entry) => {
        entry.className = `select`;
      });
      event.target.classList.add(`select-${document.body.getAttribute("value").toLowerCase()}`)

    } else {
      event.target.className = `select active-${document.body
        .getAttribute("value")
        .toLowerCase()}`;
    }
    fetch("./data.json")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((entry) => {
          const currentPlanet = document.body.getAttribute("value");
          const capitalizedName = entry.name[0] + entry.name.substring(1);
          //Find the correct entry
          if (capitalizedName === currentPlanet) {
            const selectType = event.target.getAttribute("value");
            //set correct image
            if (selectType === "geology") {
              surfaceOverlay.setAttribute("src", entry.images[`${selectType}`]);
              surfaceOverlay.classList.remove("hide");
            } else {
              surfaceOverlay.classList.add("hide");
              planetImage.setAttribute("src", entry.images[`${selectType}`]);
            }
            //update planet description
            switch (selectType) {
              case "planet":
                planetDescription.innerHTML = entry.overview.content;
                break;
              case "internal":
                planetDescription.innerHTML = entry.structure.content;
                break;
              case "geology":
                planetDescription.innerHTML = entry.geology.content;
                break;
            }
          }
        });
      });
  });
});
