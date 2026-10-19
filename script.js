let _tasks = [];
let savedText = localStorage.getItem("tasks");

if (savedText !== null) {
  _tasks = JSON.parse(savedText);
}

const addTask = document.getElementById("addTask");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

const editModal = document.getElementById("editModal");
const editTaskInput = document.getElementById("editTaskInput");
const saveEditBtn = document.getElementById("saveEditBtn");
const closeModalBtn = document.getElementById("closeModalBtn");

let currentEditIndex = null;

renderTask();

addButton.addEventListener("click", function () {
  addNewTask();
});

addTask.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addNewTask();
  }
});

function openEditModel(idexToEdit) {
  currentEditIndex = idexToEdit;
  editTaskInput.value = _tasks[idexToEdit];
  editModal.style.display = "flex";
  editTaskInput.focus();
}

saveEditBtn.addEventListener("click", function () {
  if (editTaskInput.value != "") {
    _tasks[currentEditIndex] = editTaskInput.value;
    editModal.style.display = "none";
    renderTask();
  }
});

closeModalBtn.addEventListener("click", function () {
  editModal.style.display = "none";
  currentEditIndex = null;
});

function deleteTask(indexToDelete) {
  _tasks = _tasks.filter((_, index) => index !== indexToDelete);
  renderTask();
}

function addNewTask() {
  if (addTask.value != "") {
    _tasks.push(addTask.value);
    renderTask();
    addTask.value = "";
  } else {
    alert("يرجى إضافة مهمة");
  }
}

function renderTask() {
  let newTasks = _tasks.map(
    (task, index) =>
      `
<li>
  <span>${task}</span>
  <div class="actions">
    <button onclick="openEditModel(${index})">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#4B77D1"
      >
        <title>تعديل</title>

        <path
          d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"
        />
      </svg>
    </button>
    <button onclick="deleteTask(${index})">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#BB271A"
      >
        <title>حذف</title>
        <path
          d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
        />
      </svg>
    </button>
  </div>
</li>
`,
  );

  newTasks = newTasks.join("");
  taskList.innerHTML = newTasks;

  localStorage.setItem("tasks", JSON.stringify(_tasks));
}
