import {System} from "../System/system.js";
import { userInterface } from "../UI/UI.js";
import { Project } from "../System/Classes/project.js";
import { Task } from "../System/Classes/task.js";


//TOMORROW - MUST
// Add task addition button to UI, tie in the task addition functionality V
// Rework Task Edit form, must have Status choices as well V
// Tie in the edit to update onscreen V
// Add New Project Button V
// Add switching between the projects functionality
// Add delete task button next to edit BUT also add a confirmation Modal
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
        document.querySelector("#newProjectButton").addEventListener(
            "click", function(){
                userInterface.openProjectDialog();
            }
        )
        document.querySelector("#cancelProjectAddition").addEventListener(
            "click", function(){
                userInterface.closeProjectDialog();
            }
        )
        document.querySelector("#commitNewProject").addEventListener(
            "click", function(){
                let projectInformation = userInterface.readNewProjectModal();
                if(typeof(projectInformation) == "number"){
                    console.log("WRONG INFO");
                    return;
                }
                System.handleNewProject(projectInformation);
                updateProjectListSequence();
                updateTaskListSequence();
                userInterface.closeProjectDialog();
            }
        )

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

        document.querySelector("#editTaskButton").addEventListener(
            "click", function(){
                let taskInformation = userInterface.readTaskEditModal();
                console.log(typeof(taskInformation));
                if(typeof(taskInformation) == "number"){
                    console.log("WRONG INFO");
                    return; //Temp form check to be made proper later
                }
                System.handleTaskEdit(taskInformation);
                updateTaskListSequence();
                userInterface.closeTaskEditDialog();
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

        function updateProjectListSequence(){
            //add switch between projects via click
            userInterface.updateProjectList(System.Projects);
            updateProjectListeners();
        }

        function updateProjectListeners(){
            let listOfProjects = document.getElementsByClassName("projectItem");
            for (var i = 0; i<listOfProjects.length;i++){
                listOfProjects[i].addEventListener("click", function (e){
                    System.select(e.target.id);
                    updateTaskListSequence();
                });
            }
        }

    }

}