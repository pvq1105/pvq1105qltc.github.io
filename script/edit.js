"use strict";

document.getElementById("sidebar").addEventListener("click", function () {
  //gắn sự kiện click sidebar
  document.getElementById("sidebar").classList.toggle("active");
});

const petEdit = getFromStorage("pets");
const tableBodyEdit = document.getElementById("tbody");
const mainInput = document.getElementById("main");
const btnSubmit = document.getElementById("submit-btn");
const displayBreedEdit = getFromStorage("breed"); //lấy dữ liệu từ localstorage

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

function renderTableEdit(petEdit) {
  tableBodyEdit.innerHTML = "";
  for (let i = 0; i < petEdit.length; i++) {
    let vaccinatedText = petEdit[i].vaccinated
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill";
    let dewormedText = petEdit[i].dewormed
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill";
    let sterilizedText = petEdit[i].sterilized
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill";

    const row = document.createElement("tr");
    row.innerHTML = `<th scope = ""row">${petEdit[i].id}</th>
      <td>${petEdit[i].name}</td>
          <td>${petEdit[i].age}</td>
          <td>${petEdit[i].type}</td>
          <td>${petEdit[i].weight} kg</td>
          <td>${petEdit[i].length} cm</td>
          <td>${petEdit[i].breed}</td>
          <td>
          <i class = " bi bi-square-fill" style = "color : ${petEdit[i].color}"></i></td>
          <td><i class="${vaccinatedText}"></i></td>
          <td><i class="${dewormedText}"></i></td>
          <td><i class="${sterilizedText}"></i></td>
          <td>${petEdit[i].date}</td>
          <td>
          <button class="btn btn-warning" onclick="editPet('${petEdit[i].id}')">edit</button>
        </td>`;

    tableBodyEdit.appendChild(row);
  }
}
renderTableEdit(petEdit);

mainInput.style.display = "none";
let editPet = (id) => {
  mainInput.style.display = "block";
  let vitriEdit = petEdit.findIndex((pet) => pet.id == id);
  idInput.value = petEdit[vitriEdit].id;
  nameInput.value = petEdit[vitriEdit].name;
  ageInput.value = petEdit[vitriEdit].age;
  typeInput.value = petEdit[vitriEdit].type;
  weightInput.value = petEdit[vitriEdit].weight;
  lengthInput.value = petEdit[vitriEdit].length;
  colorInput.value = petEdit[vitriEdit].color;
  breedInput.value = petEdit[vitriEdit].breed;
  vaccinatedInput.checked = petEdit[vitriEdit].vaccinated;
  dewormedInput.checked = petEdit[vitriEdit].dewormed;
  sterilizedInput.checked = petEdit[vitriEdit].sterilized;

  const petnew = [];
  /*--------xử lý dữ liệu lên form input----------- */
  console.log(petEdit.splice(vitriEdit, 1)); //mảng click edit, bỏ đi mảng, và thêm vào mảng mới khi submit
};
/* healthyBtn show dữ liệu pet khoe mạnh*/
/****************************** */
btnSubmit.addEventListener("click", function () {
  const data = {};
  data.id = idInput.value; /*nhập id vào forn */
  data.age = ageInput.value; /*nhập tuổi vào forn */
  data.name = nameInput.value; /*nhập tên vào forn */
  data.type = typeInput.value; /*chọn select vào forn */
  data.weight = weightInput.value; /*nhập chiều cao vào forn */
  data.length = lengthInput.value; /*nhập cân nặng vào forn */
  data.color = colorInput.value; /*nhập màu vào forn */
  data.breed = breedInput.value; /*nhập tình trạng vào forn */
  data.vaccinated = vaccinatedInput.checked; /*check box vào forn */
  data.dewormed = dewormedInput.checked; /*check box vào forn */
  data.sterilized = sterilizedInput.checked; /*check box vào forn */
  data.date = new Date();
  function validateData(data) {
    /*hiện thông báo khi nhập dữ liệu không hợp lệ */ let kq = true;
    if (data.id === "") {
      kq = false;
      alert(" không để trống dữ liệu");
    }
    if (data.name === "") {
      kq = false;
      alert(" vui lòng nhập tên pet");
    }
    if (data.age > 15 || data.age < 1) {
      kq = false;
      alert("Age must be between 1 and 15!");
    }
    if (data.weight > 15 || data.weight < 1) {
      kq = false;
      alert("Weight must be between 1 and 15!");
    }
    if (data.length > 100 || data.length < 1) {
      kq = false;
      alert("Length must be between 1 and 100!");
    }
    if (data.type === "Select Type") {
      kq = false;
      alert("Please select Type!");
    }
    return kq;
  }

  const validate = validateData(data);
  if (validate) {
    petEdit.push(data);
    renderTableEdit(petEdit);
    editPet(petEdit);
    mainInput.style.display = "none";
  }
});
myFunction(displayBreedEdit);
/* lấy dữ liệu theo typeInput cho Breed */
function myFunction() {
  //onchange
  breedInput.innerHTML = typeInput.value;
  let breeds = displayBreedEdit.filter(
    (displayBreedEdit) => displayBreedEdit.type === typeInput.value
  );
  for (let i = 0; i < breeds.length; i++) {
    const option = document.createElement("option");
    option.innerHTML = `${breeds[i].breedName}`;
    breedInput.appendChild(option);
  }
}
function tai_lai_trang() {
  location.reload();
}
