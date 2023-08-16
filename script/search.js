"use strict";

document.getElementById("sidebar").addEventListener("click", function () {
  //gắn sự kiện click sidebar
  document.getElementById("sidebar").classList.toggle("active");
});

const petFind = getFromStorage("pets");
const tableBodyFind = document.getElementById("tbody");
const btnFind = document.getElementById("find-btn");

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
/*-------------------------------------- */
const seachBreed = getFromStorage("breed");
/* lấy dữ liệu theo typeInput cho Breed */
function myFunction() {
  //onchange
  breedInput.innerHTML = "";
  let breeds = seachBreed.filter(
    (seachBreed) => seachBreed.type === typeInput.value
  );
  for (let i = 0; i < breeds.length; i++) {
    const option = document.createElement("option");
    option.innerHTML = `${breeds[i].breedName}`;
    breedInput.appendChild(option);
  }
}
/*-------------------------------------- */
renderTableFind(petFind);
function renderTableFind(petFind) {
  tableBodyFind.innerHTML = "";
  for (let i = 0; i < petFind.length; i++) {
    let vaccinatedText = petFind[i].vaccinated
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill";
    let dewormedText = petFind[i].dewormed
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill";
    let sterilizedText = petFind[i].sterilized
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill";

    const row = document.createElement("tr");
    row.innerHTML = `<th scope = ""row">${petFind[i].id}</th>
        <td>${petFind[i].name}</td>
            <td>${petFind[i].age}</td>
            <td>${petFind[i].type}</td>
            <td>${petFind[i].weight} kg</td>
            <td>${petFind[i].length} cm</td>
            <td>${petFind[i].breed}</td>
            <td>
            <i class = " bi bi-square-fill" style = "color : ${petFind[i].color}"></i></td>
            <td><i class="${vaccinatedText}"></i></td>
            <td><i class="${dewormedText}"></i></td>
            <td><i class="${sterilizedText}"></i></td>
            <td>${petFind[i].date}</td>`;

    tableBodyFind.appendChild(row);
    const data = {};
    btnFind.addEventListener("click", function () {
      data.id = idInput.value;
      data.name = nameInput.value;
      data.type = typeInput.value;
      data.breed = breedInput.value;
      data.vaccinated = vaccinatedInput.checked; /*check box vào forn */
      data.dewormed = dewormedInput.checked; /*check box vào forn */
      data.sterilized = sterilizedInput.checked; /*check box vào forn */
      // console.log(data);
      // if (data.id === petFind[i].id) {
      //   console.log(petFind);
      // }
      // const seachID = petFind.filter((petFind) => petFind.id === data.id);
      // console.log(seachID);
      // const seachName = petFind.filter((petFind) => petFind.name === data.name);
      // const seachType = petFind.filter((petFind) => petFind.type === data.type);
      // const seachAll = petFind.filter(
      //   (petFind) =>
      //     petFind.type === data.type &&
      //     petFind.name === data.name &&
      //     petFind.type === data.type
      // );
      // let searchFilters = [];
      // searchFilters = petFind.filter((petFind) =>
      //   petFind.id.includes(petFind.id)
      // );
      // console.log(searchFilters);
      // searchFilters = petFind.filter((petFind) =>
      //   petFind.id.includes(petFind.id)
      // );
      // console.log(searchFilters);
      // renderTableFind(petFind);
      let foundPet = petFind;
      if (data.id != "") {
        foundPet = foundPet.filter((pet) => pet.id.includes(data.id));
      }

      if (data.name != "")
        foundPet = foundPet.filter((pet) => pet.name.includes(data.name));
      if (data.type != "") {
        foundPet = foundPet.filter((pet) => pet.type === data.type);
      }
      if (data.vaccinated != "") {
        foundPet = foundPet.filter((pet) => pet.vaccinated === data.vaccinated);
      }
      if (data.dewormed != "") {
        foundPet = foundPet.filter((pet) => pet.dewormed === data.dewormed);
      }
      if (data.sterilized != "") {
        foundPet = foundPet.filter((pet) => pet.sterilized === data.sterilized);
      }
      console.log(foundPet);
      renderTableFind(foundPet);
    });
  }
}
