const addBtns = document.querySelectorAll(".add-btn:not(.solid)");
const saveItemBtns = document.querySelectorAll(".solid");
const addItemContainers = document.querySelectorAll(".add-container");
const addItems = document.querySelectorAll(".add-item");

const listColumns = document.querySelectorAll(".drag-item-list");
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

// Drag Items
let dragItems;
let dragging = false;
let currentColumn;

// items
let updateOnLoad = false;

// Check Local Storage Data
function getSaveListArray() {
  if (
    localStorage.getItem(
      "backlogItems",
      "progressItems",
      "completeItems",
      "onHoldItems"
    )
  ) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ["BShivam Sharma1", "Shivam Sharma2", "Shivam Shf"];
    progressListArray = ["PShivam Sharma1", "Shivam Sharma2", "Shivam Shf"];
    completeListArray = ["CShivam Sharma1", "Shivam Sharma2", "Shivam Shf"];
    onHoldListArray = ["OShivam Sharma1", "Shivam Sharma2", "Shivam Shf"];
  }
}
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

// Filter Array if Text Content is Null
function filterArray(array) {
  const fltrArray = array.filter((item) => item !== null);
  return fltrArray;
}

// Create Element
function createEl(divEl, column, item, i) {
  const listEl = document.createElement("li");
  listEl.classList.add("drag-item");
  listEl.setAttribute("draggable", "true");
  listEl.textContent = item;
  listEl.setAttribute("ondragstart", "drag(event)");
  listEl.contentEditable = true;
  listEl.id = i;
  listEl.setAttribute("onfocusout", `updateItem(${i}, ${column})`);
  //   Append Elements
  divEl.appendChild(listEl);
}
// Update DOM
function updateDOM() {
  if (!updateOnLoad) {
    getSaveListArray();
  }
  backlogListEl.textContent = "";
  backlogListArray.forEach((backlogItems, index) => {
    createEl(backlogListEl, 0, backlogItems, index);
  });
  backlogListArray = filterArray(backlogListArray);
  progressListEl.textContent = "";
  progressListArray.forEach((progressItems, index) => {
    createEl(progressListEl, 1, progressItems, index);
  });
  progressListArray = filterArray(progressListArray);
  completeListEl.textContent = "";
  completeListArray.forEach((completeItems, index) => {
    createEl(completeListEl, 2, completeItems, index);
  });
  completeListArray = filterArray(completeListArray);
  onHoldListEl.textContent = "";
  onHoldListArray.forEach((onHoldItems, index) => {
    createEl(onHoldListEl, 3, onHoldItems, index);
  });
  onHoldListArray = filterArray(onHoldListArray);
  // Run getSave Columns only once, update local storage
  updateOnLoad = true;
  updateDefaultListArray();
}

// Update Item - delete if necessary or update
function updateItem(id, column) {
  const selectArray = listArray[column];
  const selectColumnEl = listColumns[column].children;
  if (!dragging) {
    if (!selectColumnEl[id].textContent) {
      delete selectArray[id];
    } else {
      selectArray[id] = selectColumnEl[id].textContent;
    }
    updateDOM();
  }
}

// Add Text to Array
function addToText(column) {
  const itemText = addItems[column].textContent;
  const selectedArray = listArray[column];
  selectedArray.push(itemText);
  addItems[column].textContent = "";
  updateDOM();
}

// Show and Hide Input Box
function showInputBox(column) {
  addBtns[column].style.visibility = "hidden";
  saveItemBtns[column].style.display = "flex";
  addItemContainers[column].style.display = "flex";
}

function hideInputBox(column) {
  addBtns[column].style.visibility = "visible";
  addItemContainers[column].style.display = "none";
  saveItemBtns[column].style.display = "none";
  addToText(column);
}

// Allow
function rebuildArrays() {
  // Using Map
  backlogListArray = Array.from(backlogListEl.children).map(
    (i) => i.textContent
  );
  // Using For Loop
  progressListArray = [];
  for (let i = 0; i < progressListEl.children.length; i++) {
    progressListArray.push(progressListEl.children[i].textContent);
  }
  completeListArray = [];

  for (let i = 0; i < completeListEl.children.length; i++) {
    completeListArray.push(completeListEl.children[i].textContent);
  }
  onHoldListArray = [];

  for (let i = 0; i < onHoldListEl.children.length; i++) {
    onHoldListArray.push(onHoldListEl.children[i].textContent);
  }
  updateDOM();
}

// When Item Enter Columns
function dragEnter(column) {
  listColumns[column].classList.add("over");
  currentColumn = column;
}

// When Start Dragging
function drag(e) {
  dragItems = e.target;
  dragging = true;
}
// Allow to drop Item
function allowDrop(e) {
  e.preventDefault();
}
// Dropping Items
function drop(e) {
  e.preventDefault();
  const parent = listColumns[currentColumn];
  listColumns.forEach((column) => {
    column.classList.remove("over");
  });
  // Add Item to Columns
  parent.appendChild(dragItems);
  dragging = false;
  rebuildArrays();
}

updateDOM();
