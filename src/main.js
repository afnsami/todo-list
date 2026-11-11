// IMPORT
import "./styles.css";
import { formatDistance, format, isPast } from "date-fns";


// PROJECT MAKER
class ProjectMaker {
    constructor(title, data) {
        this.title = title;
        this.data = data;
    };

    create() {
        const newTab = document.createElement('button');
        newTab.classList = 'projects';
        newTab.id = this.title;
        const newTabP = document.createElement('p');
        newTabP.textContent = this.title;
        
        const deleteButton = document.createElement('button');
        deleteButton.className = 'deleteButton';

        newTab.appendChild(newTabP);
        newTab.appendChild(deleteButton);
        document.getElementById('projectsContainer').appendChild(newTab);

        // REMOVES THE PREVIOUS TODOS
        document.querySelectorAll('#todoContainer > .todo').forEach(e => e.remove());

        // LOCAL STORAGE
        localStorage.setItem(this.title, this.data);
        restoreTodos();
    };
};


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

        // TABSELECTUPDATE()
        let allProjects = document.querySelectorAll('#projectsContainer > button');

        allProjects.forEach.call(allProjects, e => {
            e.addEventListener('click', function() {
                [].forEach.call(allProjects, e => {
                    if (e !== this) e.classList.remove('currentTab');
                });

                this.classList.add('currentTab');

                // CHANGES CURRENT TAB TITLE
                document.getElementById('currentTabTitle').textContent = document.getElementsByClassName('currentTab')[0].querySelector('p').textContent;
            }, false);
        });

        // CLICKS THE CREATED PROJECT
        document.getElementById('projectsContainer').lastChild.click();
    });
})();


// RESTORES PROJECTS FROM LOCALSTORAGE
(function restoreProjects() {
    // IF LOCALSTORAGE IS EMPTY
    if (localStorage.length == 0) {
        let defaultTab = new ProjectMaker('Default', ['+++']);
        defaultTab.create();

    } else {
        for (let i = 0; i <= ((localStorage.length) - 1); i++) {
            let restoreTab = new ProjectMaker(localStorage.key(i), localStorage.getItem(localStorage.key(i)));
            restoreTab.create();
        };
    }
})();


// TAB CLICK
(function tabSelectUpdate() {
    // CANT SELECT BEFORE CURRENT DATE
    document.getElementById("dueDate").setAttribute("min", format(new Date(), 'yyyy-MM-dd'));

    // SELECTED AS CURRENT TAB
    document.querySelector('#projectsContainer > button').classList = 'projects currentTab';
    document.getElementById('currentTabTitle').textContent = document.getElementsByClassName('currentTab')[0].querySelector('p').textContent;


    let allProjects = document.querySelectorAll('#projectsContainer > button');

    allProjects.forEach.call(allProjects, e => {
        e.addEventListener('click', function() {
            [].forEach.call(allProjects, e => {
                if (e !== this) e.classList.remove('currentTab');
            });

            this.classList.add('currentTab');

            // CHANGES CURRENT TAB TITLE
            document.getElementById('currentTabTitle').textContent = document.getElementsByClassName('currentTab')[0].querySelector('p').textContent;
        }, false);
    });
})();


