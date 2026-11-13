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
    };
};

export default ProjectMaker;