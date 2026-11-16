// IMPORT
import { formatDistance, format, isPast } from "date-fns";
import "./styles.css";
import ProjectMaker from "./projectMaker.js";
import TodoMaker from "./TodoMaker.js";


// CLICKED PROJECT + BUTTON
(function createProjectButtonClicked() {
    document.getElementById('createProjectButton').addEventListener('click', e => {
        const projectName = prompt('Enter the project name:');

        // IF PROJECT NAME IS EMPTY
        if (projectName != "") {
            const defaultTab = new ProjectMaker(projectName, ["+++"]);
            defaultTab.create();
        } else {
            const defaultTab = new ProjectMaker('New tab', ["+++"]);
            defaultTab.create();
        };

        let allProjects = document.querySelectorAll('#projectsContainer > button');

        // ADDS NEWLY CREATED PROJECT TO BE ABLE TO DELETE
        allProjects.forEach(e => {
            e.lastChild.addEventListener('click', function() {
                e.remove();
                localStorage.removeItem(e.id);
            });
        });

        // TABSELECTUPDATE()
        allProjects.forEach.call(allProjects, e => {
            e.addEventListener('click', function() {
                [].forEach.call(allProjects, e => {
                    if (e !== this) e.classList.remove('currentTab');
                });

                this.classList.add('currentTab');

                // CHANGES CURRENT TAB TITLE
                document.getElementById('currentTabTitle').textContent = this.id;
            }, false);
        });

        // CLICKS THE CREATED PROJECT
        document.getElementById('projectsContainer').lastChild.click();
    });
})();


// RESTORES PROJECTS FROM LOCALSTORAGE
(function restoreProjects() {
    if (localStorage.length != 0) {
        for (let i = 0; i <= ((localStorage.length) - 1); i++) {
            let restoreTab = new ProjectMaker(localStorage.key(i), localStorage.getItem(localStorage.key(i)));
            restoreTab.create();
        };
    };
})();


// TAB CLICK
(function tabSelectUpdate() {
    // SELECTED AS CURRENT TAB
    if (localStorage.length != 0) {
        document.querySelector('#projectsContainer > button').classList = 'projects currentTab';
        document.getElementById('currentTabTitle').textContent = document.getElementsByClassName('currentTab')[0].querySelector('p').textContent;
    } else {
        document.getElementById('currentTabTitle').textContent = 'Create projects to add todos';
    };

    let allProjects = document.querySelectorAll('#projectsContainer > button');

    allProjects.forEach.call(allProjects, e => {
        e.addEventListener('click', function() {
            [].forEach.call(allProjects, e => {
                if (e !== this) e.classList.remove('currentTab');
            });

            this.classList.add('currentTab');

            // CHANGES CURRENT TAB TITLE
            document.getElementById('currentTabTitle').textContent = this.id;
        }, false);
    });
})();


// RESTORES TODOS
(function restoreTodos() {
    document.querySelectorAll('#projectsContainer > button').forEach(e => {
        e.addEventListener('click', function() {
            if (localStorage.key(0) != undefined) {

                // REMOVES THE PREVIOUS TODOS
                document.querySelectorAll('#todoContainer > .todo').forEach(e => e.remove());

                let currentProjectTodosArray = [];

                // WHEN CURREN PROJECTS CONTENT NOT FOUND
                if (localStorage.getItem(e.id) == undefined) {
                    document.getElementById('currentTabTitle').textContent = localStorage.key(0);
                    currentProjectTodosArray = localStorage.getItem(localStorage.key(0)).split("+"); //GETS THE DATA FROM LOCALSTORAGE
                    document.querySelectorAll('#projectsContainer > button')[0].classList = 'projects currentTab';

                } else {
                    currentProjectTodosArray = localStorage.getItem(e.id).split("+"); //GETS THE DATA FROM LOCALSTORAGE
                };

                const todoList = currentProjectTodosArray[0].split(",");
                const descriptionList = currentProjectTodosArray[1].split(",");
                const priorityList = currentProjectTodosArray[2].split(",");
                const dueDateList = currentProjectTodosArray[3].split(",");

                for (let i = 0; i <= (todoList.length - 1); i++) {
                    if (currentProjectTodosArray[i] != "") {
                        const todo = document.createElement('div');
                        todo.className = 'todo';

                        const section1 = document.createElement('div');
                        section1.className = 'section1';
                        const section2 = document.createElement('div');
                        section2.className = 'section2';
                        const section3 = document.createElement('div');
                        section3.className = 'section3';

                        // SECTION 1
                        const checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        const todoTitle = document.createElement('p');
                        todoTitle.textContent = todoList[i]; //GETS CURRENT TODO TITLE

                        // SECTION 2
                        const descriptionP = document.createElement('p');
                        descriptionP.className = 'description';
                        descriptionP.textContent = descriptionList[i];

                        // SECTION 3
                        //DATE
                        const currentDate = format(new Date(), 'yyyy-MM-dd').split("-");
                        const selectedDate = dueDateList[i].split("-");
                        const result = formatDistance(new Date(currentDate[0], currentDate[1], currentDate[2]), new Date(selectedDate[0], selectedDate[1], selectedDate[2]));

                        const dueDateP = document.createElement('p');
                        dueDateP.className = 'dueDate';

                        // CHECK IF DATE IS EXPIRED
                        if (isPast(dueDateList[i]) == true) {
                            dueDateP.textContent = 'Outdated!';
                            dueDateP.classList = 'dueDate expiredDate';
                        } else {
                            dueDateP.textContent = result;
                        };

                        const priorityP = document.createElement('p');
                        priorityP.textContent = priorityList[i];
                        priorityP.id = priorityList[i];
                        const deleteButton = document.createElement('button');
                        deleteButton.className = 'deleteButton';

                        section1.appendChild(checkbox);
                        section1.append(todoTitle);
                        section2.appendChild(descriptionP);
                        section3.appendChild(dueDateP);
                        section3.appendChild(priorityP);
                        section3.appendChild(deleteButton);
                        todo.appendChild(section1);
                        todo.appendChild(section2);
                        todo.appendChild(section3);
                        document.getElementById('todoContainer').appendChild(todo);
                    };
                };

            } else {
                // REMOVES THE PREVIOUS TODOS
                document.querySelectorAll('#todoContainer > .todo').forEach(e => e.remove());
            };
        });
    });

    // AUTO CLICKS THE FIRST TAB
    if (localStorage.length != 0) document.querySelector('#projectsContainer > button').click();
})();


// WHEN ADD BUTTON IS CLICKED
(function formAddButtonClicked() {
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
        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].type == "radio") {
                radioButtons[i].checked = false;
            }
        };
    });
})();


// WHEN PROJECT DELETE BUTTON IS CLICKED
(function deleteProjectButton() {
    document.querySelectorAll('#projectsContainer > button').forEach(e => {
        e.lastChild.addEventListener('click', function() {
            e.remove();
            localStorage.removeItem(e.id);
        });
    });
})();

// CLICKED TODO + BUTTON
(function addNoteClicked() {
    // CANT SELECT BEFORE CURRENT DATE
    document.getElementById("dueDate").setAttribute("min", format(new Date(), 'yyyy-MM-dd'));

    document.getElementById('addNote').addEventListener('click', function(e) {
        const overlay = document.getElementById('popupOverlay');
        overlay.classList.toggle('show');
    });
})();


// WHEN FORM IS CANCELLED
(function cancelButtonClicked() {
    document.getElementById("cancelButton").addEventListener('click', function(e) {
        const overlay = document.getElementById('popupOverlay');
        overlay.classList.toggle('show');
    });
})();