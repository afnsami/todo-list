// IMPORT
import { formatDistance, format, isPast } from "date-fns";
import "./styles.css";
import ProjectMaker from "./projectMaker.js";
import { addNoteClicked, formAddButtonClicked, cancelButtonClicked } from "./form.js"


// CLICKED PROJECT + BUTTON
(function createProjectButtonClicked() {
    document.getElementById('createProjectButton').addEventListener('click', e => {

        // ADD NOTE BUTTON IS SHOWN
        if (localStorage.length == 0) {
            console.log('localStorage is 0');

            document.getElementById('addNote').style.display = 'block';

            document.getElementById('addNote').addEventListener('click', function() {
                const overlay = document.getElementById('popupOverlay');
                overlay.classList.toggle('show');
            });
        };

        const projectName = prompt('Enter the project name:');

        // IF PROJECT NAME IS EMPTY
        if (projectName != "") {
            const defaultTab = new ProjectMaker(projectName, ["+++++"]);
            defaultTab.create();
        } else {
            const defaultTab = new ProjectMaker('New tab', ["+++++"]);
            defaultTab.create();
        };

        let allProjects = document.querySelectorAll('#projectsContainer > button');

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

        // ADDS NEWLY CREATED PROJECT TO BE ABLE TO DELETE
        allProjects.forEach(e => {
            e.lastChild.addEventListener('click', function() {
                e.remove();
                localStorage.removeItem(e.id);

                if (localStorage.length == 0) {
                    document.getElementById("dueDate").setAttribute("min", format(new Date(), 'yyyy-MM-dd')); // CANT SELECT BEFORE CURRENT DATE
                    document.getElementById('addNote').style.display = 'none';

                    document.getElementById('addNote').addEventListener('click', function() {
                        const overlay = document.getElementById('popupOverlay');
                        overlay.classList.toggle('show');
                    });
                };
            });
        });
        
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
                const checkedList = currentProjectTodosArray[4].split(",");

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
                        const todoTitle = document.createElement('p');
                        todoTitle.textContent = todoList[i];

                        const checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        if (checkedList[i] == 'true') {
                            checkbox.click(); 
                            todoTitle.style.textDecoration = 'line-through';
                            todoTitle.style.opacity = '30%';
                        };

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


// WHEN PROJECT DELETE BUTTON IS CLICKED
(function deleteProjectButton() {
    document.querySelectorAll('#projectsContainer > button').forEach(e => {
        e.lastChild.addEventListener('click', function() {
            e.remove();
            localStorage.removeItem(e.id);

            if (localStorage.length == 0) {
                document.getElementById('addNote').style.display = 'none';

                document.getElementById('addNote').addEventListener('click', function() {
                    const overlay = document.getElementById('popupOverlay');
                    overlay.classList.toggle('show');
                });
            };
        });
    });
})();



(function todoCheckedListener() {
    const checkList = [];
    const todoList = document.querySelectorAll('#todoContainer > .todo');

    todoList.forEach(e => {
        checkList.push(e.firstChild.firstChild);
    });

    checkList.forEach(e => {
        e.addEventListener('click', function() {
            
            console.log('clicked');
            
            const currentTab = document.getElementsByClassName('currentTab')[0];

            const restoredDataString = localStorage.getItem(currentTab.id).split("+");
            const todoList = restoredDataString[0].split(",");
            const descriptionList = restoredDataString[1].split(",");
            const priorityList = restoredDataString[2].split(",");
            const dueDateList = restoredDataString[3].split(",");
            let checkedList = restoredDataString[4].split(",");

            if (checkedList[todoList.indexOf(e.parentNode.querySelector('p').textContent)] == 'false') {
                checkedList.splice(todoList.indexOf(e.parentNode.querySelector('p').textContent), 1, 'true');
                e.parentNode.querySelector('p').style.textDecoration = 'line-through';
                e.parentNode.querySelector('p').style.opacity = '30%';
            } else {
                checkedList.splice(todoList.indexOf(e.parentNode.querySelector('p').textContent), 1, 'false');
                e.parentNode.querySelector('p').style.textDecoration = 'none';
                e.parentNode.querySelector('p').style.opacity = '100%';
            };

            const dataString = (todoList) + "+" + (descriptionList) + "+" + (priorityList) + "+" + (dueDateList) + "+" + (checkedList) + "+" + (todoList.length);
            localStorage.setItem(currentTab.id, [dataString]);
        });
    });
})();


addNoteClicked();

formAddButtonClicked();

cancelButtonClicked();