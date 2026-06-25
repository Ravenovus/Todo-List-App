
//turn into init() but globaly somehow
//use CSS to mark selection 
export const userInterface ={
    
    //projectList: document.getElementsByClassName("ProjectList"),
    //tastWindow: document.querySelector(".TaskWindow"),
    projectDial : document.querySelector("#projectDialog"),
    taskDial : document.querySelector("#taskDialog"),


    updateProjectList(projects){
        let projectList = document.querySelector(".ProjectList");
        this.clearList(projectList);
        projects.forEach(project => {
            let newItem = document.createElement("div");
            newItem.classList.add("projectItem");
            newItem.classList.add("clickable");
            newItem.id = project.projectId;
            newItem.textContent = project.name;
            projectList.appendChild(newItem);
        });
    },

    updateTaskList(tasks){
        let taskList = document.querySelector(".TaskList");
        this.clearList(taskList);
        tasks.forEach(task =>{
            let newItem = document.createElement("div");
            newItem.classList.add("taskItem");
            newItem.classList.add("clickableTask");
            let taskName = document.createElement("div");
            let taskPriority = document.createElement("div");
            let taskDate = document.createElement("div");
            let taskStatus = document.createElement("div");
            let editButton = document.createElement("button");
            taskName.textContent = task.name;
            taskPriority.textContent = task.priority;
            taskDate.textContent = task.dueDate;
            taskStatus.textContent = task.status;
            editButton.textContent = "EDIT";
            newItem.appendChild(taskName);
            newItem.appendChild(taskPriority);
            newItem.appendChild(taskDate);
            newItem.appendChild(taskStatus);
            newItem.appendChild(editButton);
            taskList.appendChild(newItem);
        })
    },

    clearList(listToClear){
        while(listToClear.firstChild){
            listToClear.removeChild(listToClear.lastChild);
        }
    },

    readTaskModal(){
        let taskInformation = new Array();
        taskInformation.push(document.querySelector("#task_name").value);
        taskInformation.push(document.querySelector("#task_priority").value);
        taskInformation.push(document.querySelector("#due_date").value);
        return taskInformation;

    },

    closeTaskDialog(){
        this.taskDial.close();
    },

    closeProjectDialog(){
        this.projectDial.close();
    }
}