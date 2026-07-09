import { Project } from "./Classes/project.js";
import { Task } from "./Classes/task.js";

//backend class
export const System = {
    _projects : new Array(),
    _currentSelected : null, //use for the add task modal to add to the correct one

    loadData(savedData){ 
        this._currentSelected = savedData.currentSelected;
        this._projects = savedData.projects.map(savedProject =>{
            let project = new Project(savedProject.name, savedProject.date);
            project.projectId = savedProject.projectId;

            project.tasks = savedProject.tasks.map( savedTask =>{
                let task = new Task(
                    savedTask.name,
                    savedTask.priority,
                    savedTask.dueDate
                );
                task.status = savedTask.status;
                task.taskId = savedTask.taskId;

                return task;
            });
            return project;
        });
    
    },

    clearData(){
        this._projects = new Array();
    },

    saveData(){
        let dataToSave = {
            currentSelected : this._currentSelected,
            projects : this._projects.map (project =>({
                name : project.name,
                date : project.date,
                projectId : project.projectId,
                tasks: project.tasks.map(task =>({
                    name : task.name,
                    priority : task.priority,
                    dueDate : task.dueDate,
                    status : task.status,
                    taskId : task.taskId

                }))

            }))
        };
        return dataToSave;
    },

    addProject(newProject){
        this._projects.push(newProject);
        this._currentSelected = newProject.projectId;
    },

    removeProject(projectToRemove){
        if(this._currentSelected == projectToRemove){
            RemoveSelect();
        }
        let index = this.findProjectByID(projectToRemove);
        this._projects.splice(index,1);
    },

    removeSelect(){
        this._currentSelected = null;
    },

    select(newSelect){
        this._currentSelected = newSelect;
    },

    get Projects(){return this._projects;},

    handleNewProject(projectInformation){
        let newProject = new Project(projectInformation[0],projectInformation[1]);
        this.addProject(newProject);
    },

    handleProjectEdit(projectInformation){
        this.getCurrentProject().name = projectInformation[0];
        this.getCurrentProject().date = projectInformation[1];
    },


    
    handleTaskInsertion(taskInformation){
        let newTask = new Task(taskInformation[0],taskInformation[1],taskInformation[2]);
        this.Projects[this.findProjectByID(this._currentSelected)].addTask(newTask);
    },

    handleTaskEdit(taskInformation){
        let taskToEdit = this.Projects[this.getCurrentProjectIndex()].getTaskById(taskInformation[4]);
        taskToEdit.name = taskInformation[0];
        taskToEdit.priority = taskInformation[1];
        taskToEdit.dueDate = taskInformation[2];
        taskToEdit.status = taskInformation[3];
    },

    handleTaskDelete(taskToDeleteID){
        this.getCurrentProject().removeTask(taskToDeleteID);
    },

    findProjectByID(id){
        return this._projects.findIndex(project => project.projectId === id);
    },

    getCurrentProject(){
        let index = this.findProjectByID(this._currentSelected);
        return this._projects[index];

    },

    getCurrentProjectIndex(){
        return this.findProjectByID(this._currentSelected);
    },

    findTaskById(id){
        return this._projects[this.getCurrentProjectIndex()].getTaskById(id);
    }



}