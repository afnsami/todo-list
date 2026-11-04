// IMPORT
import "./styles.css";

// HTML OBJECTS
const projectsContainer = document.getElementById('projectsContainer');
const todoContainer = document.getElementById('todoContainer');
const createProjectButton = document.getElementById('createProjectButton');
const createTodoButton = document.getElementById('addNote');
const cancelTodoButton = document.getElementById("cancelButton");
const form = document.getElementById('form');


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
        projectsContainer.appendChild(newTab);

        // REMOVES THE PREVIOUS TODOS
        document.querySelectorAll('#todoContainer > .todo').forEach(e => e.remove());

        // LOCAL STORAGE
        localStorage.setItem(this.title, this.data);
        restoreTodos();
    };
};


// CLICKED PROJECT + BUTTON
createProjectButton.addEventListener('click', e => {
    const projectName = prompt('Enter the project name:');

    // IF PROJECT NAME IS EMPTY
    if (projectName != "") {
        const defaultTab = new ProjectMaker(projectName, ["+"]);
        defaultTab.create();
    } else {
        const defaultTab = new ProjectMaker('New tab');
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


// RESTORES PROJECTS FROM LOCALSTORAGE
(function restoreProjects() {
    // IF LOCALSTORAGE IS EMPTY
    if (localStorage.length == 0) {
        let defaultTab = new ProjectMaker('Default', ['+']);
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


let oldTab = document.querySelector('.projects');

// TODO MAKER
class TodoMaker {
    constructor(title, priority) {
        this.title = title;
        this.priority = priority;
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

        // SECTION 3
        const priorityP = document.createElement('p');
        priorityP.textContent = this.priority;
        priorityP.id = this.priority;
        const deleteButton = document.createElement('button');
        deleteButton.className = 'deleteButton';

        section1.appendChild(checkButton);
        section1.appendChild(todoTitle);
        section3.appendChild(priorityP);
        section3.appendChild(deleteButton);
        todo.appendChild(section1);
        todo.appendChild(section3)
        todoContainer.appendChild(todo);


        // --------------NESTED ARRAY------------
        


        // LOCALSTORAGE
        const currentTab = document.querySelector('.currentTab');

        if (currentTab.id == oldTab.id) {

            const restoredDataString = localStorage.getItem(document.querySelector('.currentTab').id).split("+");
            const todoList = restoredDataString[0].split(","); //GETS THE TODOS OF CURRENT PROJECT
            const priorityList = restoredDataString[1].split(","); //GETS THE PRIORITIES OF CURRENT PROJECT

            if (todoList[0] === "") todoList.shift(); //REMOVES FIRST EMPTY ARRAY ELEMENT
            if (priorityList[0] === "") priorityList.shift(); //REMOVES FIRST EMPTY ARRAY ELEMENT

            todoList.push(this.title); //INSERTS TODO INTO AN ARRAY
            priorityList.push(this.priority);

            const dataString = (todoList) + "+" + (priorityList); //CONTAINS ALL THE DATA
            localStorage.setItem(currentTab.id, [dataString]);

        } else {
            const restoredDataString = localStorage.getItem(document.querySelector('.currentTab').id).split("+");
            const todoList = restoredDataString[0].split(","); //GETS THE TODOS OF CURRENT PROJECT
            const priorityList = restoredDataString[1].split(","); //GETS THE PRIORITIES OF CURRENT PROJECT

            if (todoList[0] === "") todoList.shift(); //REMOVES FIRST EMPTY ARRAY ELEMENT
            if (priorityList[0] === "") priorityList.shift(); //REMOVES FIRST EMPTY ARRAY ELEMENT

            todoList.push(this.title); //INSERTS TODO INTO AN ARRAY
            // todoList.pop();
            priorityList.push(this.priority);

            const dataString = (todoList) + "+" + (priorityList); //CONTAINS ALL THE DATA
            localStorage.setItem(currentTab.id, [dataString]);
            oldTab = currentTab;
        };
    };
};


// CLICKED TODO + BUTTON
createTodoButton.addEventListener('click', function(e) {
    const overlay = document.getElementById('popupOverlay');
    overlay.classList.toggle('show');
});


// WHEN FORM IS CANCELLED
cancelTodoButton.addEventListener('click', function(e) {
    const overlay = document.getElementById('popupOverlay');
    overlay.classList.toggle('show');
});


// RESTORES TODOS
function restoreTodos() {
    document.querySelectorAll('#projectsContainer > button').forEach(e => {
        e.addEventListener('click', function() {

            // REMOVES THE PREVIOUS TODOS
            document.querySelectorAll('#todoContainer > .todo').forEach(e => e.remove());

            const currentProjectTodosArray = localStorage.getItem(e.id).split("+");
            const todoList = currentProjectTodosArray[0].split(",");
            const priorityList = currentProjectTodosArray[1].split(",");

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

                    // SECTION 3
                    const priorityP = document.createElement('p');
                    priorityP.textContent = priorityList[i];
                    priorityP.id = priorityList[i];
                    const deleteButton = document.createElement('button');
                    deleteButton.className = 'deleteButton';

                    section1.appendChild(checkbox);
                    section1.append(todoTitle);
                    section3.appendChild(priorityP);
                    section3.appendChild(deleteButton);
                    todo.appendChild(section1);
                    todo.appendChild(section3);
                    todoContainer.appendChild(todo);
                };
            };
        });
    });

    // AUTO CLICKS THE FIRST TAB
    document.querySelector('#projectsContainer > button').click();
};

restoreTodos();


// WHEN ADD BUTTON IS CLICKED
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const priority = document.querySelector('input[name="priority"]:checked');

    document.getElementById('popupOverlay').classList.toggle('show');
    const newNote = new TodoMaker(title.value, priority.id);
    newNote.create();

    // CLEARS TITLE
    title.value = '';
    // CLEARS DESCRIPTION
    description.value = '';

    // CLEARS SELECTED RADIO BUTTON
    // let radioButtons = document.getElementsByTagName("input");
    // for (let i = 0; i < radioButtons.length; i++) {
    //     if (radioButtons[i].type == "radio") {
    //         radioButtons[i].checked = false;
    //     }
    // };
});
