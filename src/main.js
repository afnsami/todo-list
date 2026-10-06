// IMPORT
import "./styles.css";

// HTML OBJECTS
const body = document.getElementById('body');
const sidebar = document.getElementById('sidebar');



// VARIABLES
const defaultTab = document.createElement('div');
defaultTab.className = 'tabs';
const defaultTabP = document.createElement('p');
defaultTabP.textContent = 'Default';

defaultTab.appendChild(defaultTabP);
sidebar.appendChild(defaultTab);


class ProjectMaker {

    constructor(title) {
        this.title = title;
    };

    create() {
        const newTab = document.createElement('div');
        newTab.className = 'tabs';
        const newTabP = document.createElement('p');
        newTabP.textContent = this.title;
        newTab.appendChild(newTabP);
        sidebar.appendChild(newTab);
    };

};



// CREATE PROJECT BUTTON
const createProjectButton = document.createElement('button');
createProjectButton.id = 'createProjectButton';
createProjectButton.textContent = '+';
sidebar.appendChild(createProjectButton);


createProjectButton.addEventListener('click', function(e) {
    const projectName = prompt('Enter the project name:');

    if (projectName != "") {
        const noob = new ProjectMaker(projectName);
        noob.create();
    };

});
