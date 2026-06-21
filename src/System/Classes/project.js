export class Project{
    _name;
    _tasks;
    _date;
    _projectID;

    constructor(name, date){
        this._name = name;
        this._date = date;
        this._tasks = new Array();
        this._projectID = crypto.randomUUID();
    }

    get name(){return this._name;}
    get date(){return this._date;}
    get tasks(){return this._tasks;}
    get projectID(){return this._projectID;}


    removeTask(taskToRemoveID){
        let index = this._tasks.findIndex(task => task.taskId === taskToRemoveID);
        this._tasks.splice(index,1);
    }

}