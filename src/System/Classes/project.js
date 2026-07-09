export class Project{
    _name;
    _tasks;
    _date;
    _projectId;

    constructor(name, date){
        this._name = name;
        this._date = date;
        this._tasks = new Array();
        this._projectId = crypto.randomUUID();
    }

    get name(){return this._name;}
    get date(){return this._date;}
    get tasks(){return this._tasks;}
    get projectId(){return this._projectId;}

    set name(value) {this._name = value;}
    set date(value) {this._date = value;}
    set projectId(value) {this._projectId = value;}
    set tasks(value) {this._tasks = value;}


    removeTask(taskToRemoveID){
        let index = this._tasks.findIndex(task => task.taskId === taskToRemoveID);
        this._tasks.splice(index,1);
    }

    addTask(taskToAdd){
        this._tasks.push(taskToAdd);
    }

    getTaskById(id){
        let index = this._tasks.findIndex(task => task.taskId === id);
        return this.tasks[index];
    }

}