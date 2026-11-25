import { format } from "date-fns";
import TodoMaker from "./TodoMaker.js";
import { todoCheckedListener } from './Todo.js'

// CLICKED TODO + BUTTON
function addNoteClicked() {
    if (localStorage.length == 0) {
        document.getElementById('addNote').style.display = 'none';

    } else {
        document.getElementById("dueDate").setAttribute("min", format(new Date(), 'yyyy-MM-dd')); // CANT SELECT BEFORE CURRENT DATE

        document.getElementById('addNote').addEventListener('click', function(e) {
            const overlay = document.getElementById('popupOverlay');
            overlay.classList.toggle('show');
        });
    };
};


// WHEN ADD BUTTON IS CLICKED
function formAddButtonClicked() {
    document.getElementById('form').addEventListener('submit', function(e) {
        e.preventDefault();
        document.getElementById('popupOverlay').classList.toggle('show');

        const title = document.getElementById('title');
        const description = document.getElementById('description');
        const priority = document.querySelector('input[name="priority"]:checked');
        const selectedDate = document.querySelector("input[type='date']");
        
        const newNote = new TodoMaker(title.value, description.value, priority.id, selectedDate.value);
        newNote.create();

        // CLEARS THE INPUTS
        title.value = '';
        description.value = '';
        selectedDate.value = '';
        // CLEARS SELECTED RADIO BUTTON
        let radioButtons = document.getElementsByTagName("input");
        for (let i = 0; i < radioButtons.length; i++) if (radioButtons[i].type == "radio") radioButtons[i].checked = false;

        // NEW TODO IS AVAILABLE TO BE CHECKED
        todoCheckedListener();
    });
};


// WHEN FORM IS CANCELLED
function cancelButtonClicked() {
    document.getElementById("cancelButton").addEventListener('click', function(e) {
        const overlay = document.getElementById('popupOverlay');
        overlay.classList.toggle('show');
    });
};


export { addNoteClicked, formAddButtonClicked, cancelButtonClicked };
