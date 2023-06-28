const backlogListEl = document.getElementById("backlogList");
const progressListEl = document.getElementById("progressList");
const completeListEl = document.getElementById("completeList");
const onHoldListEl = document.getElementById("onHoldList");

// Initialize Array
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArray = [];

// items
let updateOnLoad = false;

// Check Local Storage Data
function getSaveListArray() {
  if (localStorage.getItem("e")) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ["BShivam Sharma1", "Shivam Sharma2", "Shivam Shf"];
    progressListArray = ["PShivam Sharma1", "Shivam Sharma2", "Shivam Shf"];
    completeListArray = ["CShivam Sharma1", "Shivam Sharma2", "Shivam Shf"];
    onHoldListArray = ["OShivam Sharma1", "Shivam Sharma2", "Shivam Shf"];
    // Update Local Storage Data
    function updateDefaultListArray() {
      listArray = [
        backlogListArray,
        progressListArray,
        completeListArray,
        onHoldListArray,
      ];
      const arrayNames = ["backlog", "progress", "complete", "onHold"];
      arrayNames.forEach((name, index) => {
        localStorage.setItem(`${name}Items`, JSON.stringify(listArray[index]));
      });
    }
  }
  updateDefaultListArray();
}
// Create Element
function createEl(divEl, item, i) {
  console.log(divEl, item, i);
  const listEl = document.createElement("li");
  listEl.classList.add("drag-item");
  listEl.setAttribute("draggable", "true");
  //   Append Elements
  divEl.appendChild(listEl);
  listEl.textContent = item;
}
// Update DOM
function updateDOM() {
  if (!updateOnLoad) {
    getSaveListArray();
  }
  backlogListEl.textContent = "";
  backlogListArray.forEach((backlogItems, index) => {
    createEl(backlogListEl, backlogItems, index);
  });
  progressListEl.textContent = "";
  progressListArray.forEach((progressItems, index) => {
    createEl(progressListEl, progressItems, index);
  });
  completeListEl.textContent = "";
  completeListArray.forEach((completeItems, index) => {
    createEl(completeListEl, completeItems, index);
  });
  onHoldListEl.textContent = "";
  onHoldListArray.forEach((onHoldItems, index) => {
    createEl(onHoldListEl, onHoldItems, index);
  });
}

updateDOM();
