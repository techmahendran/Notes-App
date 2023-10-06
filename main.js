// Select DOM Elements
const addBtn = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const closebtn = document.querySelector(".closebtn");
const input = document.querySelector("#titleInput");
const textArea = document.querySelector("textarea");
const addNote = document.querySelector(".addbtn"),
  addNoteBtn = document.querySelector(".addbtn button");
const h2El = document.querySelector("h2");

// Set Months
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false,
  updatedId;

// addBtn Click
addBtn.addEventListener("click", () => {
  popupBox.classList.add("active");
  input.focus(); // input is focus
  h2El.innerHTML = "Add a new Note";
  addNoteBtn.innerHTML = "Add Note";
});

// closeBtn Click
closebtn.addEventListener("click", () => {
  isUpdate = false; // generate on edit btn
  input.value = "";
  textArea.value = "";
  popupBox.classList.remove("active");
});

// showNotes
function showNotes() {
  document.querySelectorAll(".note").forEach((note) => note.remove());
  notes.forEach((note, index) => {
    let noteEl = `
        <main class="note">
        <div class="content">
          <h3>${note.title}</h3>
          <p>${note.description}</p>
          <div class="bottom-content">
            <span>${note.date}</span>
            <div class="setting">
              <i
                onclick="showMenu(this)"
                class="fa fa-ellipsis-h"
                title="Setting"
              ></i>
              <div class="tools">
                <button class="edit-btn" title='Edit' 
                data-index='${index}'
                data-title='${note.title}'
                data-description='${note.description}'
                >
                  <i class="fa fa-edit"></i>Edit
                </button>
                <button title='Delete' onclick="deleteNote(${index})">
                  <i class="fa fa-trash-o"></i>Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      `;
    addBtn.insertAdjacentHTML("afterend", noteEl);
  });
}
showNotes();

// showMenu
function showMenu(elem) {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    // removing show class from the
    if (e.target.tagName != "I") {
      elem.parentElement.classList.remove("show");
    }
  });
}

// Deletebtn
function deleteNote(noteId) {
 const confirmMsg = confirm("Are you sure want to delete this note?");
  if (confirmMsg) {
    notes.splice(noteId, 1); // removing selected note from array
    // saving updated notes to localStorage
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
  }
}

window.addEventListener("click", () => {
  const editBtns = document.querySelectorAll(".edit-btn");

  editBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      addBtn.click();
      //  isUpdate replace
      isUpdate = true; // generate the isUpdate edit btn

      const index = e.target.dataset.index;
      const title = e.target.dataset.title;
      const description = e.target.dataset.description;
      h2El.innerHTML = "Update a Notes";
      addNoteBtn.innerHTML = "Update Note";
      input.value = title;
      textArea.value = description;
      // index num
      updatedId = index;
      console.log(updatedId, title, description);
    });
  });
});

// UpdateNote
addNote.addEventListener("click", (e) => {
  e.preventDefault();

  let notetitle = input.value;
  let notedescr = textArea.value;

  if (notetitle === "" || notedescr === "") {
    // title & descr is empty so alert is show
    alert("Enter the All Fields");
  }

  if (notetitle || notedescr) {
    // Getting month, day, year from the current date
    let dateobj = new Date(),
      month = months[dateobj.getMonth()],
      day = dateobj.getDate(),
      year = dateobj.getFullYear();
    // set localStorage title & descr value is noteInfo object
    let noteInfo = {
      title: notetitle,
      description: notedescr,
      date: `${month} ${day <= 10 ? "0" + day : day}, ${year}`,
    };

    // isUpdate show the noteInfo value
    if (!isUpdate) {
      notes.push(noteInfo); // push on noteInfo content
    } else {
      isUpdate = false;
      notes[updatedId] = noteInfo;
    }
    localStorage.setItem("notes", JSON.stringify(notes));
    closebtn.click();
    showNotes();
  }
});
