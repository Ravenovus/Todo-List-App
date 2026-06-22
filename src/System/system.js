import { Project } from "./Classes/project.js";
import { Task } from "./Classes/task.js";

//backend class
export class System{
    _projects;
    _currentSelected; //deprecate, unnecessary

    constructor(){
        this._projects = new Array();
        this._currentSelected = null;
    }

    addProject(newProject){
        this._projects.push(newProject);
    }

    removeProject(projectToRemove){
        if(this._currentSelected == projectToRemove){
            RemoveSelect();
        }
        let index = this._projects.findIndex(project => project.projectId === projectToRemove);
        this._projects.splice(index,1);
    }

    removeSelect(){
        this._currentSelected = null;
    }

    select(newSelect){
        this._currentSelected = newSelect;
    }

    get Projects(){return this._projects;}

    



}