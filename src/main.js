// IMPORT
import "./styles.css";

// HTML OBJECTS
const body = document.getElementById('body');
const sidebar = document.getElementById('sidebar');



// VARIABLES
const defaultTab = document.createElement('div'); //MAKE A CONSTRUCTOR
defaultTab.className = 'tabs';
const defaultTabP = document.createElement('p');
defaultTabP.textContent = 'Default';

defaultTab.appendChild(defaultTabP);
sidebar.appendChild(defaultTab);



// CREATE PROJECT BUTTON
const createProjectButton = document.createElement('button');
createProjectButton.id = 'createProjectButton';
createProjectButton.textContent = '+';

sidebar.appendChild(createProjectButton);
