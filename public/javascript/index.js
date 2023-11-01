const charactersAPI = new APIHandler("http://localhost:8000");

const createCard = (element) => {
  const mainDiv = document.querySelector(".characters-container");

  const charInfo = document.createElement("div");
  mainDiv.appendChild(charInfo);
  charInfo.classList.add("character-info");
  const charName = document.createElement("div");
  charName.innerHTML = `name:${element.name}`;
  charInfo.appendChild(charName);
  charName.classList.add("name");
  const charOccupation = document.createElement("div");
  charOccupation.innerHTML = `occupation: ${element.occupation}`;
  charInfo.appendChild(charOccupation);
  charOccupation.classList.add("occupation");
  const charCartoon = document.createElement("div");
  charCartoon.innerHTML = `cartoon: ${element.cartoon}`;
  charInfo.appendChild(charCartoon);
  charCartoon.classList.add("cartoon");
  const charWeapon = document.createElement("div");
  charWeapon.innerHTML = `weapon: ${element.weapon}`;
  charInfo.appendChild(charWeapon);
  charWeapon.classList.add("weapon");
};

window.addEventListener("load", () => {
  document
    .getElementById("fetch-all")
    .addEventListener("click", function (event) {
      const mainDiv = document.querySelector(".characters-container");
      mainDiv.innerHTML = "";
      charactersAPI
        .getFullList()
        .then((allCharacters) => {
          allCharacters.data.forEach((element) => {
            createCard(element);
          });
        })
        .catch((error) => {
          console.error(error);
        });
    });

  document
    .getElementById("fetch-one")
    .addEventListener("click", function (event) {
      const characterId = document.getElementsByName("character-id")[0].value;

      charactersAPI
        .getOneRegister(characterId)
        .then((characterId) => {
          const element = characterId.data;
          const mainDiv = document.querySelector(".characters-container");
          mainDiv.innerHTML = "";

          createCard(element);
        })

        .catch((error) => {
          console.error(error);
        });
    });

  document
    .getElementById("delete-one")
    .addEventListener("click", function (event) {
      const characterId = document.getElementsByName("character-id-delete")[0]
        .value;

      charactersAPI
        .deleteOneRegister(characterId)
        .then((character) => {
          document.getElementById("delete-one").style.backgroundColor = "green";
        })

        .catch((error) => {
          document.getElementById("delete-one").style.backgroundColor = "red";
          console.error(error);
        });
    });

  document
    .getElementById("edit-character-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const id = document.getElementById("edit-id").value;
      const name = document.getElementById("edit-name").value;
      const occupation = document.getElementById("edit-occupation").value;
      const weapon = document.getElementById("edit-weapon").value;
      const cartoon = document.getElementById("edit-cartoon").value;

      const characterInfo = {
        id: id,
        name: name,
        occupation: occupation,
        weapon: weapon,
        cartoon: cartoon,
      };

      charactersAPI
        .updateOneRegister(characterInfo)
        .then((character) => {
          document.getElementById("send-data").style.backgroundColor = "green";
        })

        .catch((error) => {
          document.getElementById("send-data").style.backgroundColor = "red";
          console.error(error);
        });
    });

  document
    .getElementById("new-character-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("create-name").value;
      const occupation = document.getElementById("create-occupation").value;
      const cartoon = document.getElementById("create-cartoon").value === "on";
      const weapon = document.getElementById("create-weapon").value;

      const characterInfo = {
        name: name,
        occupation: occupation,
        weapon: weapon,
        cartoon: cartoon,
      };

      charactersAPI
        .createOneRegister(characterInfo)
        .then((character) => {
          document.getElementById("send-data").style.backgroundColor = "green";
        })

        .catch((error) => {
          document.getElementById("send-data").style.backgroundColor = "red";
          console.error(error);
        });
    });
});
