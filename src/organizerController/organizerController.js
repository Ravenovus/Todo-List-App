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

        

        userInterface.updateProjectList(System.Projects);

        userInterface.updateTaskList(testProject.tasks);

        this.addListeners();

        
    },

    addListeners(){
        document.querySelector("#cancelTaskEdit").addEventListener(
            "click", function(){
                userInterface.closeTaskEditDialog();
            }
        )

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
                updateEditFunctionListeners();
            }
        )
        let listOfClickables = document.getElementsByClassName("clickable");
        for(var i = 0; i<listOfClickables.length; i++){
            listOfClickables[i].addEventListener("click", function(e){
                console.log(e.target.id);
            })
        }

        updateEditFunctionListeners();

        function updateEditFunctionListeners() {
            let listOfEditButtons = document.getElementsByClassName("editButton");
            for (var i = 0; i < listOfEditButtons.length; i++) {
                listOfEditButtons[i].addEventListener("click", function (e) {
                    let taskToEdit = System.findTaskById(e.target.parentNode.id);
                    userInterface.openTaskEditDialog(taskToEdit);
                });
            }
        }
        //----------------//
        //Edit Task Menu//
        //rework this section, only adding a task adds a listener, not ok
        // make add listeners take in a bool to check if initial load, use it to separate the addition
    }

}