import {System} from "../System/system.js";
import { userInterface } from "../UI/UI.js";
import { Project } from "../System/Classes/project.js";
import { Task } from "../System/Classes/task.js";


//TOMORROW - MUST
// Add task addition button to UI, tie in the task addition functionality
// Rework Task Edit form, must have Status choices as well
// Tie in the edit to update onscreen
// Add New Project Button
// Add switching between the projects functionality

export const organizerController = {

    init(){
        let testProject = new Project("testProject", "test Date string");
        let testTask = new Task("testTask", "Medium", "another test");       

        testProject.addTask(testTask);
        System.addProject(testProject);
        console.log(System.getCurrentProject());

        

        userInterface.updateProjectList(System.Projects);

        userInterface.updateTaskList(testProject.tasks);

        this.addListeners();

        
    },

    addListeners(){
        document.querySelector("#newTaskButton").addEventListener(
            "click", function(){
                userInterface.openTaskDialog();
            }
        )

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
                updateTaskListSequence();
                userInterface.closeTaskDialog();
                
            }
        )
        let listOfClickables = document.getElementsByClassName("clickable");
        for(var i = 0; i<listOfClickables.length; i++){
            listOfClickables[i].addEventListener("click", function(e){
                console.log(e.target.id);
            })
        }

        updateEditFunctionListeners();




        function updateTaskListSequence() {
            userInterface.updateTaskList(System.getCurrentProject().tasks);
            updateEditFunctionListeners();
        }

        function updateEditFunctionListeners() {
            let listOfEditButtons = document.getElementsByClassName("editButton");
            for (var i = 0; i < listOfEditButtons.length; i++) {
                listOfEditButtons[i].addEventListener("click", function (e) {
                    let taskToEdit = System.findTaskById(e.target.parentNode.id);
                    userInterface.openTaskEditDialog(taskToEdit);
                });
            }
        }

    }

}