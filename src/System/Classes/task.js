export class Task{
    _name;
    _priority;
    _dueDate;
    _status;
    _taskId;

    constructor(name,priority,date){
        this._name = name;
        this._priority = priority; //probably needs a function of its own to convert into numeric, OR just keep as str, that works too
        this._dueDate = date;
        this._status = "In Progress";
        this._taskId = crypto.randomUUID();
    }

    get name(){return this._name;}
    get priority(){return this._priority;}
    get dueDate(){return this._dueDate;}
    get status(){return this._status;}
    get taskId(){return this._taskId;}

    set priority(value){this._priority = value;}
    set dueDate(value){this._dueDate = value;}
    set status(value){this._status = value;}



}