import {System} from "../System/system.js";
import { userInterface } from "../UI/UI.js";
import { Project } from "../System/Classes/project.js";
import { Task } from "../System/Classes/task.js";


//initial refactor from index to separate in order to clean index

export const organizerController = {

    init(){
        let testProject = new Project("testProject", "test Date string");
        let testTask = new Task("testTask", "low", "another test");       

        testProject.addTask(testTask);
        System.addProject(testProject);

        this.addListeners();

        userInterface.updateProjectList(System.Projects);

        userInterface.updateTaskList(testProject.tasks);

        let listOfClickables = document.getElementsByClassName("clickable");

        for(var i = 0; i<listOfClickables.length; i++){
            listOfClickables[i].addEventListener("click", function(e){
                //backEnd.select(listOfClickables[i].id);
                console.log(e.target.id);
            })
        }
    },

    addListeners(){
        document.querySelector("#addTaskButton").addEventListener(
            "click", function(){
                let taskInformation = userInterface.readTaskModal();
                System.handleTaskInsertion(taskInformation);
                userInterface.updateTaskList(System.getCurrentProject().tasks); //make it take "current project" via selection from system
                userInterface.closeTaskDialog();
            }
        )
    }


}