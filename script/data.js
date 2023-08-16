"use strict";
document.getElementById("sidebar").addEventListener("click", function () {
  //gắn sự kiện click sidebar
  document.getElementById("sidebar").classList.toggle("active");
});

const dataExport = getFromStorage("pets");
console.log(dataExport);

const form = document.getElementById("upload");
const importData = document.getElementById("import-btn");
const exportData = document.getElementById("export-btn");
const file = document.getElementById("input-file");
console.log(importData);

form.addEventListener("submit", xulyForm);

function xulyForm(e) {
  //cam sự kiện submit mặc định
  e.preventDefault();

  //neu chua chọn file - file.value.length = 0 - không làm gì cả
  if (!file.value.length) return;

  //tạo một reader object để đọc file
  let reader = new FileReader();
  //Setup the callback event to run when the file is read

  reader.readAsText(file.files[0]); //dọc file đầu tiên

  reader.onload = xulyFile;
}

function xulyFile(e) {
  let noidung = e.target.result;
  console.log(noidung);
  let json_noidung = JSON.parse(noidung);
  console.log(json_noidung);
}

//xu ly export data ra file json
function exportToJsonFile(jsonData, exportfilename) {
  let dataStr = JSON.stringify(jsonData);
  let dataUri =
    "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

  let exportFileDefaultName = exportfilename; // 'data.json';

  let linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();
}

exportData.addEventListener("click", function () {
  exportToJsonFile(dataExport, "dữ liệu thú cưng");
});

importData.addEventListener("click", function () {
  //   onFileLoad(importData);
  //   console.log(file.files[0]);
  if (file.files[0]) {
    var reader = new FileReader();
    reader.readAsText(file.files[0], "UTF-8");
    reader.onload = function (evt) {
      // document.getElementById("fileContents").innerHTML = evt.target.result;
      let dataFile = JSON.parse(evt.target.result);

      console.log(dataExport, dataFile);
    };
    reader.onerror = function (evt) {
      document.getElementById("fileContents").innerHTML = "error reading file";
    };
  }
});

function onFileLoad(elementId, event) {
  document.getElementById(elementId).innerText = event.target.result;
}

function onChooseFile(event, onLoadFileHandler) {
  if (typeof window.FileReader !== "function")
    throw "The file API isn't supported on this browser.";
  let input = event.target;
  if (!input) throw "The browser does not properly implement the event object";
  if (!input.files)
    throw "This browser does not support the `files` property of the file input.";
  if (!input.files[0]) return undefined;
  let file = input.files[0];
  let fr = new FileReader();
  fr.onload = onLoadFileHandler;
  fr.readAsText(file);
}
