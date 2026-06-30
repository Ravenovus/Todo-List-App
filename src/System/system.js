import { Project } from "./Classes/project.js";
import { Task } from "./Classes/task.js";

//backend class
export const System = {
    _projects : new Array(),
    _currentSelected : null, //use for the add task modal to add to the correct one

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

    
    handleTaskInsertion(taskInformation){
        let newTask = new Task(taskInformation[0],taskInformation[1],taskInformation[2]);
        this.Projects[this.findProjectByID(this._currentSelected)].addTask(newTask);
    },

    handleTaskEdit(taskInformation){
        let taskToEdit = this.Projects[this.findProjectByID(this._currentSelected)].findTaskById(taskInformation[4]);
        taskToEdit.name = taskInformation[0];
        taskToEdit.priority = taskInformation[1];
        taskToEdit.dueDate = taskInformation[2];
        taskToEdit.status = taskInformation[3];
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