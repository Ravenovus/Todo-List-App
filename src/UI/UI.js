
//turn into init() but globaly somehow
//use CSS to mark selection 
export const userInterface ={
    
    //projectList: document.getElementsByClassName("ProjectList"),
    //tastWindow: document.querySelector(".TaskWindow"),
    projectDial : document.querySelector("#projectDialog"),
    taskDial : document.querySelector("#taskDialog"),
    taskEditDial : document.querySelector("#taskEditDialog"),
    taskDeleteDial : document.querySelector("#taskDeleteDialog"),
    projectDeleteDial : document.querySelector("#projectDeleteDialog"),
    projectEditDial : document.querySelector("#projectEditDialog"),
    inputErrorDial : document.querySelector("#errorWindow"),


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

    updateProjectHeader(project){
        let name = "";
        let date = "--/--/--";
        if(project != null){
            name = project.name;
            date = project.date;
        }
        let headerProjectName = document.querySelector("#headerProjectTitle");
        let headerProjectDate = document.querySelector("#headerProjectDate");
        headerProjectName.textContent = "Current Project: " + name;
        headerProjectDate.textContent = "Planned Completion By: " + date;
    },

    updateTaskList(tasks){
        let taskList = document.querySelector(".TaskList");
        this.clearList(taskList);
        if (tasks != null){
            tasks.forEach(task =>{
                let newItem = document.createElement("div");
                newItem.classList.add("taskItem");
                newItem.classList.add("clickableTask");
                let taskName = document.createElement("div");
                let taskPriority = document.createElement("div");
                let taskDate = document.createElement("div");
                let taskStatus = document.createElement("div");
                let editButton = document.createElement("button");
                let deleteButton = document.createElement("button");
                let buttonHolder = document.createElement("div");
                newItem.id = task.taskId;
                taskName.textContent = task.name;
                taskPriority.textContent = task.priority;
                taskDate.textContent = task.dueDate;
                taskStatus.textContent = task.status;
                editButton.classList.add("editButton");
                editButton.textContent = "EDIT";
                deleteButton.classList.add("deleteButton");
                deleteButton.textContent = "DELETE";

                buttonHolder.classList.add("buttonHolder");
                buttonHolder.appendChild(editButton);
                buttonHolder.appendChild(deleteButton);
                
                newItem.appendChild(taskName);
                newItem.appendChild(taskPriority);
                newItem.appendChild(taskDate);
                newItem.appendChild(taskStatus);
                newItem.appendChild(buttonHolder);
                taskList.appendChild(newItem);
            })
        }
    },

    clearList(listToClear){
        while(listToClear.firstChild){
            listToClear.removeChild(listToClear.lastChild);
        }
    },

    readNewProjectModal(){
        let projectInformation = new Array();
        let projectName = document.querySelector("#project_name").value;
        let projectDate = document.querySelector("#projected_date").value;
        if(projectName == "" || projectDate == ""){
            return -1;
        }
        projectInformation.push(projectName);
        projectInformation.push(projectDate);
        return projectInformation;
    },

    readTaskModal(){
        let taskInformation = new Array();
        //add form check here, return a flag to organizer to catch if its wrong
        let taskName = document.querySelector("#task_name").value;
        let dueDate = document.querySelector("#due_date").value;
        if (taskName =="" || dueDate == ""){
            return -1;
        }
        taskInformation.push(taskName);
        taskInformation.push(document.querySelector("#task_priority").value);
        taskInformation.push(dueDate);
        return taskInformation;

    },

    readTaskEditModal(){
        let taskInformation = new Array();
        let taskName = document.querySelector("#task_name_edit").value;
        let dueDate = document.querySelector("#due_date_edit").value;
        if (taskName =="" || dueDate == ""){
            return -1;
        }
        taskInformation.push(taskName);
        taskInformation.push(document.querySelector("#task_priority_edit").value);
        taskInformation.push(dueDate);
        taskInformation.push(document.querySelector("#task_status_edit").value);
        taskInformation.push(document.querySelector(".id_holder").id);
        return taskInformation;
    },

    openTaskDialog(){
        this.taskDial.showModal();
    },

    closeTaskDialog(){
        document.querySelector("#task_name").value = "";
        document.querySelector("#task_priority").value = "Low";
        document.querySelector("#due_date").value = "";
        this.taskDial.close();
    },

    openProjectDialog(){
        this.projectDial.showModal();
    },

    closeProjectDialog(){
        document.querySelector("#project_name").value = "";
        document.querySelector("#projected_date").value = "";
        this.projectDial.close();
    },

    openTaskEditDialog(editingTask){
        document.querySelector("#task_name_edit").value = editingTask.name;
        document.querySelector("#task_priority_edit").value = editingTask.priority;
        document.querySelector("#due_date_edit").value = editingTask.dueDate;
        document.querySelector("#task_status_edit").value = editingTask.status;
        document.querySelector(".id_holder").id = editingTask.taskId;
        this.taskEditDial.showModal();

    },

    closeTaskEditDialog(){
        this.taskEditDial.close();
    },

    openTaskDeleteDialog(){
        this.taskDeleteDial.showModal();
    },

    closeTaskDeleteDialog(){
        this.taskDeleteDial.close();
    },

    openProjectDeleteDialog(){
        this.projectDeleteDial.showModal();
    },

    closeProjectDeleteDialog(){
        this.projectDeleteDial.close();
    },

    openProjectEditDialog(project){
        document.querySelector("#project_name_edit").value = project.name;
        document.querySelector("#expected_date_edit").value = project.date;
        this.projectEditDial.showModal();
    },

    closeProjectEditDialog(){
        this.projectEditDial.close();
    },

    readProjectEditModal(){
        let projectInformation = new Array();
        let projectName = document.querySelector("#project_name_edit").value;
        let dueDate = document.querySelector("#expected_date_edit").value;
        if (projectName =="" || dueDate == ""){
            return -1;
        }
        projectInformation[0] = projectName;
        projectInformation[1] = dueDate;
        return projectInformation;
    },

    openErrorDialog(){
        this.inputErrorDial.showModal();
    },

    closeErrorDialog(){
        this.inputErrorDial.close();
    }



}