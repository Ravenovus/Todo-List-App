import { Project } from "./Classes/project.js";
import { Task } from "./Classes/task.js";

//backend class
export class Organizer{
    _projects;
    _currentSelected;

    constructor(){
        this._projects = new Array();
        this._currentSelected = null;
    }

    AddProject(newProject){
        this._projects.push(newProject);
    }

    RemoveProject(projectToRemove){
        let index = this._projects.findIndex(project => project.projectId === projectToRemove);
        this._projects.splice(index,1);
    }

}