// TODO MAKER
class TodoMaker {
    constructor(title, description, priority, dueDate) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
    };

    create() {
        const todo = document.createElement('div');
        todo.className = 'todo';

        const section1 = document.createElement('div');
        section1.className = 'section1';
        const section2 = document.createElement('div');
        section2.className = 'section2';
        const section3 = document.createElement('div');
        section3.className = 'section3';

        // SECTION 1
        const checkButton = document.createElement('input');
        checkButton.type = 'checkbox';
        const todoTitle = document.createElement('p');
        todoTitle.textContent = this.title;

        // SECTION 2
        const descriptionP = document.createElement('p');
        descriptionP.className = 'description';
        descriptionP.textContent = this.description;

        // SECTION 3

        // DATE
        const currentDate = format(new Date(), 'yyyy-MM-dd').split("-");
        const selectedDate = this.dueDate.split("-");
        const result = formatDistance(new Date(currentDate[0], currentDate[1], currentDate[2]), new Date(selectedDate[0], selectedDate[1], selectedDate[2]));

        const dueDate = document.createElement('p');
        dueDate.className = 'dueDate';
        dueDate.textContent = result;

        const priorityP = document.createElement('p');
        priorityP.textContent = this.priority;
        priorityP.id = this.priority;
        const deleteButton = document.createElement('button');
        deleteButton.className = 'deleteButton';

        section1.appendChild(checkButton);
        section1.appendChild(todoTitle);
        section2.appendChild(descriptionP);
        section3.appendChild(dueDate);
        section3.appendChild(priorityP);
        section3.appendChild(deleteButton);
        todo.appendChild(section1);
        todo.appendChild(section2);
        todo.appendChild(section3);
        document.getElementById('todoContainer').appendChild(todo);

        // LOCALSTORAGE
        let currentTab = document.querySelector('.currentTab');

        if (currentTab.id == document.querySelector('.projects').id) {
            const restoredDataString = localStorage.getItem(document.querySelector('.currentTab').id).split("+");
            console.log(restoredDataString);

            // TODO DIV SECTIONS
            const todoList = restoredDataString[0].split(","); //GETS THE TODOS OF CURRENT PROJECT
            const descriptionList = restoredDataString[1].split(",");  //GETS THE DESCRIPTIONS OF CURRENT PROJECT
            const priorityList = restoredDataString[2].split(","); //GETS THE PRIORITIES OF CURRENT PROJECT
            const dueDateList = restoredDataString[3].split(","); // GETS THE DUEDATE LIST

            //REMOVES FIRST EMPTY ARRAY ELEMENT
            if (todoList[0] === "") todoList.shift(); if (descriptionList[0] === "") descriptionList.shift(); if (priorityList[0] === "") priorityList.shift(); if (dueDateList[0] === "") dueDateList.shift();

            todoList.push(this.title);
            descriptionList.push(this.description);
            priorityList.push(this.priority);
            dueDateList.push(this.dueDate);

            const dataString = (todoList) + "+" + (descriptionList) + "+" + (priorityList) + "+" + (dueDateList); //CONTAINS ALL THE DATA
            localStorage.setItem(currentTab.id, [dataString]);

        } else {
            const restoredDataString = localStorage.getItem(document.querySelector('.currentTab').id).split("+");

            // TODO DIV SECTIONS
            const todoList = restoredDataString[0].split(","); //GETS THE TODOS OF CURRENT PROJECT
            const descriptionList = restoredDataString[1].split(",");  //GETS THE DESCRIPTIONS OF CURRENT PROJECT
            const priorityList = restoredDataString[2].split(","); //GETS THE PRIORITIES OF CURRENT PROJECT
            const dueDateList = restoredDataString[3].split(","); // GETS THE DUEDATE LIST

            //REMOVES FIRST EMPTY ARRAY ELEMENT
            if (todoList[0] === "") todoList.shift(); if (descriptionList[0] === "") descriptionList.shift(); if (priorityList[0] === "") priorityList.shift(); if (dueDateList[0] === "") dueDateList.shift();

            todoList.push(this.title);
            descriptionList.push(this.description);
            priorityList.push(this.priority);
            dueDateList.push(this.dueDate);
            
            const dataString = (todoList) + "+" + (descriptionList) + "+" + (priorityList) + "+" + (dueDateList); //CONTAINS ALL THE DATA
            localStorage.setItem(currentTab.id, [dataString]);
            currentTab = document.querySelector('.projects');
        };
    };
};


// CLICKED TODO + BUTTON
(function addNoteClicked() {
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


// RESTORES TODOS
function restoreTodos() {
    document.querySelectorAll('#projectsContainer > button').forEach(e => {
        e.addEventListener('click', function() {

            // REMOVES THE PREVIOUS TODOS
            document.querySelectorAll('#todoContainer > .todo').forEach(e => e.remove());

            const currentProjectTodosArray = localStorage.getItem(e.id).split("+");
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
        });
    });

    // AUTO CLICKS THE FIRST TAB
    document.querySelector('#projectsContainer > button').click();
};
restoreTodos();


// WHEN ADD BUTTON IS CLICKED
(function formAddButtonClicked() {
    document.getElementById('form').addEventListener('submit', function(e) {
        e.preventDefault();

        const title = document.getElementById('title');
        const description = document.getElementById('description');
        const priority = document.querySelector('input[name="priority"]:checked');
        const selectedDate = document.querySelector("input[type='date']");

        document.getElementById('popupOverlay').classList.toggle('show');
        const newNote = new TodoMaker(title.value, description.value, priority.id, selectedDate.value);
        newNote.create();

        // CLEARS THE INPUTS
        title.value = '';
        description.value = '';
        selectedDate.value = '';

        // CLEARS SELECTED RADIO BUTTON
        // let radioButtons = document.getElementsByTagName("input");
        // for (let i = 0; i < radioButtons.length; i++) {
        //     if (radioButtons[i].type == "radio") {
        //         radioButtons[i].checked = false;
        //     }
        // };
    });
})();


(function deleteProjectButton() {
    let allProjects = document.querySelectorAll('#projectsContainer > button');

    allProjects.forEach(e => {
        e.lastChild.addEventListener('click', function() {
            localStorage.removeItem(e.id);
        });
    });
})();
