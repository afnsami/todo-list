import { formatDistance, format, isPast } from "date-fns";


// TAB CLICK
export function tabSelectUpdate() {
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
};


// RESTORES TODOS
export function restoreTodos() {
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
};


// TODO CHECKS
export function todoCheckedListener() {
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
};