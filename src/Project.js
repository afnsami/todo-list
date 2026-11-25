import { format } from "date-fns";
import ProjectMaker from "./projectMaker.js";
import { todoCheckedListener } from './Todo.js'

// CLICKED PROJECT + BUTTON
export function createProjectButtonClicked() {
    document.getElementById('createProjectButton').addEventListener('click', e => {

        // ADD NOTE BUTTON IS SHOWN
        if (localStorage.length == 0) {
            document.getElementById("dueDate").setAttribute("min", format(new Date(), 'yyyy-MM-dd')); // CANT SELECT BEFORE CURRENT DATE

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

        todoCheckedListener();
    });
};

// WHEN PROJECT DELETE BUTTON IS CLICKED
export function deleteProjectButton() {
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
};

// RESTORES PROJECTS FROM LOCALSTORAGE
export function restoreProjects() {
    if (localStorage.length != 0) {
        for (let i = 0; i <= ((localStorage.length) - 1); i++) {
            let restoreTab = new ProjectMaker(localStorage.key(i), localStorage.getItem(localStorage.key(i)));
            restoreTab.create();
        };
    };
};