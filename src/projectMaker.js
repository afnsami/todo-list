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

        const todoNumber = document.createElement('p');
        todoNumber.id = 'todoNumber';

        const deleteButton = document.createElement('button');
        deleteButton.className = 'deleteButton';

        const buttonTodoNumberContainer = document.createElement('div');
        buttonTodoNumberContainer.id = 'buttonTodoNumberContainer';

        buttonTodoNumberContainer.appendChild(todoNumber);
        buttonTodoNumberContainer.appendChild(deleteButton);

        newTab.appendChild(newTabP);
        newTab.appendChild(buttonTodoNumberContainer);
        document.getElementById('projectsContainer').appendChild(newTab);

        // REMOVES THE PREVIOUS TODOS
        document.querySelectorAll('#todoContainer > .todo').forEach(e => e.remove());

        // LOCAL STORAGE
        localStorage.setItem(this.title, this.data);

        // APPENDS THE TODO NUMBER AT THE END OF THE STRING
        if (localStorage.getItem(this.title).split('+')[4] != 0) {
            todoNumber.textContent = localStorage.getItem(this.title).split('+')[4];
        } else {
            todoNumber.textContent = '0';
        };
    };
};

export default ProjectMaker;