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
        console.log(System.getCurrentProject());

        this.addListeners();

        userInterface.updateProjectList(System.Projects);

        userInterface.updateTaskList(testProject.tasks);

        let listOfClickables = document.getElementsByClassName("clickable");

        for(var i = 0; i<listOfClickables.length; i++){
            listOfClickables[i].addEventListener("click", function(e){
                console.log(e.target.id);
            })
        }
    },

    addListeners(){
        document.querySelector("#cancelTaskAddition").addEventListener(
            "click",function(){
                userInterface.closeTaskDialog();
            }
        )
        //Add Task Button//
        document.querySelector("#addTaskButton").addEventListener(
            "click", function(){
                let taskInformation = userInterface.readTaskModal();
                console.log(typeof(taskInformation));
                if(typeof(taskInformation) == "number"){
                    console.log("WRONG INFO");
                    return;
                }
                System.handleTaskInsertion(taskInformation);
                userInterface.updateTaskList(System.getCurrentProject().tasks);
                userInterface.closeTaskDialog();
                let editButton = document.querySelector(".editButton");
                editButton.addEventListener("click", function(e){
                    console.log(e.target.parentNode.id);
                    let taskToEdit = System.findTaskById(e.target.parentNode.id);
                    console.log(taskToEdit);
                    console.log("Im being clicked");
                    userInterface.openTaskEditDialog(taskToEdit);
                })
            }
        )
        //----------------//
        //Edit Task Menu//
        //rework this section, only adding a task adds a listener, not ok

    }


}