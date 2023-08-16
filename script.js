"use strict";
const submitBtn = document.getElementById("submit-btn");
const healthyBtn = document.getElementById("healthy-btn"); /*lọc thú cưng */
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
const tableBodyEl = document.getElementById("tbody");
/*................................*/
/*kiểu dữ liệu nhập vào form input */
const data = {
  id: idInput.value,
  name: nameInput.value,
  age: parseInt(ageInput.value),
  type: typeInput.value,
  weight: weightInput.value,
  length: lengthInput.value,
  color: colorInput.value,
  breed: breedInput.value,
  vaccinated: vaccinatedInput.checked,
  dewormed: dewormedInput.checked,
  sterilized: sterilizedInput.checked,
  date: new Date(),
};
let petArr;

if (localStorage.getItem("pets")) {
  petArr = getFromStorage("pets");
  renderTableData(petArr);
} else {
  petArr = [];
}

/*......sự kiện submit........*/
submitBtn.addEventListener("click", function () {
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

  /* xóa zữ liệu vừa nhập trên form*/

  const clearInput = () => {
    idInput.value = "";
    ageInput.value = "";
    nameInput.value = "";
    typeInput.value = "Select type";
    weightInput.value = "";
    lengthInput.value = "";
    breedInput.value = "Select type";
    vaccinatedInput.checked = false;
    dewormedInput.checked = false;
    sterilizedInput.checked = false;
  };

  /* đẩy dữ liệu vào mảng */

  const validate = validateData(data);
  if (validate) {
    petArr.push(data); /*đẩy dữ liệu data vào mảng pet */
    clearInput(); /*reset lại form input */
    renderTableData(petArr);
    //in du lieu petArr vào table
  }
  // localStorage.setItem("localStorage", JSON.stringify(petArr));
  saveToStorage("pets", petArr);
});

/*................................*/

/*tạo bảng đổ dữ liệu từ input */

function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    let vaccinatedText = petArr[i].vaccinated
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill";
    let dewormedText = petArr[i].dewormed
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill";
    let sterilizedText = petArr[i].sterilized
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill";

    const row = document.createElement("tr");
    row.innerHTML = `<th scope = ""row">${petArr[i].id}</th>
    <td>${petArr[i].name}</td>
        <td>${petArr[i].age}</td>
        <td>${petArr[i].type}</td>
        <td>${petArr[i].weight} kg</td>
        <td>${petArr[i].length} cm</td>
        <td>${petArr[i].breed}</td>
        <td>
        <i class = " bi bi-square-fill" style = "color : ${petArr[i].color}"></i></td>
        <td><i class="${vaccinatedText}"></i></td>
        <td><i class="${dewormedText}"></i></td>
        <td><i class="${sterilizedText}"></i></td>
        <td>${petArr[i].date}</td>
        <td>
        <button class="btn btn-danger" onclick="deletePet('${petArr[i].id}')">Delete</button>
      </td>`;

    tableBodyEl.appendChild(row);
  }
}

/* xóa thú cưng = nút delete */

const deletePet = (id) => {
  // Confirm before deletePet
  if (confirm("Are you sure?")) {
    //tim vi tri pet trong mang co id trung voi id can xoa
    //dung for hay foreach de tim cung dc - dung findIndex cho nhanh
    const vitrixoa = petArr.findIndex((pet) => pet.id == id);
    console.log(vitrixoa); //tim ra vi tri phan tu trong mang xong xoa phan tu voi splice
    petArr.splice(vitrixoa, 1); ///xoa tai vi tri do va xoa 1 phan tu
    //goi lai ham rener
    renderTableData(petArr);
    healthyBtn.textContent = "Show Healthy Pet";
    vitrixoa;
    renderTableData(petArr);
    // localStorage.setItem("localStorage", JSON.stringify(petArr));
    saveToStorage("localStorage", petArr);
  }
};
/* healthyBtn show dữ liệu pet khoe mạnh*/

healthyBtn.addEventListener("click", function () {
  healthyBtn.textContent = "Show All Pet";
  vaccinatedInput.checked = true;
  dewormedInput.checked = true;
  sterilizedInput.checked = true;
  let abc = petArr.filter(function (petArr) {
    return petArr.vaccinated && petArr.dewormed && petArr.sterilized;
  });
  renderTableData(abc);
  healthyBtn.addEventListener("click", function () {
    healthyBtn.textContent = "Show Healthy Pet";
    renderTableData(petArr);
    healthyBtn.addEventListener("click", function () {
      healthyBtn.textContent = "Show All Pet";
      // renderTableData(abc);
      renderTableData(ac);
    });
  });
});

/**********ASM2*********** */
//1. Bổ sung Animation cho Sidebar
document.getElementById("sidebar").addEventListener("click", function () {
  //gắn sự kiện click sidebar
  document.getElementById("sidebar").classList.toggle("active");
});

//2. Lưu dữ liệu dưới LocalStorage

//4. Hiển thị Breed trong màn hình quản lý thú cưng

const displayBreed = getFromStorage("breed");
console.log(displayBreed);
let breeds;
function myFunction() {
  const x = typeInput.value;
  breedInput.innerHTML = `<option>Select Type</option>`;
  breeds = displayBreed.filter((displayBreed) => displayBreed.type === x);

  for (let i = 0; i < breeds.length; i++) {
    const option = document.createElement("option");
    option.innerHTML = `${breeds[i].breedName}`;
    breedInput.append(option);
  }
  console.log(typeInput.value);
}
myFunction();
