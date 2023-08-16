"use strict";
document.getElementById("sidebar").addEventListener("click", function () {
  //gắn sự kiện click sidebar
  document.getElementById("sidebar").classList.toggle("active");
});

const submit = document.querySelector(".btn-primary");
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");

const breed = {
  breedName: breedInput.value,
  type: typeInput.value,
};

let petBreed;
if (localStorage.getItem("breed")) {
  petBreed = getFromStorage("breed");

  renderBreedTable(petBreed);
  // deletePet;
} else {
  petBreed = [];
}
/* nut sumbit */

submit.addEventListener("click", function () {
  const breed = {};
  breed.breedName = breedInput.value;
  breed.type = typeInput.value;

  const clearbreed = () => {
    breedInput.value = "";
    typeInput.value = "Select type";
  };
  clearbreed(breed);
  petBreed.push(breed);
  renderBreedTable(petBreed);
  // localStorage.setItem("breed", JSON.stringify(petBreed));
  saveToStorage("breed", petBreed);
});

function renderBreedTable(petBreed) {
  document.querySelector("tbody").innerHTML = "";
  for (let i = 0; i < petBreed.length; i++) {
    let html = `
    <tr>
        <th scope = "row">${[i + 1]}</th>
         <td>${petBreed[i].breedName}</td>
             <td>${petBreed[i].type}</td>
             <td>
                <button class="btn btn-danger" onclick="deletePet('${
                  petBreed[i].breedName
                }')">Delete</button>
            </td>
    </tr>`;

    document.querySelector("tbody").innerHTML += html;
  }
}

const deletePet = (breedName) => {
  // Confirm before deletePet
  if (confirm("Are you sure?")) {
    //tim vi tri pet trong mang co id trung voi id can xoa
    //dung for hay foreach de tim cung dc - dung findIndex cho nhanh
    const vitrixoa = petBreed.findIndex((pet) => pet.breedName == breedName);
    console.log(vitrixoa); //tim ra vi tri phan tu trong mang xong xoa phan tu voi splice
    petBreed.splice(vitrixoa, 1); ///xoa tai vi tri do va xoa 1 phan tu
    //goi lai ham rener
    renderBreedTable(petBreed);
    vitrixoa;
    // localStorage.setItem("breed", JSON.stringify(petBreed));
    saveToStorage("breed", petBreed);
  }
};